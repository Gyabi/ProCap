"use client";
import { useSortable, AnimateLayoutChanges, defaultAnimateLayoutChanges } from "@dnd-kit/sortable";
import { Project } from "../../data/project";
import { CSS } from "@dnd-kit/utilities";
import { RxDragHandleDots2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import { CancelButton } from "../buttons/cancel-button";
import { EditButton } from "../buttons/edit-button";
import { ask } from "@tauri-apps/api/dialog";

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({...args, wasDragging: true});


interface DroppableContainerProps {
    id: string;
    children?: React.ReactNode;
    title: string;
    items: Project[];
    updateContainer: (containerId:string, name:string) => void;
    deleteContainer: (containerId:string) => void;
}

export const DroppableContainer: React.FC<DroppableContainerProps> = ({ id, children, title, items, updateContainer, deleteContainer }: DroppableContainerProps) => {
  const {
    active,
    attributes,
    isDragging,
    listeners,
    over,
    setNodeRef,
    transition,
    transform,
  } = useSortable({
    id,
    data: {
      type: 'container',
      children: items,
    },
    animateLayoutChanges,
  });
  const style={
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : undefined,
  }

  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState(title);

  return (
    <div ref={setNodeRef} style={style} className="relative w-full p-2 mb-2 flex flex-col bg-white border border-2 border-gray-200 hover:border-purple-800  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-between w-full">
          <div className="flex justify-start w-full">
            {!isEditing ?
            <h5 className="mb-2 text-2xl font-bold tracking-tight decoration-amber-700 underline text-gray-900 dark:text-white" style={{ wordWrap: 'break-word' }}>{title}</h5>
            :
            <input type="text" className="mb-2 text-2xl font-bold tracking-tight decoration-amber-700 underline text-gray-900 dark:text-white bg-amber-200" style={{ wordWrap: 'break-word' }} value={editingText}
            onChange={(e)=> setEditingText(e.target.value)}
            />
            }
            <div className="mx-2">
              <EditButton onClick={()=> setIsEditing((state)=>{
                if(state && editingText !== title){
                  // コンテナ名の更新
                  updateContainer(title, editingText);
                }
                return !state;
              })} />
            </div>
          </div>
          {isEditing &&
          <div className="mr-10">
            <CancelButton onClick={async ()=>{
              await ask("本当に削除しますか？",{
                title: "",
                type: "warning",
                okLabel: "OK",
                cancelLabel: "Cancel",
              }).then(async (result) => {
                if(result){
                  setIsEditing(false);
                  // データの削除と保存を実行
                  deleteContainer(title);
                };
              });
            }}
            />
          </div>
          }
        </div>
        {children}
        <div className="absolute top-4 right-4">
            <button {...listeners} {...attributes}>
                <RxDragHandleDots2 size={24} />
            </button>
        </div>
    </div>
  );
}