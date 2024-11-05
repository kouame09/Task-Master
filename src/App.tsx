import React, { useState } from 'react';
import { CheckCircle2, ListTodo, Plus } from 'lucide-react';
import { TodoList } from './components/TodoList';
import type { Todo } from './types';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const todo: Todo = {
      id: crypto.randomUUID(),
      text: newTodo.trim(),
      completed: false,
    };

    setTodos((prev) => [...prev, todo]);
    setNewTodo('');
  };

  const handleToggle = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleReorder = (oldIndex: number, newIndex: number) => {
    setTodos((prev) => {
      const newTodos = [...prev];
      const [removed] = newTodos.splice(oldIndex, 1);
      newTodos.splice(newIndex, 0, removed);
      return newTodos;
    });
  };

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <ListTodo className="h-12 w-12 text-indigo-600" />
          </div>
          <h1 className="mb-2 text-4xl font-bold text-gray-900">Task Master</h1>
          <p className="text-gray-600">
            Organize your day, achieve your goals
          </p>
        </div>

        <div className="mb-8 rounded-2xl bg-white p-6 shadow-lg">
          <form onSubmit={handleAddTodo} className="flex gap-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 rounded-lg border border-gray-200 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            >
              <Plus className="h-5 w-5" />
              Add
            </button>
          </form>
        </div>

        {todos.length > 0 ? (
          <>
            <div className="mb-6 flex items-center justify-between rounded-xl bg-white px-6 py-4 shadow-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <span className="font-medium text-gray-600">
                  {completedCount} of {todos.length} tasks completed
                </span>
              </div>
              <div className="h-2 flex-1 max-w-48 mx-4 rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-emerald-500 transition-all duration-500"
                  style={{
                    width: `${(completedCount / todos.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <TodoList
              todos={todos}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onReorder={handleReorder}
            />
          </>
        ) : (
          <div className="text-center rounded-xl bg-white p-8 shadow-sm">
            <p className="text-gray-500">No tasks yet. Add one to get started!</p>
          </div>
        )}
      </div> 
    </div>
  );
}

export default App;