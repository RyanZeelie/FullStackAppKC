import React from "react";

function TableInput({
  name = "",
  id = "",
  label = "Define your label",
  placeholder = "",
  value = "",
  onChange = () => {},
  error = "",
  type = "text",
}) {
  return (
    <div>
      <input
        id={id}
        className={`border ${
          error === "" ? "border-gray-300" : "border-red-300"
        } p-2 rounded-md focus:outline-none focus:ring-2 ${
          error === "" ? "focus:ring-blue-600" : "focus:ring-red-600"
        } focus:border-transparent w-14`}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}

export default TableInput;
