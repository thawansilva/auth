# Authentication Study Project

A small Express API for practicing user registration, login, password hashing, and JWT-protected routes.

**This project is for STUDY PURPOSES, do not implement an authentication like this**

## Requirements

- Node.js 18 or newer
- npm

## Installation

Clone the project and install its dependencies:

```bash
npm install
```

## Run the API

Start the server with:

```bash
npm run dev
```

The API listens on `http://localhost:8000`.

## Test the endpoints

### Register a user

```bash
curl -i -X POST http://localhost:8000/register \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"secret123"}'
```

Expected status: `201 Created`.

### Log in

Use the same credentials to receive a JWT:

```bash
curl -i -X POST http://localhost:8000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"secret123"}'
```

Copy the token from the response. It is returned in `data.token`.

### Access the protected home endpoint

Replace `<token>` with the token returned by `/login`:

```bash
curl -i http://localhost:8000/home \
  -H "authentication: Bearer <token>"
```

The current middleware expects the JWT in the `authentication` header.

### Test unauthenticated access

```bash
curl -i http://localhost:8000/home
```

Expected status: `401 Unauthorized`.

### Test invalid credentials

```bash
curl -i -X POST http://localhost:8000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"wrong-password"}'
```

Expected status: `404 Not Found`.

## Available commands

| Command | Description |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the API on port 8000 |

## Endpoints

| Method | Path | Authentication |
| --- | --- | --- |
| `POST` | `/register` | None |
| `POST` | `/login` | None |
| `GET` | `/home` | JWT via `authentication` header |