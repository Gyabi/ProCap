"use client";
import React, { useState, useEffect } from 'react';
import { ask } from "@tauri-apps/api/dialog";

import { CancelButton } from "./component/buttons/cancel-button";
import { DoneButton } from "./component/buttons/done-button";
import { SingleRowInput } from "./component/inputs/single-row-input";
import { MultiRowInput } from "./component/inputs/multi-row-input";
import { CustomModal } from "./component/modal/custom-modal";
import { GitUrlListEditor } from "./component/list-editor/git-url-list-editor";
import { ExplorerPathListEditor } from "./component/list-editor/exploler-path-list-editor";
import { OtherUrlListEditor } from "./component/list-editor/other-url-list-editor";

import { Project } from "./data/project";
import { GitURL } from "./data/git_url";
import { ExplorerPath } from "./data/explorer_path";
import { OtherURL } from "./data/other_url";

import { updateProjects } from "./logic/project_curd";

/**
 * プロジェクト編集画面プロパティ
 */
interface EditProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedProject: Project|undefined;
  setSelectedProject: React.Dispatch<React.SetStateAction<Project | undefined>>;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

/**
 * 編集画面
 * @param param0 
 * @returns 
 */
export const Edit: React.FC<EditProps> = ({isOpen, onRequestClose, selectedProject, setSelectedProject, projects, setProjects}:EditProps) => {
  const [editProject, setEditProject] = useState<Project|undefined>(selectedProject);

  // isOpenがtrueに変化したときに、selectedProjectをeditProject複製する
  useEffect(() => {
    if(isOpen === false){
      return;
    }
    setEditProject(JSON.parse(JSON.stringify(selectedProject)))
  }, [isOpen]);

  const onClickEditDone = async () => {
    // editProjectをprojectsとselectedProjectに反映する
    setSelectedProject(JSON.parse(JSON.stringify(editProject)));
    const newProjects = [...projects];
    const index = newProjects.findIndex((project) => project.id === editProject?.id);
    newProjects[index] = editProject as Project;
    setProjects(newProjects);

    // プロジェクトデータを保存する
    await updateProjects(newProjects);

    onRequestClose();
  }

  const onClickEditCancel = () => {
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

  const updateGitUrls = (gitUrls: GitURL[]) => {
    if(editProject === undefined){
      return;
    }
    setEditProject({...editProject, gitUrls: gitUrls});
  }

  const updateExplorerPaths = (explorerPaths: ExplorerPath[]) => {
    if(editProject === undefined){
      return;
    }
    setEditProject({...editProject, explorerPaths: explorerPaths});
  }

  const updateOtherUrls = (otherUrls: OtherURL[]) => {
    if(editProject === undefined){
      return;
    }
    setEditProject({...editProject, otherUrls: otherUrls});
  }

  return (
    <CustomModal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={false}
      onRequestClose={onRequestClose}
      widthPercentage={80}
      heightPercentage={80}
    >
      {/* editProjectがundefinedなら何も表示しない */}
      {editProject !== undefined &&
        <div className="flex flex-col justify-start">
          <div className="flex justify-between">
            {/* タイトル */}
            <h5 className="mb-2 text-2xl decoration-purple-700 underline font-extrabold tracking-tight text-gray-900 dark:text-white">EDIT MODE</h5>
            <div className="flex justify-end">
              {/* キャンセルボタン */}
              <CancelButton onClick={onClickEditCancel} />
              {/* 完了ボタン */}
              <DoneButton onClick={onClickEditDone} />
            </div>
          </div>

          {/* プロジェクト名 */}
          <div className="mb-4">
            <SingleRowInput
              title="Project Name"
              placeholder="Enter project name"
              value={editProject?.projectName}
              onChange={(e) => {
                setEditProject({...editProject, projectName: e.target.value})
              }}
            />
          </div>

          {/* 説明文 */}
          <div className="my-2">
            <MultiRowInput
              title="Description"
              placeholder="Enter description"
              value={editProject?.description}
              defaultHeight={32}
              onChange={(e) => {
                setEditProject({...editProject, description: e.target.value})
              }}
            />
          </div>
      
          {/* メインパス */}
          <div className="mb-2">
              <SingleRowInput
                title="Main Path"
                subtitle="Path"
                placeholder="Enter main path"
                value={editProject?.mainPath.path}
                onChange={(e) => {
                  setEditProject({...editProject, mainPath: {id:editProject.mainPath.id, title:"main", path: e.target.value, description: editProject.mainPath.description}})
                }}
              />
              <MultiRowInput
                subtitle="Description"
                placeholder="Enter description"
                value={editProject?.mainPath.description}
                defaultHeight={32}
                onChange={(e) => {
                  setEditProject({...editProject, mainPath: {id:editProject.mainPath.id, title:"main", path: editProject.mainPath.path, description: e.target.value}})
                }}
              />
          </div>

          {/* gitURL */}
          <div className="my-2">
            <GitUrlListEditor
              gitUrls={editProject.gitUrls}
              updateGitUrls={updateGitUrls}
            />
          </div>
          
          {/* exploler */}
          <div className="my-2">
            <ExplorerPathListEditor
              explorerPaths={editProject.explorerPaths}
              updateExplorerPaths={updateExplorerPaths}
            />
          </div>

          {/* other */}
          <div className="my-2">
            <OtherUrlListEditor
              otherUrls={editProject.otherUrls}
              updateOtherUrls={updateOtherUrls}
            />
          </div>
      </div>
      }
    </CustomModal>
  );
}