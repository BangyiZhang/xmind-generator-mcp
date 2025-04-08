# Generated by https://smithery.ai. See: https://smithery.ai/docs/config#dockerfile
FROM node:lts-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install --ignore-scripts

# Bundle app source
COPY . .

# Build the project
RUN npm run build

# Set environment variable to disable opening files in container
ENV DISABLE_OPEN=1

# Command to run the MCP server
CMD ["npm", "start"]
