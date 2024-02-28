import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

import { Task } from '@/lib/types/Task';

import { ColumnDef } from '@tanstack/react-table';

import { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { ArrowUpDown, Check, CircleDashed, MoreHorizontal } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { Progress } from '@/components/ui/progress';

import Date from '@/components/Date';

import { Button } from './components/ui/button';
import { formatDate } from './lib/utils';
import DataTable from './components/DataTable';
import FormEdit from './components/FormEdit';
import Form from './components/Form';

export default function App() {
  const [open, setOpen] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    console.log('task', task);
    const newState = [...tasks, task];
    syncTasks(newState);
    localStorage.setItem('tasks', JSON.stringify(newState));
  };

  const toggleTask = (task: Task) => {
    const newState = tasks.map((t: Task) => {
      if (t.id === task.id) {
        return { ...t, done: !t.done };
      }
      return t;
    });
    localStorage.setItem('tasks', JSON.stringify(newState));
    syncTasks(newState);
  };

  const removeTask = (task: Task) => {
    const newState = tasks.filter((t: Task) => t.id !== task.id);
    localStorage.setItem('tasks', JSON.stringify(newState));
    syncTasks(newState);
  };

  const updateTask = (task: Task) => {
    const newState = tasks.map((t: Task) => {
      if (t.id === task.id) {
        return task;
      }
      return t;
    });
    localStorage.setItem('tasks', JSON.stringify(newState));
    syncTasks(newState);
  };

  const progress = tasks.length ? Math.round((tasks.filter((t) => t.done).length / tasks.length) * 100) : 0;

  useEffect(() => {
    const tasks = localStorage.getItem('tasks');
    setTasks(tasks ? JSON.parse(tasks) : []);
  }, []);

  const syncTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const [category, setCategory] = useState<'all' | 'done' | 'pending'>('all');

  const data = category === 'done' ? tasks.filter((t) => t.done) : category === 'pending' ? tasks.filter((t) => !t.done) : tasks;

  const columns: ColumnDef<Task>[] = [
    {
      accessorKey: 'done',
      header: 'Status',
      cell: ({ row }) => {
        const task = row.original;
        return task.done ? <Check className='size-4 text-green-600 ' /> : <CircleDashed className='size-4 text-slate-600' />;
      }
    },
    {
      accessorKey: 'title',
      header: ({ column }) => {
        return (
          <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Title
            <ArrowUpDown className='w-4 h-4 ml-2' />
          </Button>
        );
      }
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => {
        const task = row.original;
        return <div className='truncate'>{task.description}</div>;
      }
    },
    {
      accessorKey: 'dueDate',
      header: 'Due date',
      cell: ({ row }) => {
        const task = row.original;
        return <span>{formatDate(task.dueDate)}</span>;
      }
    },
    {
      accessorKey: 'priority',
      header: 'Priority',
      cell: ({ row }) => {
        const task = row.original;

        const PRIORITIES_COLORS = {
          low: 'bg-green-500',
          medium: 'bg-yellow-500',
          high: 'bg-red-500'
        };

        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={`rounded-full size-4 ${PRIORITIES_COLORS[task.priority]} `} />
              </TooltipTrigger>
              <TooltipContent>
                <p>{task.priority}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      }
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const task = row.original;

        return (
          <div className='flex gap-2'>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreHorizontal className='h-4 w-4' />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{task.title}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    setTaskToEdit(task);
                    setOpen(true);
                  }}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => removeTask(task)}>Remove</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant='ghost' onClick={() => toggleTask(task)}>
              {!task.done ? <Check className='size-4 mr-2' /> : <CircleDashed className='size-4 mr-2' />}
              {!task.done ? 'Check as done' : 'Check as pending'}
            </Button>
          </div>
        );
      }
    }
  ];

  return (
    <div className='flex h-screen w-full items-center justify-center bg-slate-50 '>
      <Card className='max-w-6xl w-full'>
        <CardHeader>
          <Date />
          <Progress value={progress} />
        </CardHeader>
        <CardContent className='space-y-2'>
          <DataTable
            columns={columns}
            data={data}
            setCategory={setCategory}
            category={category}
            addTask={addTask}
            openNew={openNew}
            setOpenNew={setOpenNew}
          />
        </CardContent>

        {taskToEdit && <FormEdit task={taskToEdit} updateTask={updateTask} open={open} setOpen={setOpen} />}
        <Form addTask={addTask} open={openNew} setOpen={setOpenNew} />

        <CardFooter className='flex justify-between'></CardFooter>
      </Card>
    </div>
  );
}
