# Auth Methods

A RESTful authentication API built with Express 5, Prisma, and JWT. Supports user registration, login, and role-based access with PostgreSQL.

## Tech Stack

- **Runtime:** Node.js with TypeScript
- **Framework:** Express 5
- **ORM:** Prisma 7
- **Database:** PostgreSQL
- **Auth:** JWT (jsonwebtoken) + bcrypt
- **Docs:** Swagger UI (OpenAPI 3.0)

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/auth_methods"
JWT_SECRET="your-secret-key"
PORT=9000
```

### Database Setup

```bash
npx prisma migrate dev
npm run prisma:generate
```

### Run

```bash
# Development (watch mode)
npm run dev

# Production
npm start
```

## API Endpoints

### Auth

| Method | Endpoint         | Description              | Auth |
| ------ | ---------------- | ------------------------ | ---- |
| POST   | `/auth/register` | Register a new user      | No   |
| POST   | `/auth/login`    | Login with credentials   | No   |

### Users

| Method | Endpoint              | Description          | Auth   |
| ------ | --------------------- | -------------------- | ------ |
| GET    | `/users`              | Get all users        | Bearer |
| GET    | `/users/email/:email` | Get user by email    | Bearer |

## API Documentation

Interactive Swagger docs are available at:

```
http://localhost:9000/api-docs
```

## Project Structure

```
src/
  index.ts                 # App entry point
  swagger.ts               # Swagger/OpenAPI config
  controllers/
    auth.controllers.ts    # Auth request handlers
    user.controller.ts     # User request handlers
  middlewares/
    auth.middleware.ts     # JWT auth middleware
  routes/
    auth.routes.ts         # Auth routes
    user.routes.ts         # User routes
  services/
    auth.service.ts        # Auth business logic
    user.service.ts        # User business logic
  lib/
    prisma.ts              # Prisma client instance
prisma/
  schema.prisma            # Database schema
```

## Database Models

- **User** - id, email, name, role (USER/STAFF/ADMIN), timestamps
- **Password** - hashed password stored separately, linked to User
- **Order** - user orders with total amount
- **Staff** - staff profiles linked to users

## License

ISC
