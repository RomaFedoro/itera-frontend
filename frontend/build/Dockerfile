ARG NODE_VERSION=18.16-slim

FROM node:${NODE_VERSION} AS base

FROM base AS builder

WORKDIR /build

COPY . .

RUN npm cache clean --force && npm ci && npm run build

FROM base

WORKDIR /app

COPY --from=builder /build/node_modules ./node_modules
COPY --from=builder /build/package.json ./package.json
COPY --from=builder /build/next.config.js ./next.config.js

COPY --from=builder /build/public ./public
COPY --from=builder /build/.next ./.next

ENV PORT=3000

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
