# Dockerfile
FROM node:18-alpine

# Install dependencies only when needed
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci --only=production

COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the app
RUN npm run build

# Create a non-privileged user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Switch to the nextjs user
USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]
