

import React from 'react';

const ItemContainer = ({
  puzzleData,
  puzzleSize,
  handleDragOver,
  handleDragStart,
  handleDrop,
  sortOrder
}) => {
  if (puzzleData.length === 0) return null;

  let filteredData = [...puzzleData];

  if (sortOrder === 'even') {
    filteredData = puzzleData.filter((val) => val % 2 === 0);
  } else if (sortOrder === 'odd') {
    filteredData = puzzleData.filter((val) => val % 2 !== 0);
  } else if (sortOrder === 'ascending') {
    filteredData = [...puzzleData].sort((a, b) => a - b);
  } else if (sortOrder === 'descending') {
    filteredData = [...puzzleData].sort((a, b) => b - a);
  }else if(sortOrder==='default'){
    filteredData =[...filteredData];
  }

  const half = Math.ceil(filteredData.length / 2);
  const topHalf = filteredData.slice(0, half);
  const bottomHalf = filteredData.slice(half);

  return (
    <div className="flex flex-col items-center w-full gap-8">
      {['asc', 'desc'].includes(sortOrder) ? (
        <div className="flex justify-center w-full gap-8">
          {/* Top Half */}
          <div className="flex flex-col items-center -ml-[50px]">
            <h2 className="text-[24px] font-bold text-blue-600 mb-2">Even</h2>
            <div
              className="grid p-[24px] justify-items-center gap-[24px] border-solid border-[8px] rounded-[12px] w-[700px] border-red-400"
              style={{ gridTemplateColumns: `repeat(${puzzleSize}, 1fr)` }}
            >
              {topHalf.map((num, index) => (
                <div
                  key={`top-${index}`}
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

          {/* Bottom Half */}
          <div className="flex flex-col items-center">
            <h2 className="text-[24px] font-bold text-blue-600 mb-2">Odd</h2>
            <div
              className="grid p-[24px] justify-items-center gap-[24px] border-solid border-[8px] w-[700px] rounded-[12px] border-red-400"
              style={{ gridTemplateColumns: `repeat(${puzzleSize}, 1fr)` }}
            >
              {bottomHalf.map((num, index) => (
                <div
                  key={`bottom-${index}`}
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
      ) :  (
        <div
          className="grid p-[24px] justify-items-center gap-[24px] max-w-[75%] mx-auto w-full border-solid border-[8px] min-h-[300px] rounded-[12px] border-red-400"
          style={{ gridTemplateColumns: `repeat(${puzzleSize}, 1fr)` }}
        >
          {filteredData.map((num, index) => (
            <div
              key={index}
              draggable
               onDragOver={handleDragOver}
              onDragStart={() => handleDragStart(puzzleData.indexOf(num))}
              onDrop={() => handleDrop(puzzleData.indexOf(num))}

              className="text-white hover:cursor-move hover:border-red-400 rounded-[8px] hover:bg-blue-400/70 font-semibold min-h-[120px] text-center border-[4px] border-solid border-[#e5e7eb] max-w-[128px] bg-blue-400 w-full text-[36px]"
            >
              <p className="mt-[25px]">{num}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemContainer;
