# Hidden Trails Travel App

Hidden Trails is a full-stack travel website built with React + Tailwind on the frontend and Express + Postgres on the backend. The project includes a live API, database-backed destinations, and real auth with session cookies.

## Assignment 3 features

- Split frontend and backend structure with the Vite app on the client and Express API in `server/`
- Postgres database connection using `pg` and environment variables in `.env`
- Database schema and seed script for products and user data
- Real API routes for health checks, destination reading, and auth
- Signup and login flows with bcrypt password hashing and JWT cookie sessions
- UI updates to show signed in vs signed out state
- Vite proxy to the backend so the app uses `/api` routes during development

## Project structure

```text
.
├── .env.example
├── .gitignore
├── README.md
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── src/
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── MainContent.jsx
│   │   └── QuantityStepper.jsx
│   └── data/
│       └── destinations.js
├── server/
│   ├── README.md
│   ├── index.js
│   ├── config/
│   │   └── db.js
│   ├── db/
│   │   ├── schema.sql
│   │   └── seed.js
│   ├── middleware/
│   │   └── auth.js
│   └── routes/
│       ├── auth.js
│       └── destinations.js
└── .env (local only, not committed)
```

## Environment setup

1. Copy `.env.example` to `.env`
2. Fill in your real Postgres connection string and a strong JWT secret
3. Create the database schema and seed the data

```bash
psql $DATABASE_URL -f server/db/schema.sql
npm run seed
```

## Local development

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev:full
```

This starts:
- Vite frontend at http://localhost:5173
- Express API at http://localhost:5000

If you want to run only the backend:

```bash
npm run server:dev
```

To build for production:

```bash
npm run build
```

## API overview

### Public routes

- `GET /api/health` — checks if the API is online
- `GET /api/destinations` — returns destination packages from Postgres

### Auth routes

- `POST /api/auth/signup` — creates a user and logs them in
- `POST /api/auth/login` — signs in an existing user
- `GET /api/auth/me` — returns current signed-in user from cookie session
- `POST /api/auth/logout` — clears the auth cookie

## Database schema

The app uses two main tables:

- `users` — stores each account's name, email, and password hash
- `destinations` — stores travel package rows such as destination name, category, description, duration, price, and image URL

The database is seeded with the initial Bali, Morocco, and Swiss Alps package data so the frontend gets real API data instead of hardcoded values.

## Auth flow

- Passwords are hashed with `bcryptjs` before insertion.
- A JWT is created on signup/login and sent as an httpOnly cookie.
- The API checks the cookie with middleware before protected routes run.
- The frontend reads the session from `/api/auth/me` and updates the Header to show a sign-in or sign-out state.

## Deployment notes

This repo is configured to work with a Postgres database and a public backend deployment. In production, set `DATABASE_URL`, `JWT_SECRET`, and `CLIENT_URL` in the host environment, then deploy the backend to a service such as Render and the frontend to Vercel or Netlify.

## Assignment notes

- No TypeScript is used.
- Secrets are kept in `.env` and excluded from Git.
- The project keeps the existing Hidden Trails design while moving to a real backend architecture.
- GitHub repository: https://github.com/chandini458/hidden-trails-travel