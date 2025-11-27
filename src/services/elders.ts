import { supabase } from '../supabaseClient';
import type { Elder } from '../types';

export async function fetchElders(): Promise<Elder[]> {
  const { data, error } = await supabase
    .from('tbl_elder')
    .select('*')
    .eq('deleted', false)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Elder[];
}

export async function addElder(input: {
  name: string;
  phone: string;
  timezone?: string;
}): Promise<Elder> {
  const payload = {
    caregiver_id: 1,  // temporary until auth is implemented
    created_by: 1,
    updated_by: 1,
    timezone: input.timezone ?? 'America/New_York',
    active: true,
    deleted: false,
    ...input,
  };

  const { data, error } = await supabase
    .from('tbl_elder')
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return data as Elder;
}

export async function updateElder(
  id: number,
  input: {
    name: string;
    phone: string;
    timezone: string;
  }
): Promise<Elder> {
  const payload = {
    ...input,
    updated_by: 1
  };

  const { data, error } = await supabase
    .from('tbl_elder')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Elder;
}

export async function deleteElder(id: number): Promise<void> {
  // Soft delete by setting deleted flag
  const { error } = await supabase
    .from('tbl_elder')
    .update({ deleted: true, updated_by: 1 })
    .eq('id', id);

  if (error) throw error;
}