import { useState, useEffect } from 'react';
import './App.css';

interface Todo {
  id: number;
  text: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function addTodo(): void {
    if (inputValue.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    } else {
      alert('Введите текст задачи');
    }
  }

  function deleteTodo(id: number): void {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  return (
    <div className="container">
      <h1 className="title">Список задач</h1>
      <div className="top-wrapper">
        <input
          type="text"
          className="input"
          placeholder="Новая задача"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="btn" onClick={addTodo}>
          Добавить
        </button>
      </div>

      {todos.length === 0 ? (
        <p className="empty-message">Задач пока нет. Добавьте первую!</p>
      ) : (
        <ul className="list">
          {todos.map(todo => (
            <li key={todo.id} className="todo-item">
              <span>{todo.text}</span>
              <button
                className="delete-btn"
                onClick={() => deleteTodo(todo.id)}
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;