import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable, AnimateLayoutChanges, defaultAnimateLayoutChanges } from "@dnd-kit/sortable";
import { Project } from "../../data/project";
import { CSS } from "@dnd-kit/utilities";
import { RxDragHandleDots2 } from "react-icons/rx";

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({...args, wasDragging: true});


interface DroppableContainerProps {
    id: string;
    children?: React.ReactNode;
    title: string;
    items: UniqueIdentifier[];
}

export const DroppableContainer: React.FC<DroppableContainerProps> = ({ id, children, title, items }: DroppableContainerProps) => {
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
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : undefined,
      }

    return (
        <div ref={setNodeRef} style={style} className="relative w-full p-2 mb-2 flex flex-col bg-white border border-2 border-gray-200 hover:border-purple-800  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl font-extrabold tracking-tight decoration-purple-700 underline text-gray-900 dark:text-white" style={{ wordWrap: 'break-word' }}>{title}</h5>
            {children}
            <div className="absolute top-4 right-4">
                <button {...listeners} {...attributes}>
                    <RxDragHandleDots2 size={24} />
                </button>
            </div>
        </div>
    );
}