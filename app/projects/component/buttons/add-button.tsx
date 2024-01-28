"use client";
import { IoMdAddCircle } from "react-icons/io";

/**
 * 追加ボタンプロパティ
 */

interface AddButtonProps {
    onClick: () => void;
}

export const AddButton = ({onClick}: AddButtonProps) => {
    return (
        <div className="flex justify-center items-center bg-gray-200 dark:bg-gray-700 hover:bg-purple-500 rounded-md px-2 py-2 mr-2"
            onClick={onClick}>
            <div className="m-1">
                <IoMdAddCircle />
            </div>
        </div>
    );
};