# Use official Node.js image
FROM node:18-alpine

WORKDIR /app

# Copy server source
COPY server ./server
WORKDIR /app/server
RUN npm install --production

# Copy static client into server public directory
COPY client ./public

EXPOSE 3000
CMD ["npm", "start"] 