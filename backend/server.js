const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

const FILE = "./todos.json";

function readTodos() {
  if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, "[]");
  }
  return JSON.parse(fs.readFileSync(FILE));
}

function writeTodos(todos) {
  fs.writeFileSync(FILE, JSON.stringify(todos, null, 2));
}

app.get("/todos", (req, res) => {
  res.json(readTodos());
});

app.get("/todos/:id", (req, res) => {
  const todos = readTodos();
  const todo = todos.find((t) => t.id == req.params.id);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  res.json(todo);
});

app.post("/todos", (req, res) => {
  const todos = readTodos();

  const todo = {
    id: Date.now(),
    title: req.body.title,
    description: req.body.description || "",
    completed: false
  };

  todos.push(todo);
  writeTodos(todos);

  res.status(201).json(todo);
});

app.put("/todos/:id", (req, res) => {
  const todos = readTodos();
  const index = todos.findIndex((t) => t.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  todos[index] = {
    ...todos[index],
    ...req.body
  };

  writeTodos(todos);

  res.json(todos[index]);
});

app.delete("/todos/:id", (req, res) => {
  const todos = readTodos();

  const updated = todos.filter((t) => t.id != req.params.id);

  writeTodos(updated);

  res.json({
    message: "Todo deleted successfully"
  });
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});