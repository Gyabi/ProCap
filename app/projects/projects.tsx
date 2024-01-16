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
        projectName: "Project1",
        description: "Project1の説明文",
        mainPath: {
            id: "1",
            title: "main",
            path: "/path/to/main",
            description: "mainの説明文",
        },
        explorerPaths: [
            {
                id: "1",
                title: "explorer1",
                path: "/path/to/explorer1",
                description: "explorer1の説明文",
            },
            {
                id: "2",
                title: "explorer2",
                path: "/path/to/explorer2",
                description: "explorer2の説明文",
            },
        ],
        gitURLs: [
            {
                id: "1",
                title: "git1",
                url: "aaa",
                description: "git1の説明文",
            },
            {
                id: "2",
                title: "git2",
                url: "bbb",
                description: "git2の説明文",
            }
        ],
        otherURLs: [
            {
                id: "1",
                title: "other1",
                url: "aaa",
                description: "other1の説明文",
            }
        ],
    },
    {
        id: "2",
        projectName: "Project2",
        description: "Project2の説明文",
        mainPath: {
            id: "1",
            title: "main",
            path: "/path/to/main",
            description: "mainの説明文",
        },
        explorerPaths: [
            {
                id: "1",
                title: "explorer1",
                path: "/path/to/explorer1",
                description: "explorer1の説明文",
            },
            {
                id: "2",
                title: "explorer2",
                path: "/path/to/explorer2",
                description: "explorer2の説明文",
            },
        ],
        gitURLs: [
            {
                id: "1",
                title: "git1",
                url: "aaa",
                description: "git1の説明文",
            },
            {
                id: "2",
                title: "git2",
                url: "bbb",
                description: "git2の説明文",
            }
        ],
        otherURLs: [
            {
                id: "1",
                title: "other1",
                url: "aaa",
                description: "other1の説明文",
            }
        ],
    }
    ]);

    // 選択中のデータ
    const [selectedProject, setSelectedProject] = useState<Project | undefined>(undefined);

    // 初回ロード時にプロジェクトデータを取得する処理
    useEffect(() => {
        // TODO:データのフェッチ処理
        // setProjects([]);
    }, []);

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
        setShowSelect(false);
        setShowEdit(true);
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
                <Select isOpen={showSelect} onRequestClose={closeSelect} selectedProject={selectedProject} setSelectedProject={setSelectedProject} projects={projects} setProjects={setProjects} openEditModal={openEdit}/>
            }

            {/* 追加画面 */}
            {
                state == State.ADD &&
                <Add isOpen={showAdd} onRequestClose={closeAdd}/>
            }

            {/* 編集画面 */}
            {
                state == State.EDIT &&
                <Edit isOpen={showEdit} onRequestClose={closeEdit} selectedProject={selectedProject} setSelectedProject={setSelectedProject} projects={projects} setProjects={setProjects} />
            }
        </div>
    )
}
