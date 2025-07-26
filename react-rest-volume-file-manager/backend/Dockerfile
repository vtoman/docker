# Frontend build
FROM node:22-slim as frontend
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend ./
RUN npm run build

# Backend
FROM node:22-slim
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend/ .
COPY --from=frontend /app/dist/ ./public
EXPOSE 3000
CMD ["npm", "start"]
