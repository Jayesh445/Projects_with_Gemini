import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:3001/todos');
    setTodos(response.data);
  };

  const addTodo = async () => {
    await axios.post('http://localhost:3001/todos', { task: newTask });
    setNewTask('');
    fetchTodos();
  };

  const toggleComplete = async (todo) => {
    await axios.put(`http://localhost:3001/todos/${todo._id}`, { completed: !todo.completed });
    fetchTodos();
  };

  const deleteTodo = async (todo) => {
    await axios.delete(`http://localhost:3001/todos/${todo._id}`);
    fetchTodos();
  };

  return (
    <div>
      <h2>Todo List</h2>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.task}
            </span>
            <button onClick={() => toggleComplete(todo)}>
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => deleteTodo(todo)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;