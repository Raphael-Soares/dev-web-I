import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DatePicker from './DatePicker';
import { useState } from 'react';
import { Task } from '@/lib/types/Task';

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

type Props = {
  addTask: (task: Task) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function Form({ addTask, open, setOpen }: Props) {
  const [dueDate, setDueDate] = useState(new Date());

  const handleAddNewTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      done: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      dueDate,
      priority: formData.get('priority') as Task['priority']
    };

    console.log('newTask', newTask);
    addTask(newTask);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <form onSubmit={handleAddNewTask}>
          <DialogHeader>
            <DialogTitle>New todo</DialogTitle>
            <DialogDescription>Create a task for your future self to complete.</DialogDescription>
          </DialogHeader>

          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-right'>
                Name
              </Label>
              <Input id='name' required className='col-span-3' name='title' />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='username' className='text-right'>
                Description
              </Label>
              <Input id='username' required className='col-span-3' name='description' />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label className='text-right'>Due</Label>
              <DatePicker setDate={setDueDate} date={dueDate} />
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <Label className='text-right'>Priority</Label>
              <Select required name='priority'>
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
            <Button type='submit'>Confirm</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
