"use client";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RxDragHandleDots2 } from "react-icons/rx";

export enum handlePositionType {
    topRight = "topRight",
    middleRight = "middleRight",
}
interface SortableItemProps {
    id: string;
    children?: React.ReactNode;
    handlePosition?: handlePositionType;
}

export const SortableItem: React.FC<SortableItemProps> = ({ id, children, handlePosition }: SortableItemProps) => {
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
            {handlePosition === undefined && (
                <div className="absolute top-4 right-4">
                    <button {...listeners} {...attributes}>
                        <RxDragHandleDots2 size={24} />
                    </button>
                </div>
            )}
            {handlePosition === handlePositionType.topRight  && (
                <div className="absolute top-4 right-4">
                    <button {...listeners} {...attributes}>
                        <RxDragHandleDots2 size={24} />
                    </button>
                </div>
            )}
            {handlePosition === handlePositionType.middleRight && (
                <div className="absolute bottom-2 right-2">
                    <button {...listeners} {...attributes}>
                        <RxDragHandleDots2 size={24} />
                    </button>
                </div>
            )}
        </div>
    )
}