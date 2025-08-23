# Hatsumai-BE

A TypeScript-based Express backend with PostgreSQL and Knex.js, structured for clarity and scalability.

---

## 📁 Code Structure

- `controllers/` – Handles request and response logic.
- `routes/` – Defines application routes and maps them to controllers.
- `services/` – Contains business logic and interacts with data sources or external APIs.
- `types/` – Defines TypeScript types and interfaces.
- `app.ts` – Initializes the Express app and middleware.
- `index.ts` – Entry point of the application.

---

## 🛠️ Scripts

| Script     | Description                                       |
| ---------- | ------------------------------------------------- |
| `build`    | Compiles TypeScript to JavaScript.                |
| `start`    | Runs the compiled app from the `dist` folder.     |
| `dev`      | Runs the app in development mode using `ts-node`. |
| `prestart` | Builds the project before running `start`.        |

---

## 🐳 Docker

This project includes Docker support for development environments.

### Development

To run the development setup with hot reloading and Postgres:

```bash
docker-compose -f docker-compose.dev.yaml up --build
```

This is the recommended way to test and develop the app locally.

---

## 🧱 Knex

This project uses [Knex.js](https://knexjs.org/) as the SQL query builder for managing the PostgreSQL database schema.

To apply all pending migrations, run:

```bash
npx knex migrate:latest
```

Or, if you have Knex installed globally:

```bash
knex migrate:latest
```

This ensures your local database schema matches the latest structure.

To create a new migration, run:

```bash
knex migrate:make name_of_migration
```

## 📬 Contact

For questions or feedback, feel free to open an issue or reach out via GitHub.
