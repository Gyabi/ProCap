"use client";
import { CustomModal } from "./component/modal/custom-modal";
import React, { useState, useEffect } from 'react';
import { Project } from "./data/project";

import { generateUuid } from "./logic/uuid";
import { GitURL } from "./data/git_url";
import { ExplorerPath } from "./data/explorer_path";
import { OtherURL } from "./data/other_url";
import { updateProjects } from "./logic/project_curd";

import { ask } from "@tauri-apps/api/dialog";

import { CancelButton } from "./component/buttons/cancel-button";
import { DoneButton } from "./component/buttons/done-button";
import { SingleRowInput } from "./component/inputs/single-row-input";
import { MultiRowInput } from "./component/inputs/multi-row-input";

import { GitUrlListEditor } from "./component/list-editor/git-url-list-editor";
import { ExplorerPathListEditor } from "./component/list-editor/exploler-path-list-editor";
import { OtherUrlListEditor } from "./component/list-editor/other-url-list-editor";

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

    const updateGitUrls = (gitUrls: GitURL[]) => {
      setAddProject({...addProject, gitUrls: gitUrls});
    }

    const updateExplorerPaths = (explorerPaths: ExplorerPath[]) => {
      setAddProject({...addProject, explorerPaths: explorerPaths});
    }

    const updateOtherUrls = (otherUrls: OtherURL[]) => {
      setAddProject({...addProject, otherUrls: otherUrls});
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
            <CancelButton onClick={onClickAddCancel} />
            {/* 完了ボタン */}
            <DoneButton onClick={onClickAddDone} />
          </div>
        </div>

        {/* プロジェクト名 */}
        <div className="flex flex-col justify-start">
          <SingleRowInput
            title="Project Name"
            placeholder="Enter project name"
            value={addProject?.projectName}
            onChange={(e) => {
              setAddProject({...addProject, projectName: e.target.value})
            }}
          />
        </div>

        {/* 説明文 */}
        <div className="my-2">
          <MultiRowInput
            title="Description"
            placeholder="Enter description"
            value={addProject?.description}
            defaultHeight={32}
            onChange={(e) => {
              setAddProject({...addProject, description: e.target.value})
            }}
          />
        </div>

        {/* メインパス */}
        <div className="my-2">
          <SingleRowInput
            title="Main Path"
            subtitle="Path"
            placeholder="Enter main path"
            value={addProject?.mainPath.path}
            onChange={(e) => {
              setAddProject({...addProject, mainPath: {id:addProject.mainPath.id, title:"main", path: e.target.value, description: addProject.mainPath.description}})
            }}
          />
          <MultiRowInput
            subtitle="Description"
            placeholder="Enter description"
            value={addProject?.mainPath.description}
            defaultHeight={16}
            onChange={(e) => {
              setAddProject({...addProject, mainPath: {id:addProject.mainPath.id, title:"main", path: addProject.mainPath.path, description: e.target.value}})
            }}
          />
        </div>

        {/* gitURL */}
        <div className="my-2">
          <GitUrlListEditor
            gitUrls={addProject.gitUrls}
            updateGitUrls={updateGitUrls}
          />
        </div>

        {/* exploler */}
        <div className="my-2">
          <ExplorerPathListEditor
            explorerPaths={addProject.explorerPaths}
            updateExplorerPaths={updateExplorerPaths}
          />
        </div>

        {/* other */}
        <div className="my-2">
          <OtherUrlListEditor
            otherUrls={addProject.otherUrls}
            updateOtherUrls={updateOtherUrls}
          />
        </div>
      </div>
    </CustomModal>
  );
}