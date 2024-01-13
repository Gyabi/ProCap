import { CustomModal } from "./component/custom-modal";
import React, { useState } from 'react';

interface EditProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export const Edit: React.FC<EditProps> = ({isOpen, onRequestClose}) => {

  return (
    <CustomModal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={false}
      onRequestClose={onRequestClose}
      widthPercentage={80}
      heightPercentage={80}
    >
      <div className="flex flex-col justify-center items-center">
        <h1>Edit</h1>
        <h1>Edit</h1>
        <h1>Edit</h1>
        <h1>Edit</h1>
        <h1>Edit</h1>
        <h1>Edit</h1>
        <h1>Edit</h1>
        <h1>Edit</h1>
      </div>
    </CustomModal>
  );
}