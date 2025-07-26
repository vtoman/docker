FROM node:22-slim AS frontend-build

# Build React frontend
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Backend stage
FROM node:22-slim
WORKDIR /app
COPY backend/ ./
RUN npm init -y && npm install express swagger-ui-express body-parser
COPY --from=frontend-build /app/dist ./public
EXPOSE 3000
CMD ["node", "index.js"]
