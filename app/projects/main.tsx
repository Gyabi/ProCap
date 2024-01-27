"use client";
// Container配列を表示するメインコンポーネント
import { ProjectContainer, Project } from "./data/project";
import React, { useState } from 'react';
import CustomCard from "./component/card/custom-card";
import { DndContext, DragEndEvent, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { arrayMove } from "@dnd-kit/sortable";
import { SortableItem, handlePositionType } from "./component/dnd/sortable-item";


interface ProjectsMainProps {
    projectContainers: ProjectContainer[];
    setProjectContainers: (projectContainers: ProjectContainer[]) => void;
    openSelect: (containerId:string, projectId:string) => void;
}

/**
 * メインコンポーネント
 * @param param0 
 * @returns 
 */
export const ProjectsMain: React.FC<ProjectsMainProps> = ({ projectContainers, setProjectContainers, openSelect }:ProjectsMainProps) => {
    // 要素のドラッグ判定用
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates
        })
    );

    const handleDragEnd = async (event:DragEndEvent) => {
        console.log(event.active);
        console.log(event.over);
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-start">
            {/* DnD Kit */}
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                {/* 1列のグリッドを定義 */}
                <div className="grid grid-cols-1 w-full h-full">
                    <SortableContext items={projectContainers} strategy={rectSortingStrategy}>
                        {/* コンテナ表示 */}
                        {projectContainers.map((container) => {
                            return (
                                <div className="mx-2" key={container.id}>
                                    <SortableItem id={container.id} handlePosition={handlePositionType.middleRight}>
                                        <div className="w-full p-2 mb-2 flex flex-col bg-white border border-2 border-gray-200 hover:border-purple-800  rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
                                            <h5 className="mb-2 text-2xl font-extrabold tracking-tight decoration-purple-700 underline text-gray-900 dark:text-white" style={{ wordWrap: 'break-word' }}>{container.containerName}</h5>

                                            {/* プロジェクトもドラッグ可能にして表示する */}
                                            {/* 4列のグリッドを定義 */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full h-full">
                                                <SortableContext items={container.projects} strategy={rectSortingStrategy}>
                                                    {container.projects.map((project) => {
                                                        return (
                                                            <SortableItem key={project.id} id={project.id} >
                                                                <div className="mx-5">
                                                                    {/* カードコンポーネント */}
                                                                    <CustomCard
                                                                        id={project.id}
                                                                        containerId={container.id}
                                                                        projectName={project.projectName}
                                                                        description={project.description}
                                                                        openSelect={openSelect}
                                                                    />  
                                                                </div>
                                                            </SortableItem>
                                                        );
                                                    })}
                                                </SortableContext>
                                            </div>
                                        </div>
                                    </SortableItem>
                                </div>
                            )
                        })}
                    </SortableContext>
                </div>
            
            
            </DndContext>
        </div>
    )

}