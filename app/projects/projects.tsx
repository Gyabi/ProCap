"use client";

import { useState, useEffect } from "react";
import { ProjectsMain } from "./main";
import { Select } from "./select";
import { Add } from "./add";
import { Edit } from "./edit";
import { Project } from "./data/project";
import { readProjectContainers, updateProjectContainers } from "./logic/project_curd";

import { Menu, Transition } from '@headlessui/react'
import { Fragment } from "react";

import { message } from "@tauri-apps/api/dialog";

export default function Projects() {
    // プロジェクトデータ
    const [projectContainers, setProjectContainers] = useState<Record<string, Project[]>>({});

    // 選択中のデータ
    const [selectedProject, setSelectedProject] = useState<Project | undefined>(undefined);
    // 選択中のコンテナ
    const [selectedContainer, setSelectedContainer] = useState<string | undefined>(undefined);

    // 初回ロード時にプロジェクトデータを取得する処理(2回フェッチ対策でignoreを使用)
    useEffect(() => {
        let ignore = false;

        readProjectContainers()
            .then((projectContainers: Record<string, Project[]>) => {
                if (!ignore) {
                    setProjectContainers(projectContainers);
                }
            });
        
        return () => { ignore = true; }
    }, []);


    const deleteProject = async (projectId: string) => {
        if (selectedContainer === undefined) {
            return;
        }
        const containerId = selectedContainer;

        // 対象のプロジェクトを削除
        const projects = projectContainers[containerId];
        const newProjects = projects.filter((project) => project.id != projectId);
        const newContainers = {...projectContainers, [containerId]: newProjects};
        
        // stateを更新
        setProjectContainers(newContainers);

        // ローカルに保存して永続化
        await updateProjectContainers(newContainers);
    }

    const updateProject = async (projectId:string, project: Project) => {
        if (selectedContainer === undefined) {
            return;
        }
        const containerId = selectedContainer;
       // 対象のプロジェクトを更新
        const projects = projectContainers[containerId];
        const index = projects.findIndex((p) => p.id == projectId);
        projects[index] = project;

        // newContainerに差し替え
        const newContainers = {...projectContainers, [containerId]: projects};

        // stateを更新
        setProjectContainers(newContainers);

        // ローカルに保存して永続化
        await updateProjectContainers(newContainers);
    }

    const addProject = async (project: Project) => {
        // 末尾のコンテナを取得
        const projects = projectContainers[Object.keys(projectContainers)[Object.keys(projectContainers).length - 1]];

        // 対象のプロジェクトを追加
        projects.push(project);

        // newContainerに差し替え
        const newContainers = {...projectContainers, [Object.keys(projectContainers)[Object.keys(projectContainers).length - 1]]: projects};

        console.log(projectContainers)
        // stateを更新
        setProjectContainers(newContainers);
        console.log(projectContainers)

        // ローカルに保存して永続化
        await updateProjectContainers(newContainers);
    }

    const deleteContainer = async (containerId: string) => {
    }

    const updateContaner = async (containerId:string, name: string) => {
    }

    const addContainer = async () => {
        if("newContainer" in Object.keys(projectContainers)){
            return
        }
        setProjectContainers({...projectContainers, ["newContainer"]: []});

        // ローカルに保存して永続化
        await updateProjectContainers(projectContainers);
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
        // 選択中のコンテナを設定
        setSelectedContainer(containerId);

        // 対象のプロジェクトを取得
        const targetProject = projectContainers[containerId].find((project) => project.id == projectId);

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
        setSelectedProject(undefined);
        setSelectedContainer(undefined);
        updateState(State.DEFAULT);
    }
    
    // 追加画面
    const [showAdd, setShowAdd] = useState(false);
    const openAdd = async () => {
        // containerが存在しないならエラーメッセージを表示
        if(Object.keys(projectContainers).length == 0){
            await message("プロジェクトコンテナが存在しません。")
                .then(
                    () => {
                        return;
                    }
                );

            return;
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
            <div className="flex justify-end m-1">
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-full px-3 py-2 text-sm font-bold text-gray-900 shadow-sm bg-purple-500 hover:bg-purple-700">
                        +
                        </Menu.Button>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                            {({ active }) => (
                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" id="menu-item-0" onClick={()=> openAdd()}>Project</a>
                            )}
                            </Menu.Item>
                            <Menu.Item>
                            {({ active }) => (
                                <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" id="menu-item-0" onClick={()=> addContainer()}>Container</a>
                            )}
                            </Menu.Item>
                        </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>

            {/* メインコンテンツ領域 */}
            <div className="flex justify-center items-center w-full h-full">
                <ProjectsMain initProjectContainers={projectContainers} setInitProjectContainers={setProjectContainers} openSelect={openSelect} />
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
