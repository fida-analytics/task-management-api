
# Task Management REST API

A RESTful Task Management API built using Node.js, Express.js, and SQLite.

## Features

- Create a new task
- Get all tasks
- Update an existing task
- Delete a task
- Input validation
- Error handling
- JSON responses
- SQLite database integration

## Technologies

- Node.js
- Express.js
- SQLite
- JavaScript

## Project Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd task-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Server

```bash
node server.js
```

The server will run at:

```text
http://localhost:3000
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/tasks` | Create a task |
| GET | `/api/tasks` | Get all tasks |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

## Data Model

The `tasks` table contains:

| Field | Type | Description |
|---|---|---|
| id | INTEGER | Primary key |
| title | TEXT | Task title |
| completed | INTEGER | Completion status |

## Documentation

Detailed API documentation is available in:

`API-DOCUMENTATION.md`

## Error Handling

The API returns appropriate HTTP status codes:

- `201` — Task created
- `200` — Request successful
- `400` — Invalid input
- `404` — Task not found
- `500` — Server/database error