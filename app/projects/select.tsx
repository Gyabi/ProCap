import { CustomModal } from "./component/custom-modal";
import React, { useState } from 'react';
import { Project } from "./data/project";

interface SelectProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedProject: Project|undefined;
}

export const Select: React.FC<SelectProps> = ({isOpen, onRequestClose, selectedProject}:SelectProps) => {

  return (
    <CustomModal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={true}
      onRequestClose={onRequestClose}
      widthPercentage={80}
      heightPercentage={80}
    >
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {selectedProject?.projectName}
        </h1>
      </div>
    </CustomModal>
  );
}