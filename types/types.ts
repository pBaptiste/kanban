export interface Board {
  id: string;
  name: string;
  columns: Columns[];
}

export interface Columns {
  id: string;
  name: string;
  tasks: Tasks[];
}

export interface Tasks {
  id: string;
  title: string;
  description: string;
  status: string;
  subtasks: Subtasks[];
}

export interface Subtasks {
  id: string;
  title: string;
  isCompleted: boolean;
}