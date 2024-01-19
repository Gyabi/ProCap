"use client";

// 一定時間で消えるメッセージモーダル
import ReactModal from "react-modal"
import React from 'react';
interface TimerModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    timer: number;
    message: string;
}

export const TimerModal: React.FC<TimerModalProps> = ({ isOpen, onRequestClose, timer, message }:TimerModalProps) => {
    // isopenがtrueになったら、タイマーをカウントダウンして、タイマーが0になったら、モーダルを閉じる
    React.useEffect(() => {
        if (isOpen) {
            const timerId = setTimeout(() => {
                onRequestClose();
            }, timer * 1000);
            return () => clearTimeout(timerId);
        }
    }, [isOpen]);

    return (
        <ReactModal
            isOpen={isOpen}
            shouldCloseOnOverlayClick={true}
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
                    width: '40%',
                    height: '10%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    border: 'none',
                },
            }}
        >
            <div className="flex flex-col justify-center items-center h-full w-full">
                <div className="text-center items-center py-4 lg:px-4 w-fit">
                    <div className="p-2 bg-indigo-800 items-center text-center text-indigo-100 leading-none rounded-full flex" role="alert">
                        <span className="font-semibold mr-2 flex-auto">{message}</span>
                    </div>
                </div>
            </div>
        </ReactModal>
    );

}