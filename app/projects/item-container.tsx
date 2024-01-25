"use client";

import { Project } from "./data/project";
import React, { useState } from 'react';
import CustomCard from "./component/custom-card";
import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { arrayMove } from "@dnd-kit/sortable";
import { SortableItem } from "./component/sortable-item";
import { DragOverlay } from "@dnd-kit/core";

import { updateProjects } from "./logic/project_curd";

/**
 * カードコンテナのProps
 */
interface ItemContainerProps {
    projects: Project[];
    setProjects: (projects: Project[]) => void;
    showProject: (id: string) => void;
}

/**
 * D&D対応のカードコンテナ
 * @param param0 
 * @returns 
 */
export const ItemContainer: React.FC<ItemContainerProps> = ({projects, setProjects, showProject}:ItemContainerProps) => {
    // 現在選択しているカード
    const [activeId, setActiveId] = useState<string | null>(null);
    // カードのドラッグ判定用
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates
        })
    );

    const handleDragStart = (event:any) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = async (event:any) => {
        setActiveId(null);
        const { active, over } = event;
    
        if (active.id !== over.id) {
            const oldIndex = projects.findIndex((p) => p.id === active.id);
            const newIndex = projects.findIndex((p) => p.id === over.id);
            
            // 配列の更新
            const newProjects = arrayMove(projects, oldIndex, newIndex);
            setProjects(newProjects);

            // ファイルに保存
            await updateProjects(newProjects);
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-start">
            {/* D&D Kit */}
            <DndContext
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                collisionDetection={closestCenter}
            >
                {/* 4列のグリッドを定義 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full h-full">
                    <SortableContext items={projects} strategy={rectSortingStrategy}>
                        {projects.map((project) => {
                            return (
                                // D&D対応させるためのコンポーネント
                                <SortableItem id={project.id} key={project.id} >
                                    <div className="mx-5">
                                        {/* カードコンポーネント */}
                                        <CustomCard
                                            id={project.id}
                                            projectName={project.projectName}
                                            description={project.description}
                                            showProject={showProject}
                                        />  
                                    </div>
                                </SortableItem>
                            );
                        })}

                        {/* ドラッグ中のカスタムUI */}
                        {/* <DragOverlay>
                            {activeId ? (
                                <div
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    backgroundColor: "red"
                                }}
                                ></div>
                                ) : null}
                        </DragOverlay> */}
                    </SortableContext>
                </div>
            </DndContext>
        </div>
    );
};