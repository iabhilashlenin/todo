import React from 'react';
import { useTodo } from '../contexts/TodoContext';

function TodoCard({ date, todos, onRemove }) {
    const { deleteTodo } = useTodo();

    const handleRemove = () => {
        onRemove(date);
    };

    return (
        <div className='border border-gray-300 rounded-lg p-4 mb-4 bg-white shadow-md'>
            <div className='flex justify-between items-center mb-2'>
                <h2 className='text-xl font-bold'>{date}</h2>
                <button
                    className='text-red-500'
                    onClick={handleRemove}
                >
                    ❌
                </button>
            </div>
            {todos.map(todo => (
                <div key={todo.id} className='flex items-center mb-2'>
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => deleteTodo(todo.id)}
                    />
                    <span className={`ml-2 ${todo.completed ? 'line-through' : ''}`}>
                        {todo.todo}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default TodoCard;
