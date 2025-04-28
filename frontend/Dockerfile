# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install --legacy-peer-deps
COPY frontend/ ./
# Ensure NEXT_PUBLIC_API_BASE_URL is correctly set at runtime via K8s env vars
RUN npm run build

# Stage 2: Serve the production build
FROM node:18-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start", "--", "-H", "0.0.0.0"]