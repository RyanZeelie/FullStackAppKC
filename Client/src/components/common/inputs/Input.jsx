import React from "react";

function Input({
  name = "",
  id = "",
  label = "Define your label",
  placeholder = "",
  value = "",
  onChange = () => {},
  error = "",
  type="text"
}) {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {label}
      </label>
      <input
        id={id}
        className={`border ${
          error === "" ? "border-gray-300" : "border-red-300"
        } p-2 rounded-md focus:outline-none focus:ring-2 ${
          error === "" ? "focus:ring-blue-600" : "focus:ring-red-600"
        } focus:border-transparent w-full`}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />

      <div className="text-red-300">{error}</div>
    </div>
  );
}

export default Input;
