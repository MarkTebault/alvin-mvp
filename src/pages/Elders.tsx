import { useEffect, useState } from 'react';
import { fetchElders } from '../services/elders';
import type { Elder } from '../types';

export default function Elders() {
  const [elders, setElders] = useState<Elder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newName, setNewName] = useState<string>('');


  useEffect(() => {
    fetchElders().then(setElders).finally(() => setLoading(false));
  }, []);

  // const handleAdd = async () => {
  //   if (!newName) return;
  //   const data = await addElder(newName);
  //   setElders([...elders, ...data]);
  //   setNewName('');
  // };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Elders</h2>
      <ul>{elders.map(e => <li key={e.id}>{e.name}</li>)}</ul>
      <input type='text' placeholder='New elder name' value={newName} onChange={e => setNewName(e.target.value)} />
      
    </div>
  );
}