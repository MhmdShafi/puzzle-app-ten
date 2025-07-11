import React, { useEffect, useState } from 'react';

const Timmer = ({ initialSecond, timeOut }) => {
  const [seconds, setSeconds] = useState(initialSecond);

  useEffect(() => {
    setSeconds(initialSecond);
  }, [initialSecond]);

 
  useEffect(() => {
    if (seconds <= 0) {
      timeOut(); 
      return;
    }

    const timerId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [seconds, timeOut]);

  return (
    <div className='translate-y-[-60px] ml-[30px] cursor-pointer p-1 min-h-[30px] font-semibold max-w-[190px] w-full text-black border border-red-400 rounded-[8px]'>
      <h1 className='mx-auto  bold text-[30px] text-red-400'>Count:{seconds}</h1>
    </div>
  );
};

export default Timmer;
