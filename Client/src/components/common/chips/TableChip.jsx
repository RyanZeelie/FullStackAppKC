const TableChip = ({ text, bgColor }) => {
  return (
    <div
      className={`p-2 inline-flex text-md leading-5 rounded-full bg-${bgColor}-300 text-white`}
    >
      {text}
    </div>
  );
};

export default TableChip
