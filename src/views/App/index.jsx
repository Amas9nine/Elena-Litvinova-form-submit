import React, { useState } from 'react';


import { InputPlus } from '../components/InputPlus';
import { InputTask } from '../components/InputTask';

import styles from './index.module.scss';

export const generateId = () => (
  Math.random().toString(16).slice(2) + new Date().getTime().toString(36)
);

export const App = () => {
  const [tasks, setTasks] = useState([]);

  const onAdd = (title) => {
    if (title) {
      setTasks([{ id: generateId(), title, }, ...tasks])
    }
  }
  const onDone = (id) => {
    setTasks(tasks.filter((item) => (item.id !== id)))
  }

  const onDelete = (id) => {
    setTasks(tasks.filter((item) => (item.id !== id)))
  }

  const onEdite = (id, value) => {
    setTasks(tasks.map(item => item.id === id ? {
      ...item,
      title: value
    }
      :
      item))
  }

  return (
    <article className={styles.article}>
      <h1 className={styles.articleTitle}>To Do App</h1>
      <section className={styles.articleSection}>
        <InputPlus
          onAdd={onAdd}
        />
      </section>
      <section className={styles.articleSection}>
        {tasks.length <= 0 && (
          <p className={styles.articleText}>There is no one task.</p>
        )}
        {tasks.map((task) => (
          <InputTask
            key={task.id}
            id={task.id}
            title={task.title}
            onDone={onDone}
            onDelete={onDelete}
            onEdite={onEdite}
            onAdd={onAdd}
          />
        ))}
      </section>
    </article>
  );
}