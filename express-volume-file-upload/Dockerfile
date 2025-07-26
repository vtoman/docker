FROM node:22-slim

WORKDIR /app
COPY index.js ./
RUN npm init -y && npm install express multer

EXPOSE 3000
CMD ["node", "index.js"]
