
import React from 'react';

const ItemContainer = ({
  puzzleData,
  puzzleSize,
  handleDragOver,
  handleDragStart,
  handleDrop,
}) => {
  if (puzzleData.length === 0) return null;

  const half = Math.ceil(puzzleData.length / 2);
  const evenData = puzzleData.slice(0, half);
  const oddData = puzzleData.slice(half);

  return (
    <div className="flex flex-col items-center w-full gap-8">
      <div className="flex justify-center w-full gap-8">
        {/* Even Grid */}
        <div className="flex flex-col items-center -ml-[50px]">
          <h2 className="text-[24px] font-bold text-blue-600 mb-2">Even</h2>
          <div
            className="grid p-[24px] justify-items-center gap-[24px] border-solid border-[8px] rounded-[12px] w-[700px] border-red-400"
            style={{ gridTemplateColumns: `repeat(${puzzleSize}, 1fr)` }}
          >
            {evenData.map((num, index) => (
              <div
                key={`even-${index}`}
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
        </div>

        {/* Odd Grid */}
        <div className="flex flex-col items-center">
          <h2 className="text-[24px] font-bold text-blue-600 mb-2">Odd</h2>
          <div
            className="grid p-[24px] justify-items-center gap-[24px] border-solid border-[8px] w-[700px] rounded-[12px] border-red-400"
            style={{ gridTemplateColumns: `repeat(${puzzleSize}, 1fr)` }}
          >
            {oddData.map((num, index) => (
              <div
                key={`odd-${index}`}
                draggable
                onDragStart={() => handleDragStart(index + half)} 
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(index + half)} 
                className="text-white hover:cursor-move hover:border-red-400 rounded-[8px] hover:bg-blue-400/70 font-semibold min-h-[120px] text-center border-[4px] border-solid border-[#e5e7eb] max-w-[128px] bg-blue-400 w-full text-[36px]"
              >
                <p className="mt-[25px]">{num}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemContainer;
