import React, { useState } from "react";
import DataGridSpinner from "../loadingUi/DataGridSpinner";

const NotificationDialogue = ({ isOpen = true, onClose, children, loading, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className=" bg-white p-5 rounded-lg shadow-lg w-1/3">
        <div className="flex flex-col items-center">
     
          
          <h2 className="text-center text-gray-800 text-xl font-bold">
            {message}
            
          </h2>
          <DataGridSpinner/>
        </div>
      </div>
    </div>
  );
};

export default NotificationDialogue;
