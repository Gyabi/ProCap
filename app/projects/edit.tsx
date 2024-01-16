import { CustomModal } from "./component/custom-modal";
import React, { useState, useEffect } from 'react';
import { Project } from "./data/project";
import { MdCancel } from "react-icons/md";
import { MdDone } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";

import { generateUuid } from "./logic/uuid";

interface EditProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedProject: Project|undefined;
  setSelectedProject: React.Dispatch<React.SetStateAction<Project | undefined>>;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

export const Edit: React.FC<EditProps> = ({isOpen, onRequestClose, selectedProject, setSelectedProject, projects, setProjects}:EditProps) => {
  const [editProject, setEditProject] = useState<Project|undefined>(selectedProject);

  // isOpenがtrueに変化したときに、selectedProjectをeditProject複製する
  useEffect(() => {
    setEditProject(JSON.parse(JSON.stringify(selectedProject)))
  }, [isOpen]);

  const onClickEditDone = () => {
    // editProjectをprojectsとselectedProjectに反映する
    // TODO:アップデート処理
    setSelectedProject(JSON.parse(JSON.stringify(editProject)));
    const newProjects = [...projects];
    const index = newProjects.findIndex((project) => project.id === editProject?.id);
    newProjects[index] = editProject as Project;
    setProjects(newProjects);

    onRequestClose();
  }

  const onClickEditCancel = () => {
    onRequestClose();
  }

  const onClickAddGitURL = () => {
    if(editProject === undefined){
      return;
    }
    const newGitURLs = [...editProject.gitURLs];
    newGitURLs.push({id: generateUuid(), title: "", url: "", description: ""});
    setEditProject({...editProject, gitURLs: newGitURLs});
  }

  const onClickDeleteGitURL = (index: number) => {
    if(editProject === undefined){
      return;
    }
    const newGitURLs = [...editProject.gitURLs];
    newGitURLs.splice(index, 1);
    setEditProject({...editProject, gitURLs: newGitURLs});
  }

  const onClickAddExplorerPath = () => {
    if(editProject === undefined){
      return;
    }
    const newExplorerPaths = [...editProject.explorerPaths];
    newExplorerPaths.push({id: generateUuid(), title: "", path: "", description: ""});
    setEditProject({...editProject, explorerPaths: newExplorerPaths});
  }

  const onClickDeleteExplorerPath = (index: number) => {
    if(editProject === undefined){
      return;
    }
    const newExplorerPaths = [...editProject.explorerPaths];
    newExplorerPaths.splice(index, 1);
    setEditProject({...editProject, explorerPaths: newExplorerPaths});
  }

  const onClickAddOtherURL = () => {
    if(editProject === undefined){
      return;
    }
    const newOtherURLs = [...editProject.otherURLs];
    newOtherURLs.push({id: generateUuid(), title: "", url: "", description: ""});
    setEditProject({...editProject, otherURLs: newOtherURLs});
  }

  const onClickDeleteOtherURL = (index: number) => {
    if(editProject === undefined){
      return;
    }
    const newOtherURLs = [...editProject.otherURLs];
    newOtherURLs.splice(index, 1);
    setEditProject({...editProject, otherURLs: newOtherURLs});
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
          <h5 className="mb-2 text-2xl decoration-purple-700 underline font-extrabold tracking-tight text-gray-900 dark:text-white">EDIT MODE</h5>
          <div className="flex justify-end">
            {/* キャンセルボタン */}
            <div className="flex justify-center items-center bg-red-500 dark:bg-red-700 rounded-md px-2 py-2 mr-2"
              onClick={onClickEditCancel}>
                <div className="m-1">
                  <MdCancel /> 
                </div>
            </div>

            {/* 完了ボタン */}
            <div className="flex justify-center items-center bg-gray-200 dark:bg-gray-700 hover:bg-purple-500 rounded-md px-2 py-2 mr-2"
              onClick={onClickEditDone}>
                <div className="m-1">
                  <MdDone />
                </div>
            </div>
          </div>
        </div>

        {/* プロジェクト名 */}
        <div className="mb-4">
          <label className="block decoration-purple-700 underline text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="projectName">
            Project Name
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
            id="projectName"
            type="text"
            placeholder="Enter project name"
            value={editProject?.projectName}
            onChange={(e) => {
              if(editProject === undefined){
                return;
              }
              setEditProject({...editProject, projectName: e.target.value})
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
            value={editProject?.description}
            onChange={(e) => {
              if(editProject === undefined){
                return;
              }
              setEditProject({...editProject, description: e.target.value})
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
            value={editProject?.mainPath.path}
            onChange={(e) => {
              if(editProject === undefined){
                return;
              }
              setEditProject({...editProject, mainPath: {id:editProject.mainPath.id, title:"main", path: e.target.value, description: editProject.mainPath.description}})
            }}
            />
          <label className="block text-gray-700 dark:text-white text-xs font-bold mb-2" htmlFor="mainPath">
            Description
          </label>
          <textarea 
            className="shadow appearance-none border rounded h-16 w-full py-2 px-3 mb-2 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Enter description"
            value={editProject?.mainPath.description}
            onChange={(e) => {
              if(editProject === undefined){
                return;
              }
              setEditProject({...editProject, mainPath: {id:editProject.mainPath.id, title:"main", path: editProject.mainPath.path, description: e.target.value}})
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
          {editProject?.gitURLs.map((gitURL, index) => {
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
                      if(editProject === undefined){
                        return;
                      }
                      const newGitURLs = [...editProject.gitURLs];
                      newGitURLs[index].title = e.target.value;
                      setEditProject({...editProject, gitURLs: newGitURLs});
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
                      if(editProject === undefined){
                        return;
                      }
                      const newGitURLs = [...editProject.gitURLs];
                      newGitURLs[index].url = e.target.value;
                      setEditProject({...editProject, gitURLs: newGitURLs});
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
                      if(editProject === undefined){
                        return;
                      }
                      const newGitURLs = [...editProject.gitURLs];
                      newGitURLs[index].description = e.target.value;
                      setEditProject({...editProject, gitURLs: newGitURLs});
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
        <div className="flex justify-between mt-5">
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
          {editProject?.explorerPaths.map((explorerPath, index) => {
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
                      if(editProject === undefined){
                        return;
                      }
                      const newExplorerPaths = [...editProject.explorerPaths];
                      newExplorerPaths[index].title = e.target.value;
                      setEditProject({...editProject, explorerPaths: newExplorerPaths});
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
                      if(editProject === undefined){
                        return;
                      }
                      const newExplorerPaths = [...editProject.explorerPaths];
                      newExplorerPaths[index].path = e.target.value;
                      setEditProject({...editProject, explorerPaths: newExplorerPaths});
                    }}
                  />
                  <label className="block text-gray-700 dark:text-white text-xs font-bold mb-2" htmlFor="mainPath">
                    Description
                  </label>
                  <textarea 
                    className="shadow appearance-none border rounded h-16 w-full py-2 px-3 mb-2 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                    id={"explorerPathDescription" + index.toString()}
                    placeholder="Enter description"
                    value={explorerPath.description}
                    onChange={(e) => {
                      if(editProject === undefined){
                        return;
                      }
                      const newExplorerPaths = [...editProject.explorerPaths];
                      newExplorerPaths[index].description = e.target.value;
                      setEditProject({...editProject, explorerPaths: newExplorerPaths});
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
        <div className="flex justify-between mt-5">
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
          {editProject?.otherURLs.map((otherURL, index) => {
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
                      if(editProject === undefined){
                        return;
                      }
                      const newOtherURLs = [...editProject.otherURLs];
                      newOtherURLs[index].title = e.target.value;
                      setEditProject({...editProject, otherURLs: newOtherURLs});
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
                      if(editProject === undefined){
                        return;
                      }
                      const newOtherURLs = [...editProject.otherURLs];
                      newOtherURLs[index].url = e.target.value;
                      setEditProject({...editProject, otherURLs: newOtherURLs});
                    }}
                  />
                  <label className="block text-gray-700 dark:text-white text-xs font-bold mb-2" htmlFor="mainPath">
                    Description
                  </label>
                  <textarea 
                    className="shadow appearance-none border rounded h-16 w-full py-2 px-3 mb-2 text-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow
                    -outline"
                    id={"otherURLDescription" + index.toString()}
                    placeholder="Enter description"
                    value={otherURL.description}
                    onChange={(e) => {
                      if(editProject === undefined){
                        return;
                      }
                      const newOtherURLs = [...editProject.otherURLs];
                      newOtherURLs[index].description = e.target.value;
                      setEditProject({...editProject, otherURLs: newOtherURLs});
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