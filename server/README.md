# Hidden Trails Backend

This folder contains the Express API and Postgres database setup for Hidden Trails.

## Setup

1. Copy `.env.example` to `.env`.
2. Update the values with your actual Postgres URL and a strong JWT secret.
3. Create the database schema:
   ```bash
   psql $DATABASE_URL -f server/db/schema.sql
   ```
4. Seed the destination data:
   ```bash
   npm run seed
   ```
5. Start the API:
   ```bash
   npm run server:dev
   ```

## Routes

- `GET /api/health` — confirms the API is available.
- `GET /api/destinations` — returns the seeded destination packages.
- `POST /api/auth/signup` — creates a new account.
- `POST /api/auth/login` — logs a user in and creates a session cookie.
- `GET /api/auth/me` — returns the signed-in user.
- `POST /api/auth/logout` — clears the session cookie.

## Database schema

- `users`: stores each account with a unique email and password hash.
- `destinations`: stores the travel packages displayed on the site.

The columns are intentionally simple to keep the app easy to explain and maintain.
