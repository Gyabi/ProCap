"use client";

import { Project } from "./data/project";
import React, { useState, useCallback } from 'react';
import {
    DndContext,
    closestCenter,
    MouseSensor,
    TouchSensor,
    DragOverlay,
    useSensor,
    useSensors,
    DragStartEvent,
    DragEndEvent,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import CustomCard from "./component/custom-card";
import { SortableItem} from "./component/sortable-item";

interface ItemContainerProps {
    projects: Project[];
    setProjects: (projects: Project[]) => void;
}

export const ItemContainer: React.FC<ItemContainerProps> = ({projects, setProjects}:ItemContainerProps) => {
    // https://codesandbox.io/p/sandbox/dnd-kit-yarn-1-eelbb?file=%2Fsrc%2FApp.tsx%3A64%2C3
    const [activeId, setActiveId] = useState<string | null>(null);
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    const handleDragStart = useCallback((event: DragStartEvent) => {
        setActiveId(event.active.id.toString());
    }, []);

    // ドラッグを離したときの処理
    const handleDragEnd = useCallback((event: DragEndEvent) => {
        console.log("handleDragEnd");
        const { active, over } = event;
        
        if (active.id !== over?.id) {
            let oldProject = projects.find((project) => project.id === active.id);
            let newProject = projects.find((project) => project.id === over?.id);
            
            // oldとnewがundefined出ない場合は入れ替え
            if (oldProject && newProject) {
                const oldIndex = projects.indexOf(oldProject);
                const newIndex = projects.indexOf(newProject);
                
                // 配列を新規indexに合わせて入れ替え
                const newProjects = projects;
                newProjects.splice(oldIndex, 1);
                newProjects.splice(newIndex, 0, oldProject);
                
                console.log(newProjects);

                // stateを更新
                setProjects(newProjects);
                // TODO: DBにも反映
            }
        }
        setActiveId(null);
    }, []);
    
    const handleDragCancel = useCallback(() => {
        setActiveId(null);
    }, []);

    return (
        <div>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragCancel={handleDragCancel}
            >
                <SortableContext items={projects} strategy={rectSortingStrategy}>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${4}, 1fr)`,
                            gridGap: 10,
                            margin: '100px auto',
                        }}
                    >
                        {projects.map((project) => (
                            <SortableItem key={project.id} id={project.id} />
                        ))}
                    </div>
                </SortableContext>
                <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
                    {activeId ? <CustomCard id={activeId} isDragging /> : null}
                </DragOverlay>
            </DndContext>

        </div>

    );
};