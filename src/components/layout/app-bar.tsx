import Brand from '../brand';

export default function AppBar() {
  return (
    <header className='flex flex-row items-center justify-between gap-4 border-b px-[5%] py-5.5'>
      <Brand />
    </header>
  );
}
