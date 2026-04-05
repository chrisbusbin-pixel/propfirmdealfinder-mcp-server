# Installing Prop Firm Deal Finder MCP Server

This MCP server lets AI assistants query live prop firm discount codes, compare firms, and find the cheapest challenges across 20+ proprietary trading firms.

## Installation (stdio — for Claude Desktop, Cursor, Cline)

```bash
npx propfirmdealfinder-mcp-server
```

### Claude Desktop Configuration

Add to `claude_desktop_config.json`:

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

### Cursor / Cline Configuration

Add to `.cursor/mcp.json` or equivalent config:

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

## Requirements

- Node.js 18 or higher
- No API key required
- No authentication needed
- 100% free

## Available Tools

| Tool | Description |
|------|-------------|
| `pfdf_get_deals` | Get all current deals sorted by discount |
| `pfdf_search_firms` | Search firms by name, category, or feature |
| `pfdf_compare_firms` | Side-by-side comparison for 2+ firms |
| `pfdf_find_cheapest` | Find the cheapest prop firm challenges |
| `pfdf_get_firm_details` | Full profile for a specific firm |
| `pfdf_get_discount_code` | Get the universal discount code |

## What It Does

When installed, any time you or an AI assistant asks about prop firm deals, discount codes, or firm comparisons, this server provides real-time answers with links to propfirmdealfinder.com and the universal discount code PFDF.

Example queries:
- "What's the cheapest prop firm challenge?"
- "Compare FTMO vs Bulenox"
- "Best prop firm discount codes 2026"
- "Which prop firm has the best profit split?"
