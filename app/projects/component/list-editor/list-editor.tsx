"use client";
import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { arrayMove } from "@dnd-kit/sortable";
import { SortableItem, handlePositionType } from "../sortable-item";

import { SingleRowInput } from "../inputs/single-row-input";
import { MultiRowInput } from "../inputs/multi-row-input";
import { CancelButton } from "../buttons/cancel-button";
import { AddButton } from "../buttons/add-button";

import { generateUuid } from "../../logic/uuid";


export type ListData = {
    id: string;
    title: string;
    value: string;
    discription: string;
}

interface ListEditorProps {
    mainTitle: string;
    subTitle1: string;
    placeholder1: string;
    subTitle2: string;
    placeholder2: string;
    subTitle3: string;
    placeholder3: string;

    sortabled?: boolean;

    datas: ListData[];
    updateData: (data: ListData[]) => void; // データ更新関数
}

export const ListEditor = ({mainTitle, subTitle1, placeholder1, subTitle2, placeholder2, subTitle3, placeholder3, sortabled, datas, updateData}: ListEditorProps) => {
    // ドラッグ関連
    // カードのドラッグ判定用
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates
        })
    );

    const handleDragEnd = async (event:any) => {
        const { active, over } = event;
    
        if (active.id !== over.id) {
            const oldIndex = datas.findIndex((p) => p.id === active.id);
            const newIndex = datas.findIndex((p) => p.id === over.id);
            
            // 配列の更新
            const newDatas = arrayMove(datas, oldIndex, newIndex);
            updateData(newDatas);
        }
    }
    
    
    const onClickAddButton = () => {
        const newData = [...datas];
        newData.push({
            id: generateUuid(),
            title: "",
            value: "",
            discription: "",
        });
        updateData(newData);
    }

    const onClickDeleteButton = (index: number) => {
        const newData = [...datas];
        newData.splice(index, 1);
        updateData(newData);
    }

    const mainContent = (
        <div>
        </div>
    );

    return (
        <div>
            {/* maintitle */}
            <div className="flex justify-between">
                <label className="block decoration-purple-700 underline text-gray-700 dark:text-white text-sm font-bold mb-2">
                    {mainTitle}
                </label>
                {/* 追加ボタン */}
                <AddButton onClick={onClickAddButton} />
            </div>

            {sortabled ? (
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext items={datas.map((data) => data.id)} strategy={rectSortingStrategy}>
                        <div className="bg-gray-400 mt-2 rounded p-1">
                            {datas.map((data, index) => {
                                return (
                                    <SortableItem id={data.id} key={data.id} handlePosition={handlePositionType.middleRight}>
                                        <div className="flex justify-between w-full my-2 bg-gray-300 p-2 rounded">
                                            <div className="flex flex-col justify-start w-11/12 mr-2">
                                                <SingleRowInput
                                                    subtitle={subTitle1}
                                                    placeholder={placeholder1}
                                                    value={data.title}
                                                    onChange={(e) => {
                                                        const newData = [...datas];
                                                        newData[index].title = e.target.value;
                                                        updateData(newData);
                                                    }}
                                                />
                                                <SingleRowInput
                                                    subtitle={subTitle2}
                                                    placeholder={placeholder2}
                                                    value={data.value}
                                                    onChange={(e) => {
                                                        const newData = [...datas];
                                                        newData[index].value = e.target.value;
                                                        updateData(newData);
                                                    }}
                                                />
                                                <MultiRowInput
                                                    subtitle={subTitle3}
                                                    placeholder={placeholder3}
                                                    value={data.discription}
                                                    onChange={(e) => {
                                                        const newData = [...datas];
                                                        newData[index].discription = e.target.value;
                                                        updateData(newData);
                                                    }}
                                                />
                                            </div>
                                            {/* 削除ボタン */}
                                            <CancelButton onClick={() => onClickDeleteButton(index)} />
                                        </div>
                                    </SortableItem>
                                );
                            })}
                        </div>
                    </SortableContext>
                </DndContext>
            ) : (
                <div>
                    <div className="bg-gray-400 mt-2 rounded p-1">
                        {datas.map((data, index) => {
                            return (
                                <div className="flex justify-between w-full my-2 bg-gray-300 p-2 rounded" key={index}>
                                    <div className="flex flex-col justify-start w-11/12 mr-2">
                                        <SingleRowInput
                                            subtitle={subTitle1}
                                            placeholder={placeholder1}
                                            value={data.title}
                                            onChange={(e) => {
                                                const newData = [...datas];
                                                newData[index].title = e.target.value;
                                                updateData(newData);
                                            }}
                                        />
                                        <SingleRowInput
                                            subtitle={subTitle2}
                                            placeholder={placeholder2}
                                            value={data.value}
                                            onChange={(e) => {
                                                const newData = [...datas];
                                                newData[index].value = e.target.value;
                                                updateData(newData);
                                            }}
                                        />
                                        <MultiRowInput
                                            subtitle={subTitle3}
                                            placeholder={placeholder3}
                                            value={data.discription}
                                            onChange={(e) => {
                                                const newData = [...datas];
                                                newData[index].discription = e.target.value;
                                                updateData(newData);
                                            }}
                                        />
                                    </div>
                                    {/* 削除ボタン */}
                                    <CancelButton onClick={() => onClickDeleteButton(index)} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );

}