FROM node:18-alpine AS frontend_builder
WORKDIR /app/frontend
# copy frontend package manifests
COPY ../frontend/package*.json ./
RUN npm install
COPY ../frontend .
RUN npm run build

# -----------------
FROM node:18-alpine
WORKDIR /app
# Install backend deps
COPY backend/package*.json ./
RUN npm install --omit=dev
# Copy backend source
COPY backend .
# Copy built frontend
COPY --from=frontend_builder /app/frontend/dist ./frontend/dist
EXPOSE 3000
CMD ["node", "src/index.js"] 