import { CustomModal } from "./component/custom-modal";
import React, { useState } from 'react';

interface AddProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export const Add: React.FC<AddProps> = ({isOpen, onRequestClose}) => {

  return (
    <CustomModal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={false}
      onRequestClose={onRequestClose}
      widthPercentage={80}
      heightPercentage={80}
    >
      <div className="flex flex-col justify-center items-center">
        <h1>Add</h1>
        <button
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 m-2 rounded"
            onClick={() => {
                onRequestClose();
            }}    
        >
            Close
        </button>
      </div>
    </CustomModal>
  );
}