import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DatePicker from './DatePicker';
import { useState } from 'react';
import { Task } from '@/lib/types/Task';

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogClose } from '@radix-ui/react-dialog';

type Props = {
  task: Task;
  updateTask: (task: Task) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function FormEdit({ task, updateTask, open, setOpen }: Props) {
  const [dueDate, setDueDate] = useState(task?.dueDate || new Date());

  const handleUpdateTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const newTask: Task = {
      ...task,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      dueDate,
      priority: formData.get('priority') as Task['priority'],
      updatedAt: new Date().toISOString()
    };
    updateTask(newTask);
  };

  return (
    task && (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-[425px]'>
          <form onSubmit={handleUpdateTask}>
            <DialogHeader>
              <DialogTitle>Edit yout todo</DialogTitle>
              <DialogDescription>Don't worry, you can edit as any times you want.</DialogDescription>
            </DialogHeader>

            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='name' className='text-right'>
                  Name
                </Label>
                <Input id='name' required className='col-span-3' name='title' defaultValue={task.title} />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='username' className='text-right'>
                  Description
                </Label>
                <Input id='username' required className='col-span-3' name='description' defaultValue={task.description} />
              </div>

              <div className='grid grid-cols-4 items-center gap-4'>
                <Label className='text-right'>Due</Label>
                <DatePicker setDate={setDueDate} date={dueDate} />
              </div>

              <div className='grid grid-cols-4 items-center gap-4'>
                <Label className='text-right'>Priority</Label>
                <Select required name='priority' defaultValue={task.priority}>
                  <SelectTrigger className='w-[280px]'>
                    <SelectValue placeholder='Select the priority' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Priority</SelectLabel>
                      <SelectItem value='low'>Low</SelectItem>
                      <SelectItem value='medium'>Medium</SelectItem>
                      <SelectItem value='high'>High</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type='submit'>Confirm</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    )
  );
}
