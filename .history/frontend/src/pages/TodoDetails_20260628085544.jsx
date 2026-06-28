import { useEffect, useState } from "react";
import axios from "axios";

function TodoDetails() {
  const [todo, setTodo] = useState(null);

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  useEffect(() => {
    axios.get(`http://localhost:5000/todos/${id}`).then((res) => {
      setTodo(res.data);
    });
  }, [id]);

  if (!todo) return <h2>Loading...</h2>;

  return (
    <div className="container">
      <h1>Todo Details</h1>

      <p><b>ID:</b> {todo.id}</p>
      <p><b>Title:</b> {todo.title}</p>
      <p><b>Description:</b> {todo.description}</p>
      <p><b>Status:</b> {todo.completed ? "Completed" : "Pending"}</p>

      <a href="/" className="back-btn">
  ← Back to Todo List
</a>
    </div>
  );
}

export default TodoDetails;