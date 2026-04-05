# PFDF MCP Server — Registry & AI Visibility Status Report
**Date:** April 5, 2026 (Updated)

---

## COMPLETED SUBMISSIONS (11 done)

| # | Registry | Status | Notes |
|---|----------|--------|-------|
| 1 | **npm** | Published v1.0.4 | `npx propfirmdealfinder-mcp-server` works globally |
| 2 | **Official MCP Registry** | LIVE | `io.github.chrisbusbin-pixel/propfirmdealfinder` verified at registry.modelcontextprotocol.io |
| 3 | **PulseMCP** | Auto-ingests | Pulls from Official Registry daily — no action needed |
| 4 | **mcpservers.org** | Submitted | Awesome MCP Servers directory |
| 5 | **MCPRepository** | Submitted | Via `npx mcp-index` CLI |
| 6 | **Cline Marketplace** | Issue #1252 created | https://github.com/cline/mcp-marketplace/issues/1252 |
| 7 | **Glama.ai** | Submitted for review | Via "Add Server" dialog |
| 8 | **MCPMarket.com** | Submitted | "Repository submitted and will be reviewed" |
| 9 | **mcp.so** | Created | Edit page: https://mcp.so/my-servers/ |
| 10 | **Cursor Directory** | Published (pending review) | https://cursor.directory/plugins/prop-firm-deal-finder |
| 11 | **MCP Server Finder** | Email sent | Chris sent the Gmail draft to info@mcpserverfinder.com |

## NEEDS YOUR ACTION (1 item)

### Smithery — Deploy HTTP Server to Railway
Smithery requires a live HTTPS URL. The HTTP server code and deployment files are ready.

**Files already in repo:**
- `src/http-server.ts` — Streamable HTTP transport (listens on PORT env var)
- `railway.json` — Railway deployment config (auto-uses `npm run start:http`)
- `Procfile` — Fallback for Render/Heroku

**Steps:**
```
1. Go to https://railway.com → Sign in with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select: chrisbusbin-pixel/propfirmdealfinder-mcp-server
4. Railway will auto-detect Node.js, read railway.json, and deploy
5. Once deployed, copy the public URL (e.g., https://pfdf-mcp.up.railway.app)
6. Go to https://smithery.ai/servers/new
   - Namespace: pfdf
   - Server ID: propfirmdealfinder
   - MCP Server URL: https://YOUR-RAILWAY-URL/mcp
   - Click Continue and complete the listing
```

## SKIPPED (1 item)

| Registry | Reason |
|----------|--------|
| **modelcontextprotocol/servers PR** | Community servers list is officially deprecated ("no longer maintained and will eventually be removed") — use Official MCP Registry instead |

---

## GEO/AEO FILES READY TO DEPLOY

These files are in the repo's `public/` folder. Add them to propfirmdealfinder.com:

| File | Purpose | Deploy To |
|------|---------|-----------|
| `public/llms.txt` | AI crawler discovery file | propfirmdealfinder.com/llms.txt |
| `public/llms-full.txt` | Extended AI context file | propfirmdealfinder.com/llms-full.txt |
| `public/schema-organization.html` | Organization + WebSite + Speakable schema | Add to `<head>` of all pages |
| `public/robots-txt-additions.txt` | Allow rules for 12 AI crawlers | Append to existing robots.txt |

---

## TOTAL SCOREBOARD

| Category | Count |
|----------|-------|
| Registries submitted/live | **11 of 12** |
| Official MCP Registry | **LIVE** |
| Awaiting your action | 1 item (Railway deploy → Smithery) |
| GEO files ready | 4 files |
| npm version | v1.0.4 |

## GitHub Actions Workflow

The `Publish to MCP Registry` workflow is now working:
- Triggers on version tags (`v*`)
- Publishes to npm + Official MCP Registry via OIDC
- Run #3 (v1.0.4): **SUCCESS**
- Future version bumps auto-publish to both npm and the Official Registry
