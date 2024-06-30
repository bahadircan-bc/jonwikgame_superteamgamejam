const GameLoading = () => {
  return (
    <div className='h-72 w-full mx-auto flex flex-col items-center justify-center gap-6'>
      <div className='flex h-8 w-8 absolute text-center mb-24'>
        <span className='animate-ping absolute h-8 w-8 rounded-full bg-red-300 opacity-75'></span>
        <span className='relative rounded-full h-8 w-8  bg-red-500'></span>
      </div>
      <h2 className='text-xl tracking-wide pl-2'>Game Loading</h2>
    </div>
  );
};

export default GameLoading;
