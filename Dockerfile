FROM node:22-alpine

# Working directory inside container
WORKDIR /usr/src/app

# Copying package.json and package-lock.json
COPY package*.json ./

# Installing project dependencies based on NODE_ENV
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "prod" ]; then \
  npm install --omit=dev; \
  else \
  npm install; \
  fi

# Build the app if ENV is prod
RUN if [ "$NODE_ENV" = "prod" ]; then \
  npm run prestart; \
  fi

# Copying the rest of the application
COPY . .

# Exposing the port where the application will run
EXPOSE 8080

# Set the enviornment variable for dev or prod
ENV NODE_ENV=$NODE_ENV

# Command to run the application
CMD ["sh", "-c", "if [\"$NODE_ENV\" = 'prod']; then npm start; else npm run dev; fi"]