import React, { useState } from "react";

const Checkbox = ({checked, name,id, onChange, label, ...rest }) => {


  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        checked={checked}
        name={name}
        onChange={onChange}
        {...rest}
      />
      <label className="ml-2 block text-gray-700" htmlFor={rest.id}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;