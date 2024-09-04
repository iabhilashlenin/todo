import { useEffect, useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoItems from './components/TodoItems';
import { TodoProvider } from './contexts/TodoContext';

function App() {
  const [todos, setTodos] = useState([]);

  // Load todos from localStorage
  useEffect(() => {
    try {
      const storedTodos = JSON.parse(localStorage.getItem('todos'));
      if (storedTodos && Array.isArray(storedTodos)) {
        setTodos(storedTodos);
      } else {
        // Initialize with empty array if localStorage has invalid data
        setTodos([]);
      }
    } catch (error) {
      console.error('Failed to load todos from localStorage:', error);
      setTodos([]);
    }
  }, []);

  // Save todos to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error('Failed to save todos to localStorage:', error);
    }
  }, [todos]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, updatedTodo) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? updatedTodo : todo)));
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const numberComplete = todos.filter((t) => t.completed).length;
  const numberTotal = todos.length;

  const getMessage = () => {
    if (numberTotal === 0) return 'No tasks to complete! 😅';
    const percentage = (numberComplete / numberTotal) * 100;
    if (percentage === 0) return 'Try to do at least one! 🙏';
    if (percentage === 100) return 'Nice job for today! 🏝';
    return 'Keep it going 💪🏻';
  };

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-4 mt-2">Manage Your Todos</h1>
          <div className="mb-4 text-center">
            <h2 className="text-xl">
              {numberComplete}/{numberTotal} Complete
            </h2>
            <p className="text-lg">{getMessage()}</p>
          </div>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItems todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
