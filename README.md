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

## Quick Start

```bash
# Install dependencies
npm install

# Build
npm run build

# Run
npm start
```

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

## Publishing to MCP Registries

### 1. Smithery (Primary)

```bash
# Install Smithery CLI
npm install -g @anthropic-ai/smithery

# Login
smithery login

# Publish (from project root)
smithery mcp publish
```

Or via the web UI:
1. Go to [smithery.ai/new](https://smithery.ai/new)
2. Connect your GitHub account
3. Select this repository
4. Click "Deploy"

### 2. Official MCP Registry

1. Go to [github.com/modelcontextprotocol/registry](https://github.com/modelcontextprotocol/registry)
2. Fork the repository
3. Add your server entry to the registry
4. Submit a Pull Request

### 3. GitHub MCP Registry

Once published to the official MCP Community Registry, your server automatically appears in the GitHub MCP Registry.

### 4. OpenTools

1. Go to [opentools.com/registry](https://opentools.com/registry)
2. Click "Submit Server"
3. Fill in: name, description, GitHub URL
4. Submit

### 5. Glama

1. Go to [glama.ai/mcp/servers](https://glama.ai/mcp/servers)
2. Submit your server listing
3. Include GitHub URL and description

### 6. mcp.so

1. Go to [mcp.so](https://mcp.so)
2. Submit your server
3. Include tool descriptions and examples

### 7. PulseMCP

1. Go to [pulsemcp.com](https://pulsemcp.com)
2. Submit your server listing

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
│   ├── index.ts          # Server + all 6 tools
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
