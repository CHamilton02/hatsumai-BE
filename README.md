# Hatsumai-BE

## Code Structure

- `controllers`: contains the logic for handling requests and responses.
- `routes`: defines application routes and links them to controllers.
- `services`: contains business logic and interacts with data sources or external APIs.
- `types`: defines TypeScript types and interfaces.
- `app.ts`: initializes the Express application and middleware.
- `index.ts`: the entry point of the application.

## Scripts

- `build`: compiles TypeScript files into JavaScript.
- `start`: runs the compiled application.
- `dev`: runs the application using `ts-node` for development without compiling.
- `prestart`: ensures the project is built before starting.

## Docker

- A `Dockerfile` along with prod and dev `docker-compose` files were created for an enhanced testing experience.
- Instead of running the scripts to run/test this code, I highly recommend running `docker-compose.dev.yaml`.
- Additionally, there is `docker-compose.prod.yaml` for production.
