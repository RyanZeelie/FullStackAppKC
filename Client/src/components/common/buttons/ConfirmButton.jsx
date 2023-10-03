import React from "react";

const ConfirmButton = ({
  action = () => {},
  disabled = false,
  label = "Confirm",
}) => {
  return (
    <button
      className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
      onClick={action}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default ConfirmButton;
