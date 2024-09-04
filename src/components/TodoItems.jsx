import React, { useEffect, useRef, useState } from 'react';
import { useTodo } from '../contexts';

function TodoItems({ todo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [todoMsg, setTodoMsg] = useState(todo.todo);
    const { updateTodo, deleteTodo, toggleComplete } = useTodo();
    const todoRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (todoRef.current && !todoRef.current.contains(event.target)) {
                if (isTodoEditable) {
                    saveTodo();
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isTodoEditable]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && isTodoEditable) {
            saveTodo();
        }
    };

    const saveTodo = () => {
        updateTodo(todo.id, { ...todo, todo: todoMsg });
        setIsTodoEditable(false);
    };

    const toggleCompleted = () => {
        toggleComplete(todo.id);
    };

    return (
        <div
            ref={todoRef}
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${todo.completed ? 'bg-[#dcedc8] line-through' : 'bg-[#ccbed7]'}`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.completed}
                onChange={toggleCompleted}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${isTodoEditable ? 'border-black/10 px-2' : 'border-transparent'}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                onKeyDown={handleKeyDown}
                readOnly={!isTodoEditable}
            />
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.completed) return;
                    if (isTodoEditable) {
                        saveTodo();
                    } else {
                        setIsTodoEditable(true);
                    }
                }}
                disabled={todo.completed}
            >
                {isTodoEditable ? '💾' : '✏️'}
            </button>
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteTodo(todo.id)}
            >
                ❌
            </button>
        </div>
    );
}

export default TodoItems;
