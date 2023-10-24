import React, { useState } from 'react';

const Accordion = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className=" rounded-lg overflow-hidden shadow-lg m-4 bg-white ">
      <div className="border-b p-4">
        <button
          onClick={toggleAccordion}
          className="w-full flex items-center justify-between focus:outline-none"
        >
          <h2 className="text-2xl font-bold">{title}</h2>
          <svg
            className={`w-6 h-6 transform transition-transform ${
              isExpanded ? 'rotate-180' : ''
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d="M7 10l5 5 5-5z"></path>
          </svg>
        </button>
      </div>
      <div
        className="overflow-hidden"
        style={{
          maxHeight: isExpanded ? '100%' : 0,
          transition: 'max-height',
        }}
      >
        <div className="px-6 py-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
