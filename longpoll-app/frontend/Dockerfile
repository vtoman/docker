FROM node:22-slim

# Create app directory
WORKDIR /app

# Copy package files first for better cache utilisation
COPY package*.json ./

# Install deps
RUN npm install --production=false

# Copy the rest of the source
COPY . .

# Build the React application
RUN npm run build

# Default command does nothing because docker-compose overrides it.
CMD ["node", "-e", "console.log('frontend image built')"] 