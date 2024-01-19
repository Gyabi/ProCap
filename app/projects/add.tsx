"use client";
import { CustomModal } from "./component/custom-modal";
import React, { useState, useEffect } from 'react';
import { Project } from "./data/project";
import { MdCancel } from "react-icons/md";
import { MdDone } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

import { generateUuid } from "./logic/uuid";
import { GitURL } from "./data/git_url";
import { ExplorerPath } from "./data/explorer_path";
import { OtherURL } from "./data/other_url";
import { updateProjects } from "./logic/project_curd";

import { ask } from "@tauri-apps/api/dialog";

/**
 * 追加画面プロパティ
 */
interface AddProps {
  isOpen: boolean;
  onRequestClose: () => void;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

/**
 * 追加画面コンポーネント
 * @param param0 
 * @returns 
 */
export const Add: React.FC<AddProps> = ({isOpen, onRequestClose, projects, setProjects}:AddProps) => {
  const [addProject, setAddProject] = useState<Project>({
      id: generateUuid(),
      projectName: "",
      description: "",
      mainPath: {
        id: generateUuid(),
        title: "",
        path: "",
        description: "",
      },
      gitUrls: [],
      explorerPaths: [],
      otherUrls: [],
    });

    const onClickAddDone = async () => {
      const newProjects = [...projects, addProject];
      setProjects(newProjects);

      // ファイルに保存
      await updateProjects(newProjects);

      // リセット
      setAddProject({
        id: generateUuid(),
        projectName: "",
        description: "",
        mainPath: {
          id: generateUuid(),
          title: "",
          path: "",
          description: "",
        },
        gitUrls: [],
        explorerPaths: [],
        otherUrls: [],
      });

      onRequestClose();
    }
    const onClickAddCancel = () => {
      // 確認ダイアログ
      ask("編集内容を破棄してよいですか？",{
        title: "",
        type: "warning",
        okLabel: "OK",
        cancelLabel: "Cancel",
      }).then((result) => {
        if(result){
          onRequestClose();
        }
      });
    }

    const onClickAddGitURL = () => {
      const newGitUrls: GitURL[] = [...addProject.gitUrls, {
        id: generateUuid(),
        title: "",
        url: "",
        description: "",
      }];
      setAddProject({...addProject, gitUrls: newGitUrls});
    }

    const onClickDeleteGitURL = (index: number) => {
      const newGitUrls = [...addProject.gitUrls];
      newGitUrls.splice(index, 1);
      setAddProject({...addProject, gitUrls: newGitUrls});
    }

    const onClickAddExplorerPath = () => {
      const newExplorerPaths: ExplorerPath[] = [...addProject.explorerPaths, {
        id: generateUuid(),
        title: "",
        path: "",
        description: "",
      }];
      setAddProject({...addProject, explorerPaths: newExplorerPaths});
    }

    const onClickDeleteExplorerPath = (index: number) => {
      const newExplorerPaths = [...addProject.explorerPaths];
      newExplorerPaths.splice(index, 1);
      setAddProject({...addProject, explorerPaths: newExplorerPaths});
    }

    const onClickAddOtherURL = () => {
      const newOtherUrls: OtherURL[] = [...addProject.otherUrls, {
        id: generateUuid(),
        title: "",
        url: "",
        description: "",
      }];
      setAddProject({...addProject, otherUrls: newOtherUrls});
    }

    const onClickDeleteOtherURL = (index: number) => {
      const newOtherUrls = [...addProject.otherUrls];
      newOtherUrls.splice(index, 1);
      setAddProject({...addProject, otherUrls: newOtherUrls});
    }

  return (
    <CustomModal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={false}
      onRequestClose={onRequestClose}
      widthPercentage={80}
      heightPercentage={80}
    >
      <div className="flex flex-col justify-start">
        <div className="flex justify-between">
          {/* タイトル */}
          <h5 className="mb-2 text-2xl decoration-purple-700 underline font-extrabold tracking-tight text-gray-900 dark:text-white">ADD MODE</h5>
          <div className="flex justify-end">
            {/* キャンセルボタン */}
            <div className="flex justify-center items-center bg-red-500 dark:bg-red-700 rounded-md px-2 py-2 mr-2"
              onClick={onClickAddCancel}>
                <div className="m-1">
                  <MdCancel /> 
                </div>
            </div>

            {/* 完了ボタン */}
            <div className="flex justify-center items-center bg-gray-200 dark:bg-gray-700 hover:bg-purple-500 rounded-md px-2 py-2 mr-2"
              onClick={onClickAddDone}>
                <div className="m-1">
                  <MdDone />
                </div>
            </div>
          </div>
        </div>

        {/* プロジェクト名 */}
        <div className="flex flex-col justify-start">
          <label className="block decoration-purple-700 underline text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="projectName">
            Project Name
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
            id="projectName"
            type="text"
            placeholder="Enter project name"
            value={addProject?.projectName}
            onChange={(e) => {
              setAddProject({...addProject, projectName: e.target.value})
            }}  
          />
        </div>

        {/* 説明文 */}
        <div className="mb-4">
          <label className="block decoration-purple-700 underline text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea 
            className="shadow appearance-none border rounded h-32 w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Enter description"
            value={addProject?.description}
            onChange={(e) => {
              setAddProject({...addProject, description: e.target.value})
            }}
          />
        </div>  
        {/* メインパス */}
        <div className="mb-4">
          <label className="block decoration-purple-700 underline text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="mainPath">
            Main Path
          </label>
          <label className="block text-gray-700 dark:text-white text-xs font-bold mb-2" htmlFor="mainPath">
            Path
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
            id="mainPath"
            type="text"
            placeholder="Enter main path"
            value={addProject?.mainPath.path}
            onChange={(e) => {
              setAddProject({...addProject, mainPath: {id:addProject.mainPath.id, title:"main", path: e.target.value, description: addProject.mainPath.description}})
            }}
            />
          <label className="block text-gray-700 dark:text-white text-xs font-bold mb-2" htmlFor="mainPath">
            Description
          </label>
          <textarea 
            className="shadow appearance-none border rounded h-16 w-full py-2 px-3 mb-2 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Enter description"
            value={addProject?.mainPath.description}
            onChange={(e) => {
              setAddProject({...addProject, mainPath: {id:addProject.mainPath.id, title:"main", path: addProject.mainPath.path, description: e.target.value}})
            }}
          />
        </div>

        {/* gitURL */}
        <div className="flex justify-between">
          <label className="block decoration-purple-700 underline text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="mainPath">
            git URLs
          </label>
          {/* 追加ボタン */}
          <div className="flex justify-center items-center bg-gray-200 dark:bg-gray-700 hover:bg-purple-500 rounded-md px-2 py-2 mr-2"
              onClick={onClickAddGitURL}>
            <div className="m-1">
              <IoMdAddCircle />
            </div>
          </div>
        </div>
        <div className="bg-gray-400 mt-2 rounded p-1">
          {addProject?.gitUrls.map((gitURL, index) => {
            return (
              <div className="flex justify-between w-full my-2 bg-gray-300 p-2 rounded" key={index}>
                <div className="flex flex-col justify-start w-11/12 mr-2">
                  <label className="block text-gray-700 dark:text-white text-xs font-bold mb-2" htmlFor="mainPath">
                    Title
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                    id={"gitURLTitle" + index.toString()}
                    type="text"
                    placeholder="Enter title"
                    value={gitURL.title}
                    onChange={(e) => {
                      const newGitUrls = [...addProject.gitUrls];
                      newGitUrls[index].title = e.target.value;
                      setAddProject({...addProject, gitUrls: newGitUrls});
                    }}
                  />
                  <label className="block text-gray-700 dark:text-white text-xs font-bold mb-2" htmlFor="mainPath">
                    URL
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                    id={"gitURL" + index.toString()}
                    type="text"
                    placeholder="Enter URL"
                    value={gitURL.url}
                    onChange={(e) => {
                      const newGitUrls = [...addProject.gitUrls];
                      newGitUrls[index].url = e.target.value;
                      setAddProject({...addProject, gitUrls: newGitUrls});
                    }}
                  />
                  <label className="block text-gray-700 dark:text-white text-xs font-bold mb-2" htmlFor="mainPath">
                    Description
                  </label>
                  <textarea 
                    className="shadow appearance-none border rounded h-16 w-full py-2 px-3 mb-2 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                    id={"gitURLDescription" + index.toString()}
                    placeholder="Enter description"
                    value={gitURL.description}
                    onChange={(e) => {
                      const newGitUrls = [...addProject.gitUrls];
                      newGitUrls[index].description = e.target.value;
                      setAddProject({...addProject, gitUrls: newGitUrls});
                    }}
                  />
                </div>
                {/* 削除ボタン */}
                <div className="flex justify-end bg-red-500 dark:bg-red-700 rounded-md px-2 py-2 ml-2 h-10 w-10"
                  onClick={() => onClickDeleteGitURL(index)}>
                  <div className="m-1">
                    <MdCancel /> 
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* exploler */}
        <div className="flex justify-between">
          <label className="block decoration-purple-700 underline text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="mainPath">
            Explorer Paths
          </label>
          {/* 追加ボタン */}
          <div className="flex justify-center items-center bg-gray-200 dark:bg-gray-700 hover:bg-purple-500 rounded-md px-2 py-2 mr-2"
              onClick={onClickAddExplorerPath}>
            <div className="m-1">
              <IoMdAddCircle />
            </div>
          </div>
        </div>

        <div className="bg-gray-400 mt-2 rounded p-1">
          {addProject?.explorerPaths.map((explorerPath, index) => {
            return (
              <div className="flex justify-between w-full my-2 bg-gray-300 p-2 rounded" key={index}>
                <div className="flex flex-col justify-start w-11/12 mr-2">
                  <label className="block text-gray-700 dark:text-white text-xs font-bold mb-2" htmlFor="mainPath">
                    Title
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                    id={"explorerPathTitle" + index.toString()}
                    type="text"
                    placeholder="Enter title"
                    value={explorerPath.title}
                    onChange={(e) => {
                      const newExplorerPaths = [...addProject.explorerPaths];
                      newExplorerPaths[index].title = e.target.value;
                      setAddProject({...addProject, explorerPaths: newExplorerPaths});
                    }}
                  />
                  <label className="block text-gray-700 dark:text-white text-xs font-bold mb-2" htmlFor="mainPath">
                    Path
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                    id={"explorerPath" + index.toString()}
                    type="text"
                    placeholder="Enter path"
                    value={explorerPath.path}
                    onChange={(e) => {
                      const newExplorerPaths = [...addProject.explorerPaths];
                      newExplorerPaths[index].path = e.target.value;
                      setAddProject({...addProject, explorerPaths: newExplorerPaths});
                    }}
                  />
                  <label className="block text-gray-700 dark:text-white text-xs font-bold mb-2" htmlFor="mainPath">
                    Description
                  </label>
                  <textarea 
                    className="shadow appearance-none border rounded h-16 w-full py-2 px-3 mb-2 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                    id={"explorerPathDescription" + index.toString()}
                    placeholder="Enter description"
                    value={explorerPath.description
                    }
                    onChange={(e) => {
                      const newExplorerPaths = [...addProject.explorerPaths];
                      newExplorerPaths[index].description = e.target.value;
                      setAddProject({...addProject, explorerPaths: newExplorerPaths});
                    }}
                  />
                </div>
                {/* 削除ボタン */}
                <div className="flex justify-end bg-red-500 dark:bg-red-700 rounded-md px-2 py-2 ml-2 h-10 w-10"
                  onClick={() => onClickDeleteExplorerPath(index)}>
                  <div className="m-1">
                    <MdCancel /> 
                  </div>
                </div>
              </div>
            )
          }
          )}
        </div>

        {/* other */}
        <div className="flex justify-between">
          <label className="block decoration-purple-700 underline text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="mainPath">
            Other URLs
          </label>
          {/* 追加ボタン */}
          <div className="flex justify-center items-center bg-gray-200 dark:bg-gray-700 hover:bg-purple-500 rounded-md px-2 py-2 mr-2"
              onClick={onClickAddOtherURL}>
            <div className="m-1">
              <IoMdAddCircle />
            </div>
          </div>
        </div>

        <div className="bg-gray-400 mt-2 rounded p-1">
          {addProject?.otherUrls.map((otherURL, index) => {
            return (
              <div className="flex justify-between w-full my-2 bg-gray-300 p-2 rounded" key={index}>
                <div className="flex flex-col justify-start w-11/12 mr-2">
                  <label className="block text-gray-700 dark:text-white text-xs font-bold mb-2" htmlFor="mainPath">
                    Title
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                    id={"otherURLTitle" + index.toString()}
                    type="text"
                    placeholder="Enter title"
                    value={otherURL.title}
                    onChange={(e) => {
                      const newOtherUrls = [...addProject.otherUrls];
                      newOtherUrls[index].title = e.target.value;
                      setAddProject({...addProject, otherUrls: newOtherUrls});
                    }}
                  />
                  <label className="block text-gray-700 dark:text-white text-xs font-bold mb-2" htmlFor="mainPath">
                    URL
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                    id={"otherURL" + index.toString()}
                    type="text"
                    placeholder="Enter URL"
                    value={otherURL.url}
                    onChange={(e) => {
                      const newOtherUrls = [...addProject.otherUrls];
                      newOtherUrls[index].url = e.target.value;
                      setAddProject({...addProject, otherUrls: newOtherUrls});
                    }}
                  />
                  <label className="block text-gray-700 dark:text-white text-xs font-bold mb-2" htmlFor="mainPath">
                    Description
                  </label>
                  <textarea 
                    className="shadow appearance-none border rounded h-16 w-full py-2 px-3 mb-2 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                    id={"otherURLDescription" + index.toString()}
                    placeholder="Enter description"
                    value={otherURL.description}
                    onChange={(e) => {
                      const newOtherUrls = [...addProject.otherUrls];
                      newOtherUrls[index].description = e.target.value;
                      setAddProject({...addProject, otherUrls: newOtherUrls});
                    }}
                  />
                </div>
                {/* 削除ボタン */}
                <div className="flex justify-end bg-red-500 dark:bg-red-700 rounded-md px-2 py-2 ml-2 h-10 w-10"
                  onClick={() => onClickDeleteOtherURL(index)}>
                  <div className="m-1">
                  <MdCancel /> 
                    </div>
                </div>
              </div>
            )
          }
          )}
        </div>
      </div>
    </CustomModal>
  );
}