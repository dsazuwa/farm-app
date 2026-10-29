export default function Footer() {
  return (
    <div className='flex items-center gap-2 border-t px-10 py-5.5'>
      <span className='text-primary text-3xl select-none'>❧</span>©{' '}
      {new Date().getFullYear()} Farm Desk
    </div>
  );
}
