import React, { useState } from "react";
import ConfirmButton from "../buttons/ConfirmButton";
import CancelButton from "../buttons/CancelButton";

const FormModal = ({
  isOpen,
  onClose,
  children,
  modalTitle,
  disabled = true,
}) => {
  const [modalOpen, setModalOpen] = useState(true);

  const closeModal = () => {
    setModalOpen(false);
    onClose();
  };

  return (
    <>
      {modalOpen && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-[50%] my-6 mx-auto ">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/* Header */}
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl font-semibold">{modalTitle}</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={closeModal}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/* Body */}
              <div className="relative p-6 flex-auto">{children}</div>
              {/* Modal Footer */}
              <div className="flex items-center justify-start p-6 border-t border-solid border-blueGray-200 rounded-b">
                <div>
                  <ConfirmButton label="Submit" disabled={disabled} />
                </div>
                <div className="ml-2">
                  <CancelButton label="Cancel" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {modalOpen && (
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      )}
    </>
  );
};

export default FormModal;
