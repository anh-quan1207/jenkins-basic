"use client";

import { FormEvent, useMemo, useState } from "react";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

const initialTodos: Todo[] = [
  { id: 1, text: "Prepare Jenkins pipeline", done: true },
  { id: 2, text: "Demo todo app deployment", done: false },
  { id: 3, text: "Show new UI text after build", done: false }
];

export default function Home() {
  const [todos, setTodos] = useState(initialTodos);
  const [draft, setDraft] = useState("");

  const remainingCount = useMemo(
    () => todos.filter((todo) => !todo.done).length,
    [todos]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const text = draft.trim();
    if (!text) {
      return;
    }

    setTodos((current) => [
      {
        id: Date.now(),
        text,
        done: false
      },
      ...current
    ]);
    setDraft("");
  };

  const toggleTodo = (id: number) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos((current) => current.filter((todo) => !todo.done));
  };

  return (
    <main className="page-shell">
      <section className="hero-card">
        <p className="eyebrow">Next.js demo app</p>
        <h1>Task List v2</h1>
        <p className="hero-copy">
          A simple to-do list for Jenkins demo builds. Make a small change here,
          rebuild, and the updated page is visible immediately.
        </p>

        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-label">Total tasks</span>
            <strong>{todos.length}</strong>
          </div>
          <div className="stat-card">
            <span className="stat-label">Remaining</span>
            <strong>{remainingCount}</strong>
          </div>
        </div>
      </section>

      <section className="todo-card">
        <form className="todo-form" onSubmit={handleSubmit}>
          <input
            aria-label="New task"
            className="todo-input"
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Add a task for the demo..."
            value={draft}
          />
          <button className="primary-button" type="submit">
            Add task
          </button>
        </form>

        <ul className="todo-list">
          {todos.map((todo) => (
            <li className="todo-item" key={todo.id}>
              <label className="todo-label">
                <input
                  checked={todo.done}
                  onChange={() => toggleTodo(todo.id)}
                  type="checkbox"
                />
                <span className={todo.done ? "todo-text done" : "todo-text"}>
                  {todo.text}
                </span>
              </label>
            </li>
          ))}
        </ul>

        <button className="secondary-button" onClick={clearCompleted} type="button">
          Clear completed
        </button>
      </section>
    </main>
  );
}

