import { CustomModal } from "./component/custom-modal";
import React, { useState } from 'react';

interface SelectProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export const Select: React.FC<SelectProps> = ({isOpen, onRequestClose}) => {

  return (
    <CustomModal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={true}
      onRequestClose={onRequestClose}
      widthPercentage={80}
      heightPercentage={80}
    >
      <div className="flex flex-col justify-center items-center">
        <h1>select</h1>
        <h1>select</h1>
        <h1>select</h1>
        <h1>select</h1>
        <h1>select</h1>
        <h1>select</h1>
        <h1>select</h1>
        <h1>select</h1>
      </div>
    </CustomModal>
  );
}