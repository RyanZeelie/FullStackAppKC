import React from "react";
import ButtonLoading from "../loadingUi/ButtonLoading";

const ConfirmButton = ({
  action = () => {},
  disabled = false,
  label = "Cancel",
  loading = false,
}) => {
  return loading === false ? (
    <button
      className={`${
        disabled ? "bg-gray-400" : "bg-blue-400 hover:bg-blue-500"
      }  text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out`}
      onClick={action}
      disabled={disabled}
    >
      {label}
    </button>
  ) : (
    <ButtonLoading />
  );
};

export default ConfirmButton;
