import React from "react";

const Select = ({ lableFor = "", children, id = "" }) => {
  return (
    <>
      <label
        htmlFor={lableFor}
        class="block mb-2 text-sm font-medium text-gray-500 "
      >
        {lableFor}
      </label>
      <select
        id={id}
        class=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {children}
      </select>
    </>
  );
};

export default Select;
