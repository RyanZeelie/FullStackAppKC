import React from "react";

const CancelButton = ({
  action = () => {},
  disabled = false,
  label = "Confirm",
}) => {
  return (
    <button
      className={
        "bg-red-400 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
      }
      onClick={action}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default CancelButton;
