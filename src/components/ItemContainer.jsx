import React from 'react'

const ItemContainer = () => {
  return (
     <div class=" grid p-[24px] justify-items-center gap-[24px] grid-cols-2 max-w-[75%] mx-auto w-full border-solid border-[8px] min-h-[300px] rounded-[12px] border-red-400">
        <div draggable="true" class="text-white  hover:cursor-move hover:border-red-400 rounded-[8px] hover:bg-blue-400/70 font-semibold min-h-[120px] text-center border-[4px] border-solid border-[#e5e7eb] max-w-[128px] bg-blue-400 w-full text-[36px]">
        <p class="mt-[25px]">3</p>
        </div>
        <div draggable="true" class="text-white  hover:cursor-move hover:border-red-400 rounded-[8px] hover:bg-blue-400/70 font-semibold min-h-[120px] text-center border-[4px] border-solid border-[#e5e7eb] max-w-[128px] bg-blue-400 w-full text-[36px]">
        <p class="mt-[25px]">2</p></div><div draggable="true" class="text-white  hover:cursor-move hover:border-red-400 rounded-[8px] hover:bg-blue-400/70 font-semibold min-h-[120px] text-center border-[4px] border-solid border-[#e5e7eb] max-w-[128px] bg-blue-400 w-full text-[36px]">
        <p class="mt-[25px]">4</p></div><div draggable="true" class="text-white  hover:cursor-move hover:border-red-400 rounded-[8px] hover:bg-blue-400/70 font-semibold min-h-[120px] text-center border-[4px] border-solid border-[#e5e7eb] max-w-[128px] bg-blue-400 w-full text-[36px]">
        <p class="mt-[25px]">1</p></div>
        </div>
  )
}

export default ItemContainer