export type Task = {
  id: string;
  title: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  description: string;
};
