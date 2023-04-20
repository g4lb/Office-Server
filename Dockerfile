# Use the official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory to /src
WORKDIR /src

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install --production

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 5000 for the application
EXPOSE 5000

# Set the command to run when the container starts
CMD ["npm", "run", "start:prod"]
