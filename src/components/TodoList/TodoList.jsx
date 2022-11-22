import React, { useEffect, useState } from 'react';
import AddTodo from '../AddTodo/AddTodo';
import Todo from '../Todo/Todo';
import styles from './TodoList.module.css';

export default function TodoList({ filter }) {
  const [todos, setTodos] = useState(readTodosFromLocalStorage);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAdd = (todo) => {
    setTodos((prev) => [...prev, todo]);
  };

  const handleUpdate = (updated) => {
    setTodos(todos.map((prev) => (prev.id === updated.id ? updated : prev)));
  };

  const handleDelete = (deleted) => {
    setTodos(todos.filter((prev) => prev.id !== deleted.id));
  };

  const filteredTodos = getFilteredItems(todos, filter);
  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        {filteredTodos.map((item) => (
          <Todo
            key={item.id}
            todo={item}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </ul>
      <AddTodo onAdd={handleAdd} />
    </section>
  );
}

function getFilteredItems(todos, filter) {
  if (filter === 'all') {
    return todos;
  }
  return todos.filter((todo) => todo.status === filter);
}

function readTodosFromLocalStorage() {
  const todos = localStorage.getItem('todos');
  console.log('called');
  return todos ? JSON.parse(todos) : [];
}
