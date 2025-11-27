// src/services/elders.ts
import { supabase } from '../supabaseClient';
import type { Elder } from '../types';

export async function fetchElders(): Promise<Elder[]> {
  const { data, error } = await supabase
    .from('tbl_elder')
    .select('*')
    .eq('deleted', false);

  if (error) throw error;
  return data as Elder[];
}

export async function addElder(input: {
  name: string;
  phone: string;
  timezone?: string;
}): Promise<Elder[]> {
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
    .select();

  if (error) throw error;
  return data as Elder[];
}