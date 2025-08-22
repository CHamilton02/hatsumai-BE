FROM node:22-alpine

# Working directory inside container
WORKDIR /usr/src/app

# Copying package.json and package-lock.json
COPY package*.json ./

# Installing project dependencies based on NODE_ENV
ARG NODE_ENV
RUN npm install

# Copying the rest of the application
COPY . .

# Exposing the port where the application will run
EXPOSE 8080

# Command to run the application
CMD ["sh", "-c", "npm run dev"]