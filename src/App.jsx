

import { useState } from 'react';
import Timmer from './components/Timmer';
// import SortToggle from './components/SortToggle';
import ItemContainer from './components/ItemContainer';
import Dropdown from './components/Dropdown';

function App() {
  const [inputSize, setInputSize] = useState(2);
  const [puzzleSize, setPuzzleSize] = useState(2);
  const [puzzleData, setPuzzleData] = useState([]);
  const [dragIndex, setDragIndex] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [timeoutPop, setTimeOutPop] = useState(false);
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const [timerSec, setTimerSec] = useState(4);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc'); 

  const timOut = () => {
    if (!hasTimedOut) {
      setTimeOutPop(true);
      setHasTimedOut(true);
    }
  };

const handleGenerate = (e) => {
  e.preventDefault();
  const size = parseInt(inputSize);
  let totalBlocks;
  if(sortOrder==='even'|| sortOrder==='odd'){
     totalBlocks = (size * size);
  }else{
   totalBlocks = (size * size)*2;}

  setPuzzleSize(size);
  setTimerSec(totalBlocks * 2);
  setHasTimedOut(false);
  setTimeOutPop(false);
  setShowPopup(false);
  setIsGameStarted(true);

  let numbers;

  if (sortOrder === 'even') {
    numbers = Array.from({ length: totalBlocks }, (_, i) => 2 * (i + 1)); 
  } else if (sortOrder === 'odd') {
    numbers = Array.from({ length: totalBlocks }, (_, i) => 2 * i + 1);
  } else {
    numbers = Array.from({ length: totalBlocks }, (_, i) => i + 1); 
  }

  // Shuffle the numbers
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  setPuzzleData(numbers);
};



const isSorted = (arr, direction) => {
  if (direction === 'even') {
    return arr.every((val, i, a) =>
      val % 2 === 0 &&
      (i === 0 || a[i - 1] <= val)
    );
  }

  if (direction === 'odd') {
    return arr.every((val, i, a) =>
      val % 2 !== 0 &&
      (i === 0 || a[i - 1] <= val)
    );
  }

  if (direction === 'asc') {
    return arr.every((val, i, a) => i === 0 || a[i - 1] <= val);
  }

  if (direction === 'desc') {
    return arr.every((val, i, a) => i === 0 || a[i - 1] >= val);
  }

  return false;
};



const isSolved = (arr) => {
   if (sortOrder === 'even' || sortOrder === 'odd') {
    return isSorted(arr, sortOrder); 
  }

  const half = Math.ceil(arr.length / 2);
  const leftHalf = arr.slice(0, half);
  const rightHalf = arr.slice(half);

  // Split even and odd from each side
  const leftAllEven = leftHalf.every(val => val % 2 === 0);
  const rightAllOdd = rightHalf.every(val => val % 2 === 1);

  if (!leftAllEven || !rightAllOdd) return false;

  return isSorted(leftHalf, sortOrder) && isSorted(rightHalf, sortOrder);
};


  const handleDragStart = (index) => setDragIndex(index);

  const handleDrop = (dropIndex) => {
    if (dragIndex === null || dragIndex === dropIndex) return;

    const newData = [...puzzleData];
    [newData[dragIndex], newData[dropIndex]] = [
      newData[dropIndex],
      newData[dragIndex],
    ];
    setPuzzleData(newData);
    setDragIndex(null);

    if (isSolved(newData)) {
      setShowPopup(true);
      setTimerSec(0);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleClosePopup = () => {
    setPuzzleData([]);
    setPuzzleSize(2);
    setInputSize(2);
    setShowPopup(false);
    setTimeOutPop(false);
    setHasTimedOut(false);
    setTimerSec(0);
    setIsGameStarted(false);
  };

  return (
    <div className="w-full relative p-7">
      <div className="w-full p-[12px]">
        <form
          className="pl-[90px] flex items-center justify-center mx-auto"
          onSubmit={handleGenerate}
        >
          <h1 className="text-red-400 font-bold text-[20px] mr-[8px]">
            ENTER PUZZLE SIZE :
          </h1>
          <input
            className="max-w-[320px] w-full border-[1px] mr-[6px] p-4 max-h-[48px] outline-none border-solid border-[#ef4444] rounded-[8px]"
            placeholder="Enter Puzzle Size"
            type="number"
            min="2"
            max="6"
            value={inputSize}
            onChange={(e) => setInputSize(e.target.value)}
           
          />
          <button
            type="submit"
            className="cursor-pointer p-1 min-h-[48px] font-semibold max-w-[96px] w-full text-white bg-red-400 rounded-[8px]"
          >
            Create!
          </button>
          {/* <SortToggle sortOrder={sortOrder} setSortOrder={setSortOrder} /> */}
          <Dropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />
        </form>

        {isGameStarted && (
          <Timmer key={timerSec} initialSecond={timerSec} timeOut={timOut} />
        )}
      </div>

      <br />
<ItemContainer
 puzzleData={puzzleData}
 puzzleSize={puzzleSize}
 handleDragOver={handleDragOver}
 handleDragStart={handleDragStart}
 handleDrop={handleDrop}
 sortOrder={sortOrder}
/>
      {showPopup ? (
        <div className="mx-auto fixed top-0 left-0 w-full h-full bg-transparent flex items-center justify-center z-50">
          <div className="m-auto mt-[200px] flex flex-col items-center w-fit bg-transparent p-8 rounded-[12px] shadow-xl">
            <h1 className="text-[60px] font-bold text-center">
              Welcome to the team!
            </h1>
            <button
              className="cursor-pointer bg-white border mt-4 border-gray-400 max-w-[100px] rounded-[8px] py-[8px] w-full"
              onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        timeoutPop && (
          <div className="fixed top-0 left-0 w-full h-full bg-transparent flex items-center justify-center z-50">
            <div className="m-auto mt-[200px] flex flex-col items-center w-fit bg-transparent p-8 rounded-[12px] shadow-xl">
              <h1 className="text-[60px] font-bold text-center">Ah! Time Out</h1>
              <button
                className="cursor-pointer bg-white border mt-4 border-gray-400 max-w-[100px] rounded-[8px] py-[8px] w-full"
                onClick={handleClosePopup}
              >
                Close
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default App;
