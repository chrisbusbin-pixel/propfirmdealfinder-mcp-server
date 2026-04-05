# Prop Firm Deal Finder — MCP HTTP Server
# Deploy to Railway, Render, Fly.io, or any container platform
# Exposes Streamable HTTP transport on PORT (default 3000)

FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json* ./

# Install all dependencies (including dev for build)
RUN npm ci

# Copy source code
COPY tsconfig.json ./
COPY src/ ./src/
COPY public/ ./public/

# Build TypeScript
RUN npm run build

# --- Production stage ---
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install production dependencies only
RUN npm ci --omit=dev && npm cache clean --force

# Copy built files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

# Railway/Render set PORT automatically
ENV PORT=3000
ENV NODE_ENV=production

EXPOSE $PORT

# Health check for container orchestrators
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT}/health || exit 1

# Start HTTP server (Streamable HTTP transport)
CMD ["node", "dist/http-server.js"]
