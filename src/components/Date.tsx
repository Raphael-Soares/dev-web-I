export default function Header() {
  const date = new Date();

  const [day, month, year] = date.toLocaleDateString().split('/');

  const [dayName] = date.toLocaleDateString('en-US', { weekday: 'long' }).split(' ');

  const monthName = date.toLocaleDateString('en-US', { month: 'short' });

  return (
    <header className=' flex justify-between items-center'>
      <div className='flex flex-row items-center'>
        <span className='text-6xl font-semibold'>{day}</span>

        <span className='flex flex-col -space-y-2'>
          <span className='text-2xl font-normal'>{monthName}</span>
          <span className='text-xl font-light '>{year}</span>
        </span>
      </div>

      <span className='text-2xl font-semibold'>{dayName}</span>
    </header>
  );
}
