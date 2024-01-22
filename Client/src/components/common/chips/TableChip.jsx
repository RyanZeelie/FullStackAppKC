import { useEffect, useLayoutEffect } from "react";

const TableChip = ({ text, bgColor }) => {


  return (
    <div
      className={"p-2 inline-flex text-md leading-5 rounded-full" + bgColor + "text-white"}
    >
      {text}
    </div>
  );
};

export default TableChip
