import ReactModal from "react-modal"
import React from 'react';

interface CustomModalProps {
    isOpen: boolean;
    shouldCloseOnOverlayClick: boolean;
    onRequestClose: () => void;
    children: React.ReactNode;
    widthPercentage?: number; // Add width percentage property
    heightPercentage?: number; // Add height percentage property
}

export const CustomModal: React.FC<CustomModalProps> = ({ isOpen, shouldCloseOnOverlayClick, onRequestClose, children, widthPercentage = 50, heightPercentage = 50 }) => {
    return (
      <ReactModal
        isOpen={isOpen}
        shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
        onRequestClose={onRequestClose}
        ariaHideApp={true}
        
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: `${widthPercentage}%`, // Apply width percentage
            height: `${heightPercentage}%`, // Apply height percentage
          },
        }}
      >
        {children}
      </ReactModal>
    );
  };