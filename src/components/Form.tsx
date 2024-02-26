import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import DatePicker from './DatePicker';
import { useState } from 'react';
import { Task } from '@/lib/types/Task';

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogClose } from '@radix-ui/react-dialog';
import { useTasks } from '@/api/hooks';

export default function Form({ addTask }: { addTask: (task: Task) => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());

  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low');

  const handleAddNewTask = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description,
      done: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      dueDate,
      priority
    };
    addTask(newTask);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>
          <Plus className='size-4 mr-2' />
          New todo
        </Button>
      </DialogTrigger>
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
  );
}
