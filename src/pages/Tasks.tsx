import { useEffect, useState } from 'react';
import { fetchTasks } from '../services/tasks';
import type { Task } from '../types';

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [taskName, setTaskName] = useState<string>('');

  useEffect(() => {
    fetchTasks().then(setTasks).finally(() => setLoading(false));
  }, []);

  // const handleAdd = async () => {
  //   if (!taskName) return;
  //   const data = await addTask({ name: taskName, elder_id: 1 }); // temporary: assign to elder_id 1
  //   setTasks([...tasks, ...data]);
  //   setTaskName('');
  // };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Tasks</h2>
      <ul>{tasks.map(t => <li key={t.id}>{t.task_name}</li>)}</ul>
      <input type='text' placeholder='New task name' value={taskName} onChange={e => setTaskName(e.target.value)} />
      
    </div>
  );
}