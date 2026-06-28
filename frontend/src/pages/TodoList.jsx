import { useEffect, useState } from "react";
import axios from "axios";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:5000/todos");
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!title.trim()) return alert("Enter todo title");

    await axios.post("http://localhost:5000/todos", {
      title,
      description: "Created from frontend",
    });

    setTitle("");
    fetchTodos();
  };

  const toggleTodo = async (todo) => {
    await axios.put(`http://localhost:5000/todos/${todo.id}`, {
      completed: !todo.completed,
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="container">
      <h1>Todo List</h1>

      <div className="form">
        <input
          placeholder="Enter todo title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>

      {todos.map((todo) => (
        <div className="todo-card" key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo)}
          />

          <a href={`/todo?id=${todo.id}`}>
            {todo.completed ? <s>{todo.title}</s> : todo.title}
          </a>

          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default TodoList;