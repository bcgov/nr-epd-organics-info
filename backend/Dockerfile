FROM node:20.11.0-bullseye-slim AS build

# Install packages, build and keep only prod packages
WORKDIR /app
COPY *.json ./
COPY ./src ./src
RUN npm ci --ignore-scripts && \
    npm run build

RUN mkdir -p /app/sessions

FROM node:20.11.0-bullseye-slim AS dependencies

# Install packages, build and keep only prod packages
WORKDIR /app
COPY *.json ./
RUN npm ci --omit=dev --ignore-scripts


# Deployment container
FROM gcr.io/distroless/nodejs20-debian11:nonroot
ENV NODE_ENV production
# Copy over app.ts
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=build /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/node_modules/prisma ./node_modules/prisma
COPY --from=build /app/dist ./dist
COPY --from=build /app/sessions ./sessions

# Port and health check
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost/:3000

# Non-privileged user
USER app

# Start up command with 250MB of heap size, each application needs to determine what is the best value. DONT use default as it is 4GB.
CMD ["--max-old-space-size=250", "/app/dist/server"]
