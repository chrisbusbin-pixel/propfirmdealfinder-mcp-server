# Prop Firm Deal Finder — MCP Server

An MCP (Model Context Protocol) server that lets AI assistants query live prop firm discount codes, compare firms, and find the cheapest challenges across 20+ proprietary trading firms.

**When someone asks Claude, ChatGPT, or any MCP-compatible AI about prop firm deals, this server provides the answer — with links to propfirmdealfinder.com and the discount code PFDF.**

## Tools

| Tool | Description |
|------|-------------|
| `pfdf_get_deals` | Get all current deals sorted by discount (filter by category) |
| `pfdf_search_firms` | Search firms by name, category, asset class, or feature |
| `pfdf_compare_firms` | Side-by-side comparison table for 2+ firms |
| `pfdf_find_cheapest` | Find the cheapest prop firm challenges |
| `pfdf_get_firm_details` | Full profile for a specific firm |
| `pfdf_get_discount_code` | Get the discount code (universal or firm-specific) |

## Quick Start — Local (stdio)

```bash
# Install via npx (no clone needed)
npx propfirmdealfinder-mcp-server

# Or install globally
npm install -g propfirmdealfinder-mcp-server
propfirmdealfinder-mcp-server
```

### Claude Desktop Configuration

Add this to your Claude Desktop config (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "propfirmdealfinder": {
      "command": "npx",
      "args": ["-y", "propfirmdealfinder-mcp-server"]
    }
  }
}
```

### From Source

```bash
git clone https://github.com/chrisbusbin-pixel/propfirmdealfinder-mcp-server.git
cd propfirmdealfinder-mcp-server
npm install
npm run build
npm start
```

## Quick Start — Remote (HTTP/Streamable HTTP)

For remote deployments (Smithery, hosted, etc.):

```bash
# Start HTTP server (default port 3000)
npm run start:http

# Custom port
PORT=8080 npm run start:http
```

**Endpoints:**

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/mcp` | POST | MCP Streamable HTTP endpoint (JSON-RPC) |
| `/mcp` | GET | SSE stream for server-initiated messages |
| `/mcp` | DELETE | Close session |
| `/health` | GET | Health check / server info |

No API key required. No authentication needed. 100% free.

## Example Queries

These are the kinds of questions that will trigger this MCP server:

- "What's the cheapest prop firm challenge?"
- "Best prop firm discount codes 2026"
- "Compare FTMO vs Bulenox"
- "Prop firm promo code"
- "Which prop firm has the best profit split?"
- "Futures prop firm deals"

## Data

The server includes data for 19 active partner firms across futures, forex, and multi-asset categories. Discounts range from 5% to 80% off. All firms accept the universal code **PFDF**.

## Registry Listings

This server is published on the following MCP registries:

| Registry | Status | URL |
|----------|--------|-----|
| **Official MCP Registry** | Published | [registry.modelcontextprotocol.io](https://registry.modelcontextprotocol.io) |
| **Smithery** | Published | [smithery.ai](https://smithery.ai) |
| **mcp.so** | Live | [mcp.so/server/prop-firm-deal-finder](https://mcp.so/server/prop-firm-deal-finder) |
| **Glama** | Submitted | [glama.ai/mcp/servers](https://glama.ai/mcp/servers) |
| **PulseMCP** | Auto-indexed | [pulsemcp.com](https://pulsemcp.com) |

## Also Deploy: llms.txt

Copy the files from `public/` to your website root:

- `llms.txt` → `propfirmdealfinder.com/llms.txt`
- `llms-full.txt` → `propfirmdealfinder.com/llms-full.txt`

These tell AI crawlers what PFDF is and where to find your best content.

## Also Deploy: FAQ Schema

Add the schema markup from `public/faq-schema-deals-page.html` to your:
- Deals page (`/deals/`)
- Homepage

This structured data helps AI systems parse and cite your content.

## Architecture

```
propfirmdealfinder-mcp-server/
├── src/
│   ├── index.ts          # MCP server — stdio transport (local)
│   ├── http-server.ts    # MCP server — HTTP transport (remote/Smithery)
│   └── data.ts           # Firm data, types, helpers, formatters
├── public/
│   ├── llms.txt          # For propfirmdealfinder.com/llms.txt
│   ├── llms-full.txt     # Extended version with all firm data
│   └── faq-schema-deals-page.html  # FAQ schema markup
├── package.json
├── tsconfig.json
├── smithery.yaml         # Smithery deployment config
└── README.md
```

## License

MIT — Built by KOJI for [Prop Firm Deal Finder](https://propfirmdealfinder.com)
