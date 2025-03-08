# Use the official Playwright Docker image as base
FROM mcr.microsoft.com/playwright:v1.50.1-noble

# Set working dir
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Install Playwright browsers and dependencies
# Note: The base image already includes browsers, but we ensure all dependencies are installed as a check, 1 sec addt'l time.
# RUN npx playwright install-deps

# TypeScript compile (if needed)
RUN npx tsc --version && echo "TypeScript is available"

# Set the default command
# This will be overridden by docker-compose for each specific service
CMD ["npx", "playwright", "test"]
