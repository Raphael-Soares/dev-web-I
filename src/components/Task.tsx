import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Task } from '@/lib/types/Task';

export default function TaskComponent({ task }: { task: Task }) {
  return (
    <Card className='bg-slate-100 flex'>
      <CardContent>
        <CardHeader>
          <CardTitle>{task.title}</CardTitle>
          <CardDescription className='line-clamp-2'>{task.description}</CardDescription>
        </CardHeader>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
