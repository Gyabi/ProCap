"use client";
// Container配列を表示するメインコンポーネント
import { ProjectContainer, Project } from "./data/project";
import React, { useState } from 'react';
import CustomCard from "./component/card/custom-card";
import { DndContext, DragEndEvent, KeyboardSensor, MeasuringStrategy, PointerSensor, UniqueIdentifier, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { arrayMove } from "@dnd-kit/sortable";
import { SortableItem, handlePositionType } from "./component/dnd/sortable-item";
import { DroppableContainer } from "./component/dnd/droppable-container";

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

    const [sampleData, setSampleData] = useState<Record<UniqueIdentifier, Project[]>>({
        "container1":[
            {
                id: "project1",
                projectName: "プロジェクト1",
                description: "プロジェクト1の説明",
                mainPath:{
                    id: "mainPath1",
                    path: "C:\\Users\\user\\Documents\\project1",
                    title: "メインパス1",
                    description: "メインパス1の説明"
                },
                explorerPaths:[],
                gitUrls:[],
                otherUrls:[]
            },
            {
                id: "project2",
                projectName: "プロジェクト2",
                description: "プロジェクト2の説明",
                mainPath:{
                    id: "mainPath2",
                    path: "C:\\Users\\user\\Documents\\project2",
                    title: "メインパス2",
                    description: "メインパス2の説明"
                },
                explorerPaths:[],
                gitUrls:[],
                otherUrls:[]
            },
            {
                id: "project3",
                projectName: "プロジェクト3",
                description: "プロジェクト3の説明",
                mainPath:{
                    id: "mainPath3",
                    path: "C:\\Users\\user\\Documents\\project3",
                    title: "メインパス3",
                    description: "メインパス3の説明"
                },
                explorerPaths:[],
                gitUrls:[],
                otherUrls:[]
            }
        ],
        "container2":[
            {
                id: "project4",
                projectName: "プロジェクト4",
                description: "プロジェクト4の説明",
                mainPath:{
                    id: "mainPath4",
                    path: "C:\\Users\\user\\Documents\\project4",
                    title: "メインパス4",
                    description: "メインパス4の説明"
                },
                explorerPaths:[],
                gitUrls:[],
                otherUrls:[]
            },
            {
                id: "project5",
                projectName: "プロジェクト5",
                description: "プロジェクト5の説明",
                mainPath:{
                    id: "mainPath5",
                    path: "C:\\Users\\user\\Documents\\project5",
                    title: "メインパス5",
                    description: "メインパス5の説明"
                },
                explorerPaths:[],
                gitUrls:[],
                otherUrls:[]
            },
            {
                id: "project6",
                projectName: "プロジェクト6",
                description: "プロジェクト6の説明",
                mainPath:{
                    id: "mainPath6",
                    path: "C:\\Users\\user\\Documents\\project6",
                    title: "メインパス6",
                    description: "メインパス6の説明"
                },
                explorerPaths:[],
                gitUrls:[],
                otherUrls:[]
            }
        ]
    });

    const [containers, setContainers] = useState<UniqueIdentifier[]>(Object.keys(sampleData));

    return (
        <div className="w-full h-full flex flex-col items-center justify-start">
            {/* DnD Kit */}
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                measuring={{
                    droppable: {
                        strategy: MeasuringStrategy.Always
                    }
                }}
                onDragCancel={() => {
                    console.log("onDragCancel");
                }
                }
            >
                {/* 1列のグリッドを定義 */}
                <div className="grid grid-cols-1 w-full h-full">
                    <SortableContext items={Object.keys(sampleData)} strategy={rectSortingStrategy}>
                    {/* コンテナ表示 */}
                    {Object.keys(sampleData).map((containerKey, index) => {
                        return (
                            <div className="mx-2" key={containerKey}>
                                <DroppableContainer id={index.toString()} title={containerKey} items={sampleData[containerKey]}>
                                    {/* プロジェクトもドラッグ可能にして表示する */}
                                    {/* 4列のグリッドを定義 */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full h-full">
                                        <SortableContext items={sampleData[containerKey]} strategy={rectSortingStrategy}>
                                            {sampleData[containerKey].map((project) => {
                                                return (
                                                    <SortableItem key={project.id} id={project.id} >
                                                        <div className="mx-5">
                                                            {/* カードコンポーネント */}
                                                            <CustomCard
                                                                id={project.id}
                                                                containerId={containerKey}
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
                                </DroppableContainer>
                            </div>
                        )
                    })}
                </SortableContext>
                </div>
            
            
            </DndContext>
        </div>
    )



}