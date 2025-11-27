import { supabase } from '../supabaseClient';
import type { User } from '../types';

export async function fetchUsers(): Promise<User[]> {
  const { data, error } = await supabase
    .from('tbl_user')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as User[];
}

export async function addUser(input: {
  first_name: string;
  last_name: string;
  preferred_name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}): Promise<User> {
  const payload = {
    ...input,
    active: true,
    created_by: 1, // temporary until auth is implemented
    updated_by: 1
  };

  const { data, error } = await supabase
    .from('tbl_user')
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return data as User;
}

export async function updateUser(
  id: number,
  input: {
    first_name: string;
    last_name: string;
    preferred_name: string;
    email: string;
    phone: string;
    password?: string;
    role: string;
  }
): Promise<User> {
  const payload: any = {
    first_name: input.first_name,
    last_name: input.last_name,
    preferred_name: input.preferred_name,
    email: input.email,
    phone: input.phone,
    role: input.role,
    updated_by: 1
  };

  // Only update password if provided
  if (input.password && input.password.trim() !== '') {
    payload.password = input.password;
  }

  const { data, error } = await supabase
    .from('tbl_user')
    .update(payload)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as User;
}

export async function deleteUser(id: number): Promise<void> {
  const { error } = await supabase
    .from('tbl_user')
    .delete()
    .eq('id', id);

  if (error) throw error;
}