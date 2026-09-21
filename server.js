
const express = require("express");
const db = require("./database");
const cors = require("cors");

const app = express();

// Rollout.host ke liye PORT
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: "https://task5-frontend-beryl.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
  })
);

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Task Management API is running!",
  });
});

// CREATE: New task
app.post("/api/tasks", (req, res) => {
  const { title } = req.body;

  if (
    !title ||
    typeof title !== "string" ||
    title.trim() === ""
  ) {
    return res.status(400).json({
      error: "Title is required and must be a non-empty string.",
    });
  }

  const cleanTitle = title.trim();

  const sql =
    "INSERT INTO tasks (title) VALUES (?)";

  db.run(sql, [cleanTitle], function (err) {
    if (err) {
      console.error(err);

      return res.status(500).json({
        error: "Failed to create task.",
      });
    }

    res.status(201).json({
      message: "Task created successfully.",
      task: {
        id: this.lastID,
        title: cleanTitle,
        completed: false,
      },
    });
  });
});

// READ: Get all tasks
app.get("/api/tasks", (req, res) => {
  const sql =
    "SELECT * FROM tasks ORDER BY id DESC";

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        error: "Failed to fetch tasks.",
      });
    }

    res.json({
      count: rows.length,
      tasks: rows.map((task) => ({
        id: task.id,
        title: task.title,
        completed: Boolean(task.completed),
      })),
    });
  });
});

// UPDATE: Edit a task
app.put("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  if (
    title !== undefined &&
    (typeof title !== "string" ||
      title.trim() === "")
  ) {
    return res.status(400).json({
      error: "Title must be a non-empty string.",
    });
  }

  if (
    completed !== undefined &&
    typeof completed !== "boolean"
  ) {
    return res.status(400).json({
      error: "Completed must be a boolean.",
    });
  }

  const cleanTitle =
    title !== undefined ? title.trim() : undefined;

  const sql = `
    UPDATE tasks
    SET
      title = COALESCE(?, title),
      completed = COALESCE(?, completed)
    WHERE id = ?
  `;

  db.run(
    sql,
    [
      cleanTitle ?? null,
      completed !== undefined
        ? (completed ? 1 : 0)
        : null,
      id,
    ],
    function (err) {
      if (err) {
        console.error(err);

        return res.status(500).json({
          error: "Failed to update task.",
        });
      }

      if (this.changes === 0) {
        return res.status(404).json({
          error: "Task not found.",
        });
      }

      res.json({
        message: "Task updated successfully.",
      });
    }
  );
});

// DELETE: Remove a task
app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;

  const sql =
    "DELETE FROM tasks WHERE id = ?";

  db.run(sql, [id], function (err) {
    if (err) {
      console.error(err);

      return res.status(500).json({
        error: "Failed to delete task.",
      });
    }

    if (this.changes === 0) {
      return res.status(404).json({
        error: "Task not found.",
      });
    }

    res.json({
      message: "Task deleted successfully.",
    });
  });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `Server running on port ${PORT}`
  );
});