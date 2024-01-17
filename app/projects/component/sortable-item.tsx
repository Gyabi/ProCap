import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RxDragHandleDots2 } from "react-icons/rx";

interface SortableItemProps {
    id: string;
    children?: React.ReactNode;
}

export const SortableItem: React.FC<SortableItemProps> = ({ id, children }: SortableItemProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
      } = useSortable({id: id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? "100" : "auto",
        opacity: isDragging ? 0.3 : 1
    };

    return (
        <div ref={setNodeRef} style={style} className="relative">
            {children}
            <div className="absolute top-4 right-4">
                <button {...listeners} {...attributes}>
                    <RxDragHandleDots2 size={24} />
                </button>
            </div>
        </div>
    )
}