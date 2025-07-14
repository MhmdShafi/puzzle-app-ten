import React from 'react'

const SortToggle = ({sortOrder,setSortOrder}) => {
  return (
    
    <button
      type="button"
      onClick={() =>
        setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'))
      }
      className="cursor-pointer ml-2 p-1 min-h-[48px] font-semibold max-w-[140px] w-full text-white bg-blue-500 rounded-[8px]"
    >
      {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
    </button>

  )
}

export default SortToggle