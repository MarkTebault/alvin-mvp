export interface User {
  id: number;        
  first_name: string;
  last_name: string;
  preferred_name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
  created_by: number;
  updated_by: number;  
}

export interface Elder {
  id: number;
  caregiver_id: number;
  name: string;
  phone: string;
  timezone: string;
  active: boolean;
  created_at: string | null;
  created_by: number;
  updated_at: string;
  updated_by: number;
  deleted: boolean;
}

export interface Task {
  id: number;
  elder_id: number;
  task: string;
  task_category_id: number;
  instructions?: string;
  rrule?: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
  created_by: number;
  updated_by: number;
}
export interface Reminder{
  id: number;
  task_id: number;
  task_name: string;
  scheduled_at: Date;
  reminder_status_id: number;
  sent_at?: Date;
  confirmed_at?: Date;
  confirmed_by?: string;
  note:string,
  created_at: Date;
  updated_at: Date;
  created_by: number;
  updated_by: number;
}

export interface ReminderCategory{
  id: number;
  category: string;
}

export interface TaskCategory{
  id: number;
  category: string;
  created_at: Date;
  created_by: number;
}