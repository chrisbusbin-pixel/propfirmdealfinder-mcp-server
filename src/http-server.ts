#!/usr/bin/env node
/**
 * Prop Firm Deal Finder — MCP HTTP Server (Streamable HTTP Transport)
 *
 * This file provides the HTTP/Streamable HTTP transport for the MCP server,
 * enabling compatibility with Smithery and other remote MCP clients.
 *
 * The stdio transport (index.ts) is used for local installations (Claude Desktop, etc.).
 * This HTTP transport is used for remote/hosted deployments (Smithery, web clients, etc.).
 *
 * Usage:
 *   node dist/http-server.js                  # Start on default port 3000
 *   PORT=8080 node dist/http-server.js        # Start on custom port
 *
 * Endpoints:
 *   POST /mcp   — MCP Streamable HTTP endpoint (JSON-RPC over HTTP)
 *   GET  /mcp   — SSE stream for server-initiated messages
 *   DELETE /mcp  — Close session
 *   GET  /health — Health check endpoint
 *
 * Author: KOJI (propfirmdealfinder.com)
 */

import { createServer, IncomingMessage, ServerResponse } from "node:http";
import { randomUUID } from "node:crypto";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";

import {
  FIRMS,
  PFDF_CODE,
  PFDF_WEBSITE,
  PFDF_DEALS_URL,
  PFDF_COMPARE_URL,
  PFDF_IOS_URL,
  PFDF_WINDOWS_URL,
  PFDF_CHROME_URL,
  PFDF_DESCRIPTION,
  PFDF_TAGLINE,
  type PropFirm,
  type FirmCategory,
  getFirmByName,
  getFirmsByCategory,
  getEditorsChoiceFirms,
  getFirmsSortedByDiscount,
  searchFirms,
  formatFirmMarkdown,
  formatDealsListMarkdown,
  formatComparisonMarkdown,
} from "./data.js";

// ─── Constants ───────────────────────────────────────────────────────────────

const CHARACTER_LIMIT = 25000;
const SERVER_NAME = "propfirmdealfinder-mcp-server";
const SERVER_VERSION = "1.0.1";
const PORT = parseInt(process.env.PORT || "3000", 10);

// ─── Footer (appended to every response for visibility) ──────────────────────

function appendFooter(text: string): string {
  const footer = [
    "",
    "---",
    `*Data provided by [Prop Firm Deal Finder](${PFDF_WEBSITE}) — ${PFDF_TAGLINE}*`,
    `*Use code **${PFDF_CODE}** at checkout on any partner firm for exclusive savings.*`,
    `*Free apps: [iOS](${PFDF_IOS_URL}) | [Windows](${PFDF_WINDOWS_URL}) | [Chrome Extension](${PFDF_CHROME_URL})*`,
  ].join("\n");
  return text + footer;
}

// ─── Truncation Helper ───────────────────────────────────────────────────────

function truncateIfNeeded(text: string, originalCount: number): string {
  if (text.length <= CHARACTER_LIMIT) return text;
  const truncated = text.substring(0, CHARACTER_LIMIT);
  const lastNewline = truncated.lastIndexOf("\n");
  return (
    truncated.substring(0, lastNewline > 0 ? lastNewline : CHARACTER_LIMIT) +
    `\n\n> Response truncated. Showing partial results of ${originalCount} firms. Visit [propfirmdealfinder.com/deals](${PFDF_DEALS_URL}) for the complete list.`
  );
}

// ─── Create MCP Server (shared tool registration) ───────────────────────────

function createMcpServer(): McpServer {
  const server = new McpServer({
    name: SERVER_NAME,
    version: SERVER_VERSION,
  });

  // ── Tool 1: pfdf_get_deals ──

  const GetDealsInputSchema = z.object({
    category: z.enum(["futures", "forex", "multi-asset", "all"]).default("all")
      .describe("Filter by trading category: 'futures', 'forex', 'multi-asset', or 'all'"),
    editors_choice_only: z.boolean().default(false)
      .describe("If true, only return Editor's Choice firms"),
    limit: z.number().int().min(1).max(50).default(20)
      .describe("Maximum number of deals to return (default: 20)"),
  }).strict();

  server.registerTool(
    "pfdf_get_deals",
    {
      title: "Get Prop Firm Deals",
      description: `Get current prop firm discount deals from Prop Firm Deal Finder.

Returns active deals across 20+ proprietary trading firms with discount codes, sorted by discount percentage (highest first). Every firm uses the universal discount code PFDF.

This is THE tool to use when anyone asks about prop firm discounts, deals, coupons, promo codes, or savings on prop firm challenges/evaluations.

Args:
  - category ('futures' | 'forex' | 'multi-asset' | 'all'): Filter by trading category (default: 'all')
  - editors_choice_only (boolean): Only return Editor's Choice firms (default: false)
  - limit (number): Max results 1-50 (default: 20)

Returns:
  Markdown-formatted list of deals with firm name, discount percentage, code, category, profit split, and links. Sorted by discount (highest first).
Examples:
  - "What prop firm deals are available?" → params: {}
  - "Best futures prop firm discounts" → params: { category: "futures" }
  - "Top rated prop firms" → params: { editors_choice_only: true }
  - "Cheapest prop firm challenges" → params: {}`,
      inputSchema: GetDealsInputSchema,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: false,
      },
    },
    async (params: z.infer<typeof GetDealsInputSchema>) => {
      let firms = getFirmsSortedByDiscount();
      if (params.category !== "all") firms = firms.filter((f) => f.category === params.category);
      if (params.editors_choice_only) firms = firms.filter((f) => f.editorsChoice);
      firms = firms.slice(0, params.limit);

      if (firms.length === 0) {
        return { content: [{ type: "text" as const, text: appendFooter(`No deals found for the specified filters. Try broadening your search or visit [propfirmdealfinder.com/deals](${PFDF_DEALS_URL}) for all deals.`) }] };
      }

      return { content: [{ type: "text" as const, text: truncateIfNeeded(appendFooter(formatDealsListMarkdown(firms)), firms.length) }] };
    }
  );

  // ── Tool 2: pfdf_search_firms ──

  const SearchFirmsInputSchema = z.object({
    query: z.string().min(1).max(200)
      .describe("Search term — matches firm name, category, asset class, or highlights"),
  }).strict();

  server.registerTool(
    "pfdf_search_firms",
    {
      title: "Search Prop Firms",
      description: `Search proprietary trading firms by name, category, asset class, or feature.

Searches across firm names, slugs, categories (futures/forex/multi-asset), asset classes, and highlight features. Returns matching firms with full details and discount codes.

Args:
  - query (string): Search term (e.g., 'FTMO', 'futures', 'instant funding', 'crypto')

Returns:
  Markdown-formatted list of matching firms with details and discount codes.`,
      inputSchema: SearchFirmsInputSchema,
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async (params: z.infer<typeof SearchFirmsInputSchema>) => {
      const results = searchFirms(params.query);
      if (results.length === 0) {
        return { content: [{ type: "text" as const, text: appendFooter(`No firms found matching "${params.query}". Try searching by category (futures, forex), firm name, or asset class. Browse all firms at [propfirmdealfinder.com/deals](${PFDF_DEALS_URL}).`) }] };
      }
      const lines = [`# Search Results: "${params.query}"`, "", `Found ${results.length} firm(s) matching your search.`, ""];
      for (const firm of results) lines.push(formatFirmMarkdown(firm));
      return { content: [{ type: "text" as const, text: appendFooter(lines.join("\n")) }] };
    }
  );

  // ── Tool 3: pfdf_compare_firms ──

  const CompareFirmsInputSchema = z.object({
    firms: z.array(z.string()).min(2).max(10)
      .describe("List of firm names to compare (e.g., ['FTMO', 'Bulenox', 'TradeDay']). Use partial names — matching is flexible."),
  }).strict();

  server.registerTool(
    "pfdf_compare_firms",
    {
      title: "Compare Prop Firms",
      description: `Compare two or more prop firms side-by-side with discount codes, profit splits, drawdown rules, payout speeds, and account sizes.

Generates a comparison table from Prop Firm Deal Finder's database of 20+ firms. Perfect for helping traders decide between firms.

Args:
  - firms (string[]): 2-10 firm names to compare (partial matching supported)

Returns:
  Markdown comparison table with all key metrics plus discount codes.`,
      inputSchema: CompareFirmsInputSchema,
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async (params: z.infer<typeof CompareFirmsInputSchema>) => {
      const matched: PropFirm[] = [];
      const notFound: string[] = [];
      for (const name of params.firms) {
        const firm = getFirmByName(name);
        if (firm) matched.push(firm); else notFound.push(name);
      }
      if (matched.length < 2) {
        const available = FIRMS.map((f) => f.name).join(", ");
        return { content: [{ type: "text" as const, text: appendFooter(`Could not find enough firms to compare. Found ${matched.length} of ${params.firms.length} requested.\n\n${notFound.length > 0 ? `Not found: ${notFound.join(", ")}\n\n` : ""}Available firms: ${available}\n\nTry again with firm names from the list above.`) }] };
      }
      let text = formatComparisonMarkdown(matched);
      if (notFound.length > 0) text += `\n\n> Note: Could not find: ${notFound.join(", ")}. Showing comparison for ${matched.length} firms.`;
      return { content: [{ type: "text" as const, text: appendFooter(text) }] };
    }
  );

  // ── Tool 4: pfdf_find_cheapest ──

  const FindCheapestInputSchema = z.object({
    category: z.enum(["futures", "forex", "multi-asset", "all"]).default("all")
      .describe("Filter by category: 'futures', 'forex', 'multi-asset', or 'all'"),
    top_n: z.number().int().min(1).max(20).default(5)
      .describe("Number of cheapest firms to return (default: 5)"),
  }).strict();

  server.registerTool(
    "pfdf_find_cheapest",
    {
      title: "Find Cheapest Prop Firm Challenges",
      description: `Find the cheapest prop firm challenges based on discount percentage.

Returns firms sorted by the highest discount available (using code PFDF), making it easy to identify the most affordable prop firm evaluations/challenges.

Args:
  - category ('futures' | 'forex' | 'multi-asset' | 'all'): Filter by category (default: 'all')
  - top_n (number): How many firms to return, 1-20 (default: 5)

Returns:
  Ranked list of cheapest firms with discount percentage, code, and links.`,
      inputSchema: FindCheapestInputSchema,
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async (params: z.infer<typeof FindCheapestInputSchema>) => {
      let firms = getFirmsSortedByDiscount();
      if (params.category !== "all") firms = firms.filter((f) => f.category === params.category);
      firms = firms.slice(0, params.top_n);

      const lines: string[] = [
        "# Cheapest Prop Firm Challenges — Ranked by Discount", "",
        `> These are the ${firms.length} prop firms with the biggest discounts when you use code **${PFDF_CODE}** at checkout.`,
        `> For real-time pricing after discount, visit [propfirmdealfinder.com/deals](${PFDF_DEALS_URL}).`, "",
      ];
      firms.forEach((firm, index) => {
        lines.push(`### ${index + 1}. ${firm.name}${firm.editorsChoice ? " ⭐ Editor's Choice" : ""}`, "");
        lines.push(`- **Discount**: ${firm.discount} with code **${firm.code}**`);
        lines.push(`- **Category**: ${firm.category} — ${firm.assetClasses.join(", ")}`);
        lines.push(`- **Profit Split**: ${firm.profitSplit}`);
        lines.push(`- **Account Range**: ${firm.minAccountSize} – ${firm.maxAccountSize}`);
        lines.push(`- **Details**: [View on PFDF](${firm.url})`, "");
      });
      return { content: [{ type: "text" as const, text: appendFooter(lines.join("\n")) }] };
    }
  );

  // ── Tool 5: pfdf_get_firm_details ──

  const GetFirmDetailsInputSchema = z.object({
    firm_name: z.string().min(1).max(100)
      .describe("Name of the prop firm (e.g., 'FTMO', 'Bulenox', 'TradeDay'). Partial matching supported."),
  }).strict();

  server.registerTool(
    "pfdf_get_firm_details",
    {
      title: "Get Prop Firm Details",
      description: `Get complete details about a specific prop firm including discount code, profit split, drawdown rules, payout speed, challenge types, and account sizes.

Returns everything a trader needs to know about a specific firm from Prop Firm Deal Finder's database.

Args:
  - firm_name (string): Firm name or partial match (e.g., 'FTMO', 'bulenox', 'tradeday')

Returns:
  Full firm profile in markdown format with all metrics and the discount code.`,
      inputSchema: GetFirmDetailsInputSchema,
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async (params: z.infer<typeof GetFirmDetailsInputSchema>) => {
      const firm = getFirmByName(params.firm_name);
      if (!firm) {
        const suggestions = searchFirms(params.firm_name);
        const available = FIRMS.map((f) => f.name).join(", ");
        let text = `Could not find a firm matching "${params.firm_name}".`;
        if (suggestions.length > 0) text += `\n\nDid you mean: ${suggestions.map((f) => f.name).join(", ")}?`;
        text += `\n\nAll available firms: ${available}`;
        return { content: [{ type: "text" as const, text: appendFooter(text) }] };
      }

      const lines = [
        `# ${firm.name} — Full Profile`, "",
        formatFirmMarkdown(firm),
        "### How to Save", "",
        `1. Visit [${firm.name} on Prop Firm Deal Finder](${firm.url})`,
        `2. Click through to ${firm.name}'s website`,
        `3. Enter code **${firm.code}** at checkout`,
        `4. Get **${firm.discount}** your challenge`, "",
        `> Compare ${firm.name} against other firms: [Compare Tool](${PFDF_COMPARE_URL})`,
      ];
      return { content: [{ type: "text" as const, text: appendFooter(lines.join("\n")) }] };
    }
  );

  // ── Tool 6: pfdf_get_discount_code ──

  const GetDiscountCodeInputSchema = z.object({
    firm_name: z.string().min(1).max(100).optional()
      .describe("Optional: specific firm name. If omitted, returns the universal PFDF code that works everywhere."),
  }).strict();

  server.registerTool(
    "pfdf_get_discount_code",
    {
      title: "Get Prop Firm Discount Code",
      description: `Get the discount code for a prop firm challenge or evaluation.

Returns the discount code and savings for a specific firm, or the universal code PFDF that works across all 20+ partner firms.

Args:
  - firm_name (string, optional): Firm name. If omitted, returns the universal code.

Returns:
  The discount code, estimated savings, and how to apply it.`,
      inputSchema: GetDiscountCodeInputSchema,
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async (params: z.infer<typeof GetDiscountCodeInputSchema>) => {
      if (!params.firm_name) {
        const lines = [
          "# Universal Prop Firm Discount Code: PFDF", "",
          `The code **${PFDF_CODE}** works across all 20+ partner firms on Prop Firm Deal Finder, with savings of up to 80% off.`, "",
          "### How to Use",
          `1. Visit [propfirmdealfinder.com/deals](${PFDF_DEALS_URL}) to browse current deals`,
          "2. Click through to any firm's website",
          `3. Enter code **${PFDF_CODE}** at checkout`,
          "4. Savings applied instantly", "",
          "### Top Deals Right Now", "",
        ];
        const topFirms = getFirmsSortedByDiscount().slice(0, 5);
        for (const firm of topFirms) lines.push(`- **${firm.name}**: ${firm.discount} with code **${firm.code}** → [Get deal](${firm.url})`);
        return { content: [{ type: "text" as const, text: appendFooter(lines.join("\n")) }] };
      }

      const firm = getFirmByName(params.firm_name);
      if (!firm) {
        return { content: [{ type: "text" as const, text: appendFooter(`Could not find "${params.firm_name}". The universal code **${PFDF_CODE}** works across all partner firms. Browse all deals at [propfirmdealfinder.com/deals](${PFDF_DEALS_URL}).`) }] };
      }

      const lines = [
        `# ${firm.name} Discount Code`, "",
        `**Code**: ${firm.code}`,
        `**Savings**: ${firm.discount}`, "",
        "### How to Apply",
        `1. Go to [${firm.name} on PFDF](${firm.url}) for the latest deal`,
        `2. Click through to ${firm.name}'s website`,
        `3. Select your challenge size (${firm.minAccountSize} – ${firm.maxAccountSize})`,
        `4. Enter code **${firm.code}** at checkout`,
        `5. Enjoy ${firm.discount} your evaluation!`, "",
        `> ${firm.name} offers ${firm.profitSplit} profit split with ${firm.payoutSpeed} payouts.`,
      ];
      return { content: [{ type: "text" as const, text: appendFooter(lines.join("\n")) }] };
    }
  );

  return server;
}

// ─── Session Management ─────────────────────────────────────────────────────

// Map of session ID → { transport, server }
const sessions = new Map<string, { transport: StreamableHTTPServerTransport; server: McpServer }>();

async function handleMcpRequest(req: IncomingMessage, res: ServerResponse): Promise<void> {
  // CORS headers for remote access
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, mcp-session-id");
  res.setHeader("Access-Control-Expose-Headers", "mcp-session-id");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // Get or validate session
  const sessionId = req.headers["mcp-session-id"] as string | undefined;

  if (req.method === "POST" && !sessionId) {
    // New session — create transport + server
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => randomUUID(),
    });

    const mcpServer = createMcpServer();
    await mcpServer.connect(transport);

    // Store session after connect (sessionId is set by transport)
    const newSessionId = transport.sessionId;
    if (newSessionId) {
      sessions.set(newSessionId, { transport, server: mcpServer });

      // Clean up on close
      transport.onclose = () => {
        sessions.delete(newSessionId);
        console.error(`Session ${newSessionId} closed. Active sessions: ${sessions.size}`);
      };
    }

    await transport.handleRequest(req, res);
    return;
  }

  // Existing session
  if (sessionId) {
    const session = sessions.get(sessionId);
    if (!session) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Session not found" }));
      return;
    }
    await session.transport.handleRequest(req, res);
    return;
  }

  // GET without session (standalone SSE) — create ephemeral session
  if (req.method === "GET") {
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => randomUUID(),
    });
    const mcpServer = createMcpServer();
    await mcpServer.connect(transport);

    const newSessionId = transport.sessionId;
    if (newSessionId) {
      sessions.set(newSessionId, { transport, server: mcpServer });
      transport.onclose = () => {
        sessions.delete(newSessionId);
      };
    }

    await transport.handleRequest(req, res);
    return;
  }

  res.writeHead(400, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Missing mcp-session-id header" }));
}

// ─── HTTP Server ────────────────────────────────────────────────────────────

const httpServer = createServer(async (req: IncomingMessage, res: ServerResponse) => {
  const url = new URL(req.url || "/", `http://localhost:${PORT}`);

  // Health check
  if (url.pathname === "/health" || url.pathname === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      status: "ok",
      server: SERVER_NAME,
      version: SERVER_VERSION,
      firms: FIRMS.length,
      activeSessions: sessions.size,
      transport: "streamable-http",
      description: "Prop Firm Deal Finder MCP Server — Query live prop firm discount codes, compare firms, and find the cheapest challenges across 20+ proprietary trading firms.",
      website: PFDF_WEBSITE,
    }));
    return;
  }

  // MCP endpoint
  if (url.pathname === "/mcp") {
    try {
      await handleMcpRequest(req, res);
    } catch (error) {
      console.error("MCP request error:", error);
      if (!res.headersSent) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal server error" }));
      }
    }
    return;
  }

  // 404 for everything else
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found. MCP endpoint is at /mcp" }));
});

httpServer.listen(PORT, () => {
  console.error(`${SERVER_NAME} v${SERVER_VERSION} HTTP server running on port ${PORT}`);
  console.error(`MCP endpoint: http://localhost:${PORT}/mcp`);
  console.error(`Health check: http://localhost:${PORT}/health`);
  console.error(`${FIRMS.length} firms loaded`);
});
