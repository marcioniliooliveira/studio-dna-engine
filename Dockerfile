# Multi-stage production Dockerfile for Studio DNA Engine
FROM node:20-bookworm-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

FROM mcr.microsoft.com/playwright:v1.49.0-noble AS runner
WORKDIR /app
ENV NODE_ENV=production PORT=4000 HOST=0.0.0.0 PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
RUN npx playwright install chromium

COPY . .

RUN mkdir -p /app/copias /app/data && chown -R pwuser:pwuser /app

USER pwuser

VOLUME ["/app/copias", "/app/data"]

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 CMD node -e "require('http').get('http://127.0.0.1:4000/api/v3/analytics/kpi', (r) => { process.exit(r.statusCode === 200 ? 0 : 1); }).on('error', () => process.exit(1));"

ENTRYPOINT ["node", "bin/cli.js"]
CMD ["--preview", "--port", "4000"]
