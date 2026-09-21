
# Task Management REST API Documentation

## Project Overview

A RESTful API built using Node.js, Express.js, and SQLite.

This API allows users to create, read, update, and delete tasks.

## Base URL

```text
http://localhost:3000
```

## Data Model

| Field | Type | Description |
|---|---|---|
| id | Integer | Unique task ID |
| title | String | Task title |
| completed | Boolean | Task completion status |

## API Endpoints

### 1. Create Task

**Method:** POST

**Endpoint:** `/api/tasks`

**Request Body:**

```json
{
  "title": "Learn REST API"
}
```

**Success Response:** `201 Created`

```json
{
  "message": "Task created successfully.",
  "task": {
    "id": 1,
    "title": "Learn REST API",
    "completed": false
  }
}
```

### 2. Get All Tasks

**Method:** GET

**Endpoint:** `/api/tasks`

**Success Response:** `200 OK`

```json
{
  "count": 1,
  "tasks": [
    {
      "id": 1,
      "title": "Learn REST API",
      "completed": false
    }
  ]
}
```

### 3. Update Task

**Method:** PUT

**Endpoint:** `/api/tasks/:id`

**Request Body:**

```json
{
  "title": "Learn Node.js and Express",
  "completed": true
}
```

**Success Response:** `200 OK`

```json
{
  "message": "Task updated successfully."
}
```

### 4. Delete Task

**Method:** DELETE

**Endpoint:** `/api/tasks/:id`

**Success Response:** `200 OK`

```json
{
  "message": "Task deleted successfully."
}
```

## Error Responses

| Status Code | Description |
|---|---|
| 400 | Invalid input |
| 404 | Task not found |
| 500 | Server or database error |

## Technologies Used

- Node.js
- Express.js
- SQLite
- JavaScript