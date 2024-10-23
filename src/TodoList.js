import React, { useState } from 'react';
import './TodoList.css';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputTitle, setInputTitle] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const addTodo = () => {
    if (inputTitle.trim()) {
      const newTodo = {
        title: inputTitle.trim(),
        description: inputDescription.trim(),
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputTitle('');
      setInputDescription('');
    }
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const editTodo = (index) => {
    setEditingIndex(index);
    setInputTitle(todos[index].title);
    setInputDescription(todos[index].description);
  };

  const updateTodo = () => {
    const updatedTodos = [...todos];
    updatedTodos[editingIndex] = {
      title: inputTitle,
      description: inputDescription,
      completed: false,
    };
    setTodos(updatedTodos);
    setInputTitle('');
    setInputDescription('');
    setEditingIndex(null);
  };

  return (
    <div className="todo-container">
      <h1>My Todo List</h1>

      <input
        type="text"
        value={inputTitle}
        onChange={(e) => setInputTitle(e.target.value)}
        placeholder="Todo Title"
      />
      <textarea
        value={inputDescription}
        onChange={(e) => setInputDescription(e.target.value)}
        placeholder="Todo Description"
      />

      {editingIndex !== null ? (
        <button onClick={updateTodo}>Update Todo</button>
      ) : (
        <button onClick={addTodo}>Add Todo</button>
      )}

      <ul>
        {todos.map((todo, index) => (
          <li key={index} className={todo.completed ? 'completed' : ''}>
            <div className="todo-actions">
              <button onClick={() => deleteTodo(index)}>Delete</button>
              <button onClick={() => toggleComplete(index)}>
                {todo.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
              </button>
              <button onClick={() => editTodo(index)}>Edit</button>
            </div>

            <div className="todo-content">
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
