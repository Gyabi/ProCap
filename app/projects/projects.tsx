"use client";

import { useState, useEffect } from "react";
import { Select } from "./select";
import { Add } from "./add";
import { Edit } from "./edit";
import { ItemContainer } from "./item-container";
import { Project } from "./data/project";
import { readProjects, updateProjects } from "./logic/project_curd";

export default function Projects() {
    // プロジェクトデータ
    const [projects, setProjects] = useState<Project[]>([]);

    // 選択中のデータ
    const [selectedProject, setSelectedProject] = useState<Project | undefined>(undefined);

    // 初回ロード時にプロジェクトデータを取得する処理(2回フェッチ対策でignoreを使用)
    useEffect(() => {
        let ignore = false;

        readProjects()
            .then((projects: Project[]) => {
                if (!ignore) {
                    setProjects(projects);
                }
            });
        
        return () => { ignore = true; }
    }, []);


    const deleteProject = async (id: string) => {
        const newProjects = projects.filter((project) => project.id != id);
        setProjects(newProjects);
        await updateProjects(newProjects);
    }

    const updateProject = async (project: Project) => {
        const newProjects = [...projects];
        const index = newProjects.findIndex((p) => p.id == project.id);
        newProjects[index] = project;
        setProjects(newProjects);

        await updateProjects(newProjects);
    }

    const addProject = async (project: Project) => {
        const newProjects = [...projects, project];
        setProjects(newProjects);
        // setProjectsが即時反映されないのでnewProjectsを渡す
        await updateProjects(newProjects);
    }



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
        updateState(State.DEFAULT);
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
                <Select isOpen={showSelect} onRequestClose={closeSelect} selectedProject={selectedProject} setSelectedProject={setSelectedProject} deleteProject={deleteProject} openEditModal={openEdit}/>
            }

            {/* 追加画面 */}
            {
                state == State.ADD &&
                <Add isOpen={showAdd} onRequestClose={closeAdd} addProject={addProject}/>
            }

            {/* 編集画面 */}
            {
                state == State.EDIT &&
                <Edit isOpen={showEdit} onRequestClose={closeEdit} selectedProject={selectedProject} setSelectedProject={setSelectedProject} updateProject={updateProject} />
            }
        </div>
    )
}
