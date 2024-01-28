"use client";

import { useState, useEffect } from "react";
import { ProjectsMain } from "./main";
import { Select } from "./select";
import { Add } from "./add";
import { Edit } from "./edit";
import { ItemContainer } from "./item-container";
import { Project, ProjectContainer } from "./data/project";
import { readProjectContainers, readProjects, updateProjectContainers, updateProjects } from "./logic/project_curd";

import {MultipleContainers} from "./component/dnd/sample/MultipleContainers";
import { rectSortingStrategy } from "@dnd-kit/sortable";

import { message } from "@tauri-apps/api/dialog";

export default function Projects() {
    // プロジェクトデータ
    // const [projects, setProjects] = useState<Project[]>([]);
    const [projectContainers, setProjectContainers] = useState<ProjectContainer[]>([]);

    // 選択中のデータ
    const [selectedProject, setSelectedProject] = useState<Project | undefined>(undefined);
    // 選択中のコンテナ
    const [selectedContainer, setSelectedContainer] = useState<ProjectContainer | undefined>(undefined);

    // 初回ロード時にプロジェクトデータを取得する処理(2回フェッチ対策でignoreを使用)
    useEffect(() => {
        let ignore = false;

        readProjectContainers()
            .then((projectContainers: ProjectContainer[]) => {
                if (!ignore) {
                    setProjectContainers(projectContainers);
                }
            });
        
        return () => { ignore = true; }
    }, []);


    const deleteProject = async (containerId:string, projectId: string) => {
        // 対象のコンテナに対応するindexを取得
        const containerIndex = projectContainers.findIndex((container) => container.id == containerId);
        // 対象のコンテナを取得
        const container = projectContainers[containerIndex];

        // 対象のプロジェクトを削除
        const projects = container.projects;
        const newProjects = projects.filter((project) => project.id != projectId);
        const newContainer = {...container, projects: newProjects};
        
        // newContainerに差し替え
        const newContainers = [...projectContainers];
        newContainers[containerIndex] = newContainer;

        // stateを更新
        setProjectContainers(newContainers);

        // ローカルに保存して永続化
        await updateProjectContainers(newContainers);
    }

    const updateProject = async (containerId:string, projectId:string, project: Project) => {
        // 対象のコンテナに対応するindexを取得
        const containerIndex = projectContainers.findIndex((container) => container.id == containerId);
        // 対象のコンテナを取得
        const container = projectContainers[containerIndex];

        // 対象のプロジェクトを更新
        const projects = container.projects;
        const index = projects.findIndex((p) => p.id == projectId);
        projects[index] = project;
        const newContainer = {...container, projects: projects};

        // newContainerに差し替え
        const newContainers = [...projectContainers];
        newContainers[containerIndex] = newContainer;

        // stateを更新
        setProjectContainers(newContainers);

        // ローカルに保存して永続化
        await updateProjectContainers(newContainers);
    }

    const addProject = async (project: Project) => {
        // 末尾のコンテナindexを取得
        const containerIndex = projectContainers.length - 1;
        // 対象のコンテナを取得
        const container = projectContainers[containerIndex];

        // 対象のプロジェクトを追加
        const projects = container.projects;
        projects.push(project);
        const newContainer = {...container, projects: projects};

        // newContainerに差し替え
        const newContainers = [...projectContainers];
        newContainers[containerIndex] = newContainer;

        // stateを更新
        setProjectContainers(newContainers);

        // ローカルに保存して永続化
        await updateProjectContainers(newContainers);
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
    const openSelect = (containerId:string, projectId:string) => {
        // 対象のコンテナに対応するindexを取得
        const containerIndex = projectContainers.findIndex((container) => container.id == containerId);
        // 対象のコンテナを取得
        const container = projectContainers[containerIndex];

        // 対象のプロジェクトを取得
        const targetProject = container.projects.find((project) => project.id == projectId);

        // 選択しているプロジェクトを設定
        setSelectedProject(targetProject);

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
    const openAdd = async () => {
        // containerが存在しないならエラーメッセージを表示
        if(projectContainers.length == 0){
            await message("プロジェクトコンテナが存在しません。")
                .then(
                    () => {
                        return;
                    }
                );
        }
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
                {/* <ProjectsMain projectContainers={projectContainers} setProjectContainers={setProjectContainers} openSelect={openSelect} /> */}
                {/* <ItemContainer projects={projects} setProjects={setProjects} showProject={openSelect} /> */}
                <MultipleContainers
                    columns={2}
                    itemCount={5}
                    strategy={rectSortingStrategy}
                    wrapperStyle={() => ({
                    width: 150,
                    height: 150,
                    })}
                    vertical
                />
            </div>

            {/* 選択時画面 */}
            {
                // state == State.SELECT &&
                // <Select isOpen={showSelect} onRequestClose={closeSelect} selectedProject={selectedProject} setSelectedProject={setSelectedProject} deleteProject={deleteProject} openEditModal={openEdit}/>
            }

            {/* 追加画面 */}
            {
                // state == State.ADD &&
                // <Add isOpen={showAdd} onRequestClose={closeAdd} addProject={addProject}/>
            }

            {/* 編集画面 */}
            {
                // state == State.EDIT &&
                // <Edit isOpen={showEdit} onRequestClose={closeEdit} selectedProject={selectedProject} setSelectedProject={setSelectedProject} updateProject={updateProject} />
            }
        </div>
    )
}
