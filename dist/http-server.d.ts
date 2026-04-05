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
export {};
//# sourceMappingURL=http-server.d.ts.map