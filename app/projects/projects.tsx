"use client";

import { useState, useEffect } from "react";
import { Select } from "./select";
import { Add } from "./add";
import { Edit } from "./edit";
import { ItemContainer } from "./item-container";
import { Project } from "./data/project";

export default function Projects() {
    // プロジェクトデータ
    const [projects, setProjects] = useState<Project[]>([
        {
            id: "1",
            projectName: "project1",
            description: "プロジェクト1の説明\n改行テスト\nthis is my project",
            gitURLs: [
                {
                    id: "1",
                    url: "git_url_1",
                    description: "git_url_1の説明\n改行テスト",
                },
                {
                    id: "2",
                    url: "git_url_2",
                    description: "git_url_2の説明",
                },
            ],
            explorerPaths: [
                {
                    id: "1",
                    path: "explorer_path_1",
                    description: "explorer_path_1の説明",
                },
                {
                    id: "2",
                    path: "explorer_path_2",
                    description: "explorer_path_2の説明",
                },
            ],
            otherURLs: [
                {
                    id: "1",
                    url: "other_url_1",
                    description: "other_url_1の説明",
                },
                {
                    id: "2",
                    url: "other_url_2",
                    description: "other_url_2の説明",
                },
            ],
        },
        {
            id: "2",
            projectName: "プロジェクト2",
            description: "プロジェクト2の説明",
            gitURLs: [
                {
                    id: "1",
                    url: "git_url_1",
                    description: "git_url_1の説明",
                },
                {
                    id: "2",
                    url: "git_url_2",
                    description: "git_url_2の説明",
                },
            ],
            explorerPaths: [
                {
                    id: "1",
                    path: "explorer_path_1",
                    description: "explorer_path_1の説明",
                },
                {
                    id: "2",
                    path: "explorer_path_2",
                    description: "explorer_path_2の説明",
                },
            ],
            otherURLs: [
                {
                    id: "1",
                    url: "other_url_1",
                    description: "other_url_1の説明",
                },
                {
                    id: "2",
                    url: "other_url_2",
                    description: "other_url_2の説明",
                },
            ],
        },
        {
            id: "3",
            projectName: "プロジェクト3",
            description: "プロジェクト3の説明",
            gitURLs: [
                {
                    id: "1",
                    url: "git_url_1",
                    description: "git_url_1の説明",
                },
            ],
            explorerPaths: [
                {
                    id: "1",
                    path: "explorer_path_1",
                    description: "explorer_path_1の説明",
                },
            ],
            otherURLs: [
                {
                    id: "1",
                    url: "other_url_1",
                    description: "other_url_1の説明",
                },
            ],
        },
        {
            id: "4",
            projectName: "プロジェクト4",
            description: "プロジェクト4の説明",
            gitURLs: [
                {
                    id: "1",
                    url: "git_url_1",
                    description: "git_url_1の説明",
                },
                {
                    id: "2",
                    url: "git_url_2",
                    description: "git_url_2の説明",
                },
                {
                    id: "3",
                    url: "git_url_3",
                    description: "git_url_3の説明",
                },
            ],
            explorerPaths: [
                {
                    id: "1",
                    path: "explorer_path_1",
                    description: "explorer_path_1の説明",
                },
                {
                    id: "2",
                    path: "explorer_path_2",
                    description: "explorer_path_2の説明",
                },
                {
                    id: "3",
                    path: "explorer_path_3",
                    description: "explorer_path_3の説明",
                },
            ],
            otherURLs: [
                {
                    id: "1",
                    url: "other_url_1",
                    description: "other_url_1の説明",
                },
                {
                    id: "2",
                    url: "other_url_2",
                    description: "other_url_2の説明",
                },
                {
                    id: "3",
                    url: "other_url_3",
                    description: "other_url_3の説明",
                },
            ],
        },
        {
            id: "5",
            projectName: "プロジェクト5",
            description: "プロジェクト5の説明",
            gitURLs: [
                {
                    id: "1",
                    url: "git_url_1",
                    description: "git_url_1の説明",
                },
                {
                    id: "2",
                    url: "git_url_2",
                    description: "git_url_2の説明",
                },
                {
                    id: "3",
                    url: "git_url_3",
                    description: "git_url_3の説明",
                },
                {
                    id: "4",
                    url: "git_url_4",
                    description: "git_url_4の説明",
                },
            ],
            explorerPaths: [
                {
                    id: "1",
                    path: "explorer_path_1",
                    description: "explorer_path_1の説明",
                },
                {
                    id: "2",
                    path: "explorer_path_2",
                    description: "explorer_path_2の説明",
                },
                {
                    id: "3",
                    path: "explorer_path_3",
                    description: "explorer_path_3の説明",
                },
                {
                    id: "4",
                    path: "explorer_path_4",
                    description: "explorer_path_4の説明",
                },
            ],
            otherURLs: [
                {
                    id: "1",
                    url: "other_url_1",
                    description: "other_url_1の説明",
                },
                {
                    id: "2",
                    url: "other_url_2",
                    description: "other_url_2の説明",
                },
                {
                    id: "3",
                    url: "other_url_3",
                    description: "other_url_3の説明",
                },
                {
                    id: "4",
                    url: "other_url_4",
                    description: "other_url_4の説明",
                },
            ],
        },
    ]);

    // 選択中のデータ
    const [selectedProject, setSelectedProject] = useState<Project | undefined>(undefined);

    // // 初回ロード時にプロジェクトデータを取得する処理
    // useEffect(() => {
    //     // TODO:データのフェッチ処理
    //     setProjects([
    //     ]);
    // }, []);

    enum State {
        DEFAULT,
        SELECT,
        ADD,
        EDIT,
    }

    // 画面状態管理
    const [state, setState] = useState(State.DEFAULT);
    const updateState = (state: State) => {
        setState(state);
    }

    // 選択画面
    const [showSelect, setShowSelect] = useState(false);
    const openSelect = (id:string) => {
        // 選択しているプロジェクトを設定
        setSelectedProject(projects.find((project) => project.id == id));

        // 各種画面の表示制御
        setShowSelect(true);
        setShowAdd(false);
        setShowEdit(false);

        // 画面状態を選択画面に変更
        updateState(State.SELECT);
    }
    const closeSelect = () => {
        setShowSelect(false);
        updateState(State.DEFAULT);
    }
    
    // 追加画面
    const [showAdd, setShowAdd] = useState(false);
    const openAdd = () => {
        setShowAdd(true);
        setShowSelect(false);
        setShowEdit(false);
        updateState(State.ADD);
    }
    const closeAdd = () => {
        setShowAdd(false);
        updateState(State.DEFAULT);
    }
    
    // 編集画面
    const [showEdit, setShowEdit] = useState(false);
    const openEdit = () => {
        setShowEdit(true);
        setShowSelect(false);
        setShowAdd(false);
        updateState(State.EDIT);
    }
    const closeEdit = () => {
        setShowEdit(false);
        // 編集画面を終了する時には選択画面に遷移する
        openSelect(selectedProject?.id || "");

        updateState(State.SELECT);
    }

    return (
        <div className="flex flex-col justify-start w-full h-full">
            {/* ボタンバー */}
            <div className="flex justify-end">
                {/* 追加ボタン */}
                <button
                    className="bg-purple-500 hover:bg-purple-700 text-black font-bold py-2 px-4 m-2 rounded-full"
                    onClick={() => {
                        openAdd();
                    }}    
                >
                    +
                </button>
            </div>

            {/* メインコンテンツ領域 */}
            <div className="flex justify-center items-center w-full h-full">
                <ItemContainer projects={projects} setProjects={setProjects} showProject={openSelect} />
            </div>

            {/* 選択時画面 */}
            {
                state == State.SELECT &&
                <Select isOpen={showSelect} onRequestClose={closeSelect} selectedProject={selectedProject}/>
            }

            {/* 追加画面 */}
            {
                state == State.ADD &&
                <Add isOpen={showAdd} onRequestClose={closeAdd}/>
            }

            {/* 編集画面 */}
            {
                state == State.EDIT &&
                <Edit isOpen={showEdit} onRequestClose={closeEdit}/>
            }
        </div>
    )
}