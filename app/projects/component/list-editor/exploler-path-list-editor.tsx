"use client";
import { ListEditor, ListData } from "./list-editor";
import { ExplorerPath } from "../../data/explorer_path";

interface ExplorerPathListEditorProps {
    explorerPaths: ExplorerPath[];
    updateExplorerPaths: (explorerPaths: ExplorerPath[]) => void; // データ更新関数
    sortabled?: boolean;
}

export const ExplorerPathListEditor = ({explorerPaths, updateExplorerPaths, sortabled}: ExplorerPathListEditorProps) => {
    return (
        <ListEditor
            mainTitle="explorer paths"
            subTitle1="Title"
            placeholder1="Enter title"
            subTitle2="Path"
            placeholder2="Enter path"
            subTitle3="Description"
            placeholder3="Enter description"

            sortabled={sortabled}

            datas={explorerPaths.map((explorerPath) => {
                return {
                    id: explorerPath.id,
                    title: explorerPath.title,
                    value: explorerPath.path,
                    discription: explorerPath.description,
                }
            })}
            updateData={(datas:ListData[]) => {
                // ListDataをexplorerPathsに変換して伝搬
                updateExplorerPaths(datas.map((data) => {
                    return {
                        id: data.id,
                        title: data.title,
                        path: data.value,
                        description: data.discription,
                    }
                }))
            }}
        />
    );
};