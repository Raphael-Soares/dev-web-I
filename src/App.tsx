import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import Date from './components/Date';

export default function App() {
  return (
    <div className='flex h-screen w-full items-center justify-center bg-slate-50 '>
      <Card className='max-w-6xl w-full'>
        <CardHeader>
          <Date />
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter className='flex justify-between'></CardFooter>
      </Card>
    </div>
  );
}
