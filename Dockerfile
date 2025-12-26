# Multi-stage build for React app
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM node:18-alpine

# Install serve globally
RUN npm install -g serve

# Set working directory
WORKDIR /app

# Copy build from builder stage
COPY --from=builder /app/build ./build

# Expose port (Railway will set PORT env var)
EXPOSE 3000

# Start server
CMD ["serve", "-s", "build", "-l", "3000"]

