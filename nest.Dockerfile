# Stage 1: Build and compile the code
FROM node:20.9.0-slim AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./
COPY tsconfig.json ./

# Set NODE_ENV to production
#ENV NODE_ENV=production

# Install packages
RUN npm install

# Copy the entire application directory to the working directory
COPY src ./src
COPY tsconfig.json ./

# Build the application
RUN npm run build

# Stage 2: Run the application in a smaller production image
FROM node:20.9.0-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Set NODE_ENV to production
#ENV NODE_ENV=production

# Install production dependencies
RUN npm ci --production

# Copy the built code from the previous stage
COPY --from=builder /app/dist ./dist

# Expose the port on which the application will run
EXPOSE 3000

# Start the Nest.js application
CMD ["npm", "run", "start:prod"]
