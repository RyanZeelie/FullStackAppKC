import React, { useState } from 'react';

const Tooltip = ({ children, text }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative flex items-center">
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </div>

      {showTooltip && (
        <div className="absolute bottom-full mb-2 px-4 py-2 bg-black text-white text-xs rounded-lg shadow-md">
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;