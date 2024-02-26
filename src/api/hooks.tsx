import { Task } from '@/lib/types/Task';
import { useEffect, useState } from 'react';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    const newState = [...tasks, task];
    syncTasks(newState);
    localStorage.setItem('tasks', JSON.stringify(newState));
  };

  const toggleTask = (task: Task) => {
    const newState = tasks.map((t: Task) => {
      if (t.id === task.id) {
        return { ...t, done: !t.done };
      }
      return t;
    });
    localStorage.setItem('tasks', JSON.stringify(newState));
    syncTasks(newState);
  };

  const removeTask = (task: Task) => {
    const newState = tasks.filter((t: Task) => t.id !== task.id);
    localStorage.setItem('tasks', JSON.stringify(newState));
    syncTasks(newState);
  };

  //progresso de 0 a 100

  const progress = tasks.length ? Math.round((tasks.filter((t) => t.done).length / tasks.length) * 100) : 0;

  const pendingTasks = tasks.filter((t) => !t.done);
  const completedTasks = tasks.filter((t) => t.done);

  useEffect(() => {
    console.log('useTasks');
    const tasks = localStorage.getItem('tasks');
    setTasks(tasks ? JSON.parse(tasks) : []);
  }, []);

  const syncTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  return { tasks, progress, pendingTasks, completedTasks, addTask, removeTask, toggleTask };
};
