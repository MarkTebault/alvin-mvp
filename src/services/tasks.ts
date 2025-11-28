import { supabase } from '../supabaseClient';
import type { Task } from '../types';

export async function fetchTasksByElder(elderId: number): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tbl_tasks')
    .select('*')
    .eq('elder_id', elderId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function fetchTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tbl_tasks')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}

export async function addTask(task: Omit<Task, 'id' | 'created_at' | 'updated_at'>): Promise<Task> {
  const { data, error } = await supabase
    .from('tbl_tasks')
    .insert([task])
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function updateTask(
  id: number,
  task: Partial<Omit<Task, 'id' | 'created_at' | 'updated_at'>>
): Promise<Task> {
  const payload = {
    ...task,
    updated_by: 1,
  };

  const { data, error } = await supabase
    .from('tbl_tasks')
    .update(payload)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function deleteTask(id: number): Promise<void> {
  const { error } = await supabase
    .from('tbl_tasks')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}