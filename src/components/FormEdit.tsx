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
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [dueDate, setDueDate] = useState(task?.dueDate || new Date());
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(task?.priority || 'low');

  const handleUpdateTask = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const newTask: Task = {
      ...task,
      title,
      description,
      dueDate,
      priority,
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
                <Input id='name' required className='col-span-3' onChange={(e) => setTitle(e.target.value)} value={title} />
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='username' className='text-right'>
                  Description
                </Label>
                <Input id='username' required className='col-span-3' onChange={(e) => setDescription(e.target.value)} value={description} />
              </div>

              <div className='grid grid-cols-4 items-center gap-4'>
                <Label className='text-right'>Due</Label>
                <DatePicker setDate={setDueDate} date={dueDate} />
              </div>

              <div className='grid grid-cols-4 items-center gap-4'>
                <Label className='text-right'>Priority</Label>
                <Select required>
                  <SelectTrigger className='w-[280px]'>
                    <SelectValue placeholder='Select the priority' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Priority</SelectLabel>
                      <SelectItem value='low' onClick={() => setPriority('low')}>
                        Low
                      </SelectItem>
                      <SelectItem value='medium' onClick={() => setPriority('medium')}>
                        Medium
                      </SelectItem>
                      <SelectItem value='high' onClick={() => setPriority('high')}>
                        High
                      </SelectItem>
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
