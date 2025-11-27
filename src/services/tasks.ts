import { supabase } from '../supabaseClient';
import type { Task } from '../types';

export async function fetchTasks(): Promise<Task[]> {
  const { data, error } = await supabase.from('tbl_tasks').select('*');
  if (error) throw error;
  return data;
}

export async function addTask(task: Omit<Task, 'id'>): Promise<Task[]> {
  const { data, error } = await supabase.from('tbl_tasks').insert([task]).select();
  if (error) throw error;
  return data;
}