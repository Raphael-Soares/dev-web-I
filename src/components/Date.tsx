export default function Header() {
  const date = new Date();

  const [day, month, year] = date.toLocaleDateString().split('/');
  const [dayName] = date.toLocaleDateString('en-US', { weekday: 'long' }).split(' ');

  return (
    <header className=' flex justify-between'>
      <div className='flex flex-row'>
        <span className='text-6xl font-semibold'>{day}</span>
        <span className='flex flex-col'>
          <span className='text-xl '>{month}</span>
          <span className='text-xl font-light '>{year}</span>
        </span>
      </div>

      <span className='text-2xl font-semibold'>{dayName}</span>
    </header>
  );
}
