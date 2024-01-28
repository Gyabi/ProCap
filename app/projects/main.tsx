"use client";
// Container配列を表示するメインコンポーネント
import { Project } from "./data/project";
import React, { use, useCallback, useEffect, useRef, useState } from 'react';
import CustomCard from "./component/card/custom-card";
import { MouseSensor, TouchSensor, CollisionDetection, DndContext, DragEndEvent, KeyboardSensor, MeasuringStrategy, PointerSensor, UniqueIdentifier, closestCenter, getFirstCollision, pointerWithin, rectIntersection, useSensor, useSensors, DragStartEvent, DragOverEvent } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { arrayMove } from "@dnd-kit/sortable";
import { SortableItem } from "./component/dnd/sortable-item";
import { DroppableContainer } from "./component/dnd/droppable-container";
import { updateProjectContainers } from "./logic/project_curd";

/**
 * プロジェクトメインコンポーネントのProps
 */
interface ProjectsMainProps {
    initProjectContainers: Record<string, Project[]>;
    setInitProjectContainers: React.Dispatch<React.SetStateAction<Record<string, Project[]>>>;
    openSelect: (containerId:string, projectId:string) => void;
    updateContainer: (containerId:string, name:string) => void;
    deleteContainer: (containerId:string) => void;
}

/**
 * メインコンポーネント
 * @param param0 
 * @returns 
 */
export const ProjectsMain: React.FC<ProjectsMainProps> = ({ initProjectContainers, setInitProjectContainers, openSelect, deleteContainer, updateContainer }:ProjectsMainProps) => {
    const [projectContainers, setProjectContainers] = useState<Record<string, Project[]>>(initProjectContainers);
    // コンテナのIDリスト
    const [containers, setContainers] = useState<UniqueIdentifier[]>(Object.keys(projectContainers));

    useEffect(() => {
        setProjectContainers(initProjectContainers);
        setContainers(Object.keys(initProjectContainers));
    }, [initProjectContainers]);
    
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const lastOverId = useRef<UniqueIdentifier | null>(null);
    const recentlyMovedToNewContainer = useRef(false);

    /**
     * マルチコンテナ用の衝突判定ロジック
     * 
     * ・ポインタと交差するドロップ可能なコンテナを探索
     * ・存在しない場合はアクティブなドラッグ可能なコンテナと交差するコンテナを検索
     * ・交差するコンテナが存在しない場合は最後に一致したコンテナを返す
     */
    const collisionDetectionStrategy: CollisionDetection = useCallback(
        (args) => {
          if (activeId && activeId in projectContainers) {
            return closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) => container.id in projectContainers
              ),
            });
          }
    
          // Start by finding any intersecting droppable
          const pointerIntersections = pointerWithin(args);
          const intersections =
            pointerIntersections.length > 0
              ? // If there are droppables intersecting with the pointer, return those
                pointerIntersections
              : rectIntersection(args);
          let overId = getFirstCollision(intersections, 'id');
    
          if (overId != null) {
            if (overId in projectContainers) {
              const containerItems = projectContainers[overId];
    
              // If a container is matched and it contains items (columns 'A', 'B', 'C')
              if (containerItems.length > 0) {
                // Return the closest droppable within that container
                overId = closestCenter({
                  ...args,
                  droppableContainers: args.droppableContainers.filter(
                    (container) =>
                      container.id !== overId &&
                      containerItems.some((item) => item.id === container.id)
                  ),
                })[0]?.id;
              }
            }
    
            lastOverId.current = overId;
    
            return [{id: overId}];
          }
    
          // When a draggable item moves to a new container, the layout may shift
          // and the `overId` may become `null`. We manually set the cached `lastOverId`
          // to the id of the draggable item that was moved to the new container, otherwise
          // the previous `overId` will be returned which can cause items to incorrectly shift positions
          if (recentlyMovedToNewContainer.current) {
            lastOverId.current = activeId;
          }
    
          // If no droppable is matched, return the last match
          return lastOverId.current ? [{id: lastOverId.current}] : [];
        },
        [activeId, projectContainers]
      );

    const [clonedItems, setClonedItems] = useState<Record<string, Project[]> | null>(null);
    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor)
    );
    const findContainer = (id: UniqueIdentifier) => {
        if (id in projectContainers) {
            return id;
        }

        return Object.keys(projectContainers).find((key) => projectContainers[key].some((item) => item.id === id));
    };

    const onDragCancel = () => {
        // データをクローンしているならコピーしてもとに戻す
        if (clonedItems) {
            setProjectContainers(clonedItems);
        }

        setActiveId(null);
        setClonedItems(null);
    }

    const onDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id);
        setClonedItems(projectContainers);
    }

    function getNextContainerId() {
        const containerIds = Object.keys(projectContainers);
        const lastContainerId = containerIds[containerIds.length - 1];

        return String.fromCharCode(lastContainerId.charCodeAt(0) + 1);
    }

    const onDragOver = (event: DragOverEvent) => {
        // ドラッグオーバーされた要素のIDとアクティブな要素のIDを取得します。
        const overId = event.over?.id;
        const activeId = event.active.id;

        // ドラッグオーバーされた要素が存在しない、またはアクティブな要素が既にitemsに存在する場合は何もしません。
        if(overId == null || activeId in projectContainers) {
            return;
        }

        // ドラッグオーバーされた要素とアクティブな要素のコンテナを探します。
        const overContainer = findContainer(overId);
        const activeContainer = findContainer(activeId);

        // どちらかのコンテナが存在しない場合は何もしません。
        if (!overContainer || !activeContainer) {
            return;
        }

        // ドラッグオーバーされた要素とアクティブな要素が異なるコンテナに存在する場合、アイテムの移動を行います。
        if (overContainer !== activeContainer) {
            setProjectContainers((items) => {
                // アクティブな要素とドラッグオーバーされた要素のリストを取得します。
                const activeItems = items[activeContainer];
                const overItems = items[overContainer];

                // アクティブな要素とドラッグオーバーされた要素のインデックスを取得します。
                const overIndex = overItems.findIndex((item) => item.id === overId);
                const activeIndex = activeItems.findIndex((item) => item.id === activeId);

                let newIndex: number;

                // ドラッグオーバーされた要素がitemsに存在する場合、新しいインデックスはoverItemsの長さ+1になります。
                // そうでない場合、新しいインデックスはoverIndexまたはoverItemsの長さ+1になります。
                if(overId in items) {
                    newIndex = overItems.length + 1;
                } else {
                    const idBelowOverItem = 
                        event.over &&
                        event.active.rect.current.translated &&
                        event.active.rect.current.translated.top >
                            event.over.rect.top + event.over.rect.height;
                    
                    const modifier = idBelowOverItem ? 1 : 0;

                    newIndex =
                    overIndex >= 0 ? overIndex + modifier : overItems.length + 1;    
                }

                // 最近新しいコンテナに移動したことを記録します。
                recentlyMovedToNewContainer.current = true;

                // アクティブな要素を新しいコンテナに移動し、古いコンテナからは削除します。
                return {
                    ...items,
                    [activeContainer]: items[activeContainer].filter((item) => item.id !== activeId),
                    [overContainer]: [
                        ...items[overContainer].slice(0, newIndex),
                        items[activeContainer][activeIndex],
                        ...items[overContainer].slice(newIndex, items[overContainer].length)
                    ],
                }
            });
        }
    }

    const onDragEnd = (event: DragEndEvent) => {
        // イベントからアクティブな要素とオーバー要素を取得します
        const active = event.active;
        const over = event.over;

        let newContainers: UniqueIdentifier[] = containers;

        // アクティブな要素がitemsに存在し、オーバー要素が存在する場合
        if (active.id in projectContainers && over?.id) {
            // コンテナの順序を更新します
            setContainers((containers) => {
              // アクティブな要素とオーバー要素のインデックスを取得します
              const activeIndex = containers.indexOf(active.id);
              const overIndex = containers.indexOf(over.id);

              // アクティブな要素とオーバー要素の位置を入れ替えた新しい配列を作成します
              newContainers = arrayMove(containers, activeIndex, overIndex);
  
              // アクティブな要素とオーバー要素の位置を入れ替えます
              return newContainers;
            });
        }

        // アクティブな要素のコンテナを探します
        const activeContainer = findContainer(active.id);

        // アクティブな要素のコンテナが存在しない場合、アクティブなIDをnullに設定します
        if(!activeContainer) {
            setActiveId(null);
            return;
        }

        // オーバー要素のIDを取得します
        const overId = over?.id;

        // オーバー要素のIDがnullの場合、アクティブなIDをnullに設定します
        if(overId == null) {
            setActiveId(null);
            return;
        }

        // オーバー要素のコンテナを探します
        const overContainer = findContainer(overId);
        let newProjectContainers = projectContainers;
        if (overContainer) {
            // アクティブな要素とオーバー要素のインデックスを取得します
            const activeIndex = projectContainers[overContainer].findIndex((item) => item.id === active.id);
            const overIndex = projectContainers[overContainer].findIndex((item) => item.id === overId);
  
            // アクティブな要素とオーバー要素の位置が異なる場合、その位置を入れ替えます
            if (activeIndex !== overIndex) {
                // アクティブな要素とオーバー要素の位置を入れ替えた新しい配列を設定します
                newProjectContainers = {
                    ...projectContainers,
                    [overContainer]: arrayMove(
                    projectContainers[overContainer],
                    activeIndex,
                    overIndex
                    ),
                }
                setProjectContainers(newProjectContainers);
            }
        }

        // 親が管理しているデータ構造の大本を更新(今回の並べ替えが適応された最新版containersの順番で再格納する)
        // ※本関数ではコンテナの表示順を管理しているContainer配列と辞書型のデータ自体を管理しているprojectContainersの両方を更新している
        // よってその両方の情報を統合して最新版の辞書データ構造を生成し、親コンポーネントが管理している本データを更新する（UseEffect設定により即時本コンポーネントへも伝達される）
        const tmpProjectContainers: Record<string, Project[]> = {};
        newContainers.forEach((containerId) => {
            tmpProjectContainers[containerId] = newProjectContainers[containerId];
        });
        setInitProjectContainers(tmpProjectContainers);

        // 現在のデータ構造を永続化
        updateProjectContainers(tmpProjectContainers);

        // ドラッグ終了後、アクティブなIDをnullに設定します
        setActiveId(null);
    }

    useEffect(() => {
        requestAnimationFrame(() => {
            recentlyMovedToNewContainer.current = false;
        });
    }, [projectContainers]);

    return (
        <div className="w-full h-full flex flex-col items-center justify-start">
            {/* DnD Kit */}
            <DndContext
                sensors={sensors}
                collisionDetection={collisionDetectionStrategy}
                measuring={{
                    droppable: {
                        strategy: MeasuringStrategy.Always
                    }
                }}

                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDragEnd={onDragEnd}
                onDragCancel={onDragCancel}
            >
                {/* 1列のグリッドを定義 */}
                <div className="grid grid-cols-1 w-full h-full">
                    <SortableContext items={containers} strategy={rectSortingStrategy}>
                    {/* コンテナ表示 */}
                    {containers.map((containerId) => (
                        <div className="m-2" key={containerId}>
                            <DroppableContainer
                                id={containerId.toString()}
                                title={containerId.toString()}
                                items={projectContainers[containerId]}
                                updateContainer={updateContainer}
                                deleteContainer={deleteContainer}
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full h-full">
                                    <SortableContext items={projectContainers[containerId]} strategy={rectSortingStrategy}>
                                        {projectContainers[containerId].map((project, index) => {
                                            return (
                                                <SortableItem id={project.id} key={project.id} >
                                                    <div className="mx-5">
                                                        {/* カードコンポーネント */}
                                                        <CustomCard
                                                            id={project.id}
                                                            containerId={containerId.toString()}
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
                    ))}
                    </SortableContext>
                </div>
            </DndContext>
        </div>
    )



}