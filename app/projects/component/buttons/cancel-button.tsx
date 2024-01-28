"use client";
import { MdCancel } from "react-icons/md";

/**
 * キャンセルボタンプロパティ
 */
interface CancelButtonProps {
    onClick: () => void;
}

export const CancelButton = ({onClick}: CancelButtonProps) => {
    return (
        <div className="flex justify-center items-center bg-red-500 dark:bg-red-700 rounded-md px-2 py-2 mr-2 h-10 w-10"
            onClick={onClick}>
            <div className="m-1">
                <MdCancel /> 
            </div>
        </div>
    );
};