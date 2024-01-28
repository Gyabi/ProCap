"use client";
import { MdEdit } from "react-icons/md";

/**
 * 編集ボタンプロパティ
 */

interface EditButtonProps {
    onClick: () => void;
}

export const EditButton = ({onClick}: EditButtonProps) => {
    return (
        <div className="flex justify-center items-center bg-gray-200 dark:bg-gray-700 hover:bg-purple-500 rounded-full px-2 py-2 mr-2"
            onClick={onClick}>
            <MdEdit />
        </div>
    );
};