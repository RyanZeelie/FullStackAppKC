import React from "react";

const Select = ({
  label = "Define your label",
  children,
  name = "",
  Id = "",
  value = "",
  handleChange =()=>{},
  error=""
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={Id}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {label}
      </label>
      <select
        id={Id}
        name={name}
        value={value}
        className={`border ${error === "" ? "border-gray-300" : "border-red-300"} p-2 rounded-md focus:outline-none focus:ring-2 ${error === "" ? "focus:ring-blue-600" : "focus:ring-red-600"} focus:border-transparent w-full`}
        onChange={handleChange}
      >
        {children}
      </select>
      <div className="text-red-300">{error}</div>
    </div>
  );
};

export default Select;
