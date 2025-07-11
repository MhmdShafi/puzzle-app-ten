
import { useState } from 'react';

function App() {
  const [inputSize, setInputSize] = useState(2); // holds input field value
  const [puzzleSize, setPuzzleSize] = useState(2); // used to render puzzle
  const [puzzleData, setPuzzleData] = useState([]);
  const [dragIndex, setDragIndex] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleGenerate = (e) => {
    e.preventDefault();

    const size = parseInt(inputSize);
    if (isNaN(size) || size < 2 || size > 6) {
      alert('Enter a puzzle size between 2 and 6.');
      return;
    }

    setPuzzleSize(size); // update puzzle size only on click

    const totalBlocks = size * size;
    const numbers = Array.from({ length: totalBlocks }, (_, i) => i + 1);

    // Shuffle
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    setPuzzleData(numbers);
    setShowPopup(false);
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
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleClosePopup = () => {
    setPuzzleData([]);
    setPuzzleSize(2);
    setInputSize(2);
    setShowPopup(false);
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
                e.preventDefault(); // prevent number spinner
              }
            }}
          />
          <button
            type="submit"
            className="p-1 min-h-[48px] font-semibold max-w-[96px] w-full text-white bg-red-400 rounded-[8px]"
          >
            Create!
          </button>
        </form>
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

      {showPopup && (
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
      )}
    </div>
  );
}

export default App;

