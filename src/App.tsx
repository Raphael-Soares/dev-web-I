import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import Date from './components/Date';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Plus, Search } from 'lucide-react';

export default function App() {
  return (
    <div className='flex h-screen w-full items-center justify-center bg-slate-50 '>
      <Card className='max-w-6xl w-full'>
        <CardHeader>
          <Date />
          <Progress value={33} />
        </CardHeader>
        <CardContent>
          <Tabs defaultValue='done' className=''>
            <div className='flex justify-between gap-2'>
              <TabsList className=''>
                <TabsTrigger value='done'>Done</TabsTrigger>
                <TabsTrigger value='pending'>Pending</TabsTrigger>
              </TabsList>

              <div className='flex gap-2'>
                <Input type='text' placeholder='Search' className='max-w-lg' />
                <Button variant='outline'>
                  <Search className='size-4' />
                </Button>
              </div>
            </div>

            <div className='flex  my-4'>
              <Input type='text' placeholder='Add a new task' className='border-r-0 rounded-tr-none rounded-br-none ' />
              <Button variant='outline' className='border-l-0 rounded-tl-none rounded-bl-none'>
                <Plus className='size-5' />
              </Button>
            </div>

            <TabsContent value='done'></TabsContent>
            <TabsContent value='pending'></TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className='flex justify-between'></CardFooter>
      </Card>
    </div>
  );
}
