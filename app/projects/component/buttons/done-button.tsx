"use client";
import { MdDone } from "react-icons/md";

/**
 * 完了ボタンプロパティ
 */
interface DoneButtonProps {
    onClick: () => void;
}

export const DoneButton = ({onClick}: DoneButtonProps) => {
    return (
        <div className="flex justify-center items-center bg-green-500 dark:bg-green-700 rounded-md px-2 py-2 mr-2 h-10 w-10"
            onClick={onClick}>
            <div className="m-1">
                <MdDone /> 
            </div>
        </div>
    );
};