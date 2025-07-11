import React from 'react'

const itemContainer = ({puzzleData,ha}) => {
  return (
    <>
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
      </>
  )
}

export default itemContainer