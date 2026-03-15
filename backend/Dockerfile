# Use official Node image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the application code
COPY . .

# Expose backend port
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
