import React, { useState } from 'react';

const Dropdown = ({ sortOrder, setSortOrder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value) => {
    setSortOrder(value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left ml-2 max-w-[140px] w-full">
      {/* Dropdown button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer p-1 min-h-[48px] font-semibold w-full text-white bg-blue-500 rounded-[8px]"
      >
        {sortOrder === 'asc'
          ? 'Ascending'
          : 'Descending'
         }
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute mt-2 w-full bg-gray-500 rounded-[8px] shadow-lg z-10">
          <ul className="text-sm text-white">
            {['asc', 'desc'].map((option) => (
              <li key={option}>
                <button
                  onClick={() => handleSelect(option)}
                  className="w-full text-left px-4 py-2 hover:bg-blue-600 font-semibold"
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
