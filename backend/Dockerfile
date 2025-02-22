# Use an official Node.js image as the base
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the port your backend runs on
EXPOSE 5001

# Specify environment variables
ENV NODE_ENV=production

# Command to start the backend server
CMD ["npm", "run", "dev"]
