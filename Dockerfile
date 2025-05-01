# Use Node.js base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the code
COPY . .

# Expose port (your app should listen on this)
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
