
import { useState } from 'react';
import Timmer from './components/Timmer';

function App() {
  const [inputSize, setInputSize] = useState(2); 
  const [puzzleSize, setPuzzleSize] = useState(2); 
  const [puzzleData, setPuzzleData] = useState([]);
  const [dragIndex, setDragIndex] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [timeoutPop, setTimeOutPop] = useState(false);
  const [hasTimedOut, setHasTimedOut] = useState(false); 
  const [timerSec, setTimerSec] = useState(4);

  const timOut = () => {
    if (!hasTimedOut) {
      setTimeOutPop(true);
      setHasTimedOut(true); 
    }
  };




  const handleGenerate = (e) => {
    e.preventDefault();
    const size = parseInt(inputSize);

    setPuzzleSize(size); 
    const totalBlocks = size * size;
    setTimerSec(totalBlocks);
    setHasTimedOut(false); 
    setTimeOutPop(false);
    setShowPopup(false);

    const numbers = Array.from({ length: totalBlocks }, (_, i) => i + 1);

    // Shuffle
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    setPuzzleData(numbers);
  };

  const isSolved = (arr) => arr.every((val, idx) => val === idx + 1);

  const handleDragStart = (index) => {
    setDragIndex(index);
  };

  const handleDrop = (dropIndex) => {
    if (dragIndex === null || dragIndex === dropIndex) return;

    const newData = [...puzzleData];
    [newData[dragIndex], newData[dropIndex]] = [newData[dropIndex], newData[dragIndex]];
    setPuzzleData(newData);
    setDragIndex(null);

    if (isSolved(newData)) {
      setShowPopup(true);
      setTimerSec(0);
    }
  };

  const handleDragOver = (e) => e.preventDefault();

    const handleClosePopup = () => {
  if (timeoutPop) {
    window.location.reload(); 
  } else {
   
    setPuzzleData([]);
    setPuzzleSize(2);
    setInputSize(2);
    setShowPopup(false);
    setTimeOutPop(false);
    setHasTimedOut(false);
    setTimerSec(0);
  }
};

  return (
    <div className="w-full relative p-7">
      <div className="w-full p-[12px]">
        <form className="flex items-center justify-center" onSubmit={handleGenerate}>
          <h1 className="text-red-400 font-bold text-[20px] mr-[8px]">ENTER PUZZLE SIZE :</h1>
          <input
            className="max-w-[320px] w-full border-[1px] mr-[6px] p-4 max-h-[48px] outline-none border-solid border-[#ef4444] rounded-[8px]"
            placeholder="Enter Puzzle Size"
            type="number"
            min="2"
            max="6"
            value={inputSize}
            onChange={(e) => setInputSize(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                e.preventDefault(); 
              }
            }}
          />
          <button
            type="submit"
            className="cursor-pointer p-1 min-h-[48px] font-semibold max-w-[96px] w-full text-white bg-red-400 rounded-[8px]"
          >
            Create!
          </button>
        </form>

        <Timmer key={timerSec} initialSecond={timerSec} timeOut={timOut} />
      </div>

      <br />

      {puzzleData.length > 0 && (
        <div
          className="grid p-[24px] justify-items-center gap-[24px] max-w-[75%] mx-auto w-full border-solid border-[8px] min-h-[300px] rounded-[12px] border-red-400"
          style={{ gridTemplateColumns: `repeat(${puzzleSize}, 1fr)` }}
        >
          {puzzleData.map((num, index) => (
            <div
              key={index}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
              className="text-white hover:cursor-move hover:border-red-400 rounded-[8px] hover:bg-blue-400/70 font-semibold min-h-[120px] text-center border-[4px] border-solid border-[#e5e7eb] max-w-[128px] bg-blue-400 w-full text-[36px]"
            >
              <p className="mt-[25px]">{num}</p>
            </div>
          ))}
        </div>
      )}

      {showPopup ? (
  <div className="fixed top-0 left-0 w-full h-full bg-transparent flex items-center justify-center z-50">
    <div className="m-auto mt-[200px] flex flex-col items-center w-fit bg-transparent p-8 rounded-[12px] shadow-xl">
      <h1 className="text-[60px] font-bold text-center">Welcome to the team!</h1>
      <button
        className="bg-[white] border mt-4 border-gray-400 max-w-[100px] rounded-[8px] py-[8px] w-full"
        onClick={handleClosePopup}
      >
        Close
      </button>
    </div>
  </div>
) : timeoutPop && (
  <div className="fixed top-0 left-0 w-full h-full bg-transparent flex items-center justify-center z-50">
    <div className="m-auto mt-[200px] flex flex-col items-center w-fit bg-transparent p-8 rounded-[12px] shadow-xl">
      <h1 className="text-[60px] font-bold text-red-400 text-center">Ah! Time Out</h1>
      <button
        className="bg-[white] border mt-4 border-gray-400 max-w-[100px] rounded-[8px] py-[8px] w-full"
        onClick={handleClosePopup}
      >
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
}

export default App;

