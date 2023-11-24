import React from "react";
import { v4 as uuidv4 } from "uuid";
import ConfirmButton from "../common/buttons/ConfirmButton";
import DataGridSpinner from "../common/loadingUi/DataGridSpinner";

const DataGrid = ({ columns = [], data = [], action=()=>{}, actionLabel="Create", loading = false, actions = [] }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
      {/* Header Tools */}
      <div className="flex justify-between items-center px-4">
        {actions.map(action=>{
          return <ConfirmButton label={action.actionLabel} action={action.actionFunc}/>
        })}
       
        <div className="pb-4 p-2 bg-white">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="block p-2 pl-10 text-sm text-black-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for items"
            />
          </div>
        </div>
      </div>

      {/* table */}
      {loading ? <DataGridSpinner/> :  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-400 ">
          <tr className="w-auto">
            {columns.map((column) => {
              return (
                <th key={uuidv4()} scope="col" className="px-6 py-3">
                  {column.header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          { !data.length ? <tr><td className="text-center bg-white border-b border-gray-200 hover:bg-gray-400 hover:text-black hover:bg-gray-300">No Data</td></tr> : data.map((rowItem, index) => {
            return (
              <tr
                className="bg-white border-b border-gray-200 hover:bg-blue-200 hover:text-black hover:bg-gray-300"
                key={uuidv4()}
              >
                {columns.map((column) => {
                  if (column?.renderCell) {
                    return (
                      <td key={uuidv4()} className={"px-6 py-4 w-auto"}>{column?.renderCell(rowItem)}</td>
                    );
                  } else {
                    return (
                      <td
                        key={uuidv4()}
                        className={`px-6 py-4 w-auto text-gray-900`}
                      >
                        {rowItem[column.dataIdentifier]}
                      </td>
                    );
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>}
     
      <div className="text-gray-500 w-full flex flex-row gap-10 justify-end p-4">
        <p> Total Rows : {data?.length}</p>
      </div>
    </div>
  );
};

export default DataGrid;
