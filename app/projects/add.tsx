"use client";
import React, { useState } from 'react';
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

import { generateUuid } from "./logic/uuid";


/**
 * 追加画面プロパティ
 */
interface AddProps {
  isOpen: boolean;
  onRequestClose: () => void;
  addProject: (project: Project) => Promise<void>;
}

/**
 * 追加画面コンポーネント
 * @param param0 
 * @returns 
 */
export const Add: React.FC<AddProps> = ({isOpen, onRequestClose, addProject}:AddProps) => {
  const [addingProject, setAddingProject] = useState<Project>({
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
      // データの追加と保存
      await addProject(addingProject);

      // リセット
      setAddingProject({
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
      setAddingProject({...addingProject, gitUrls: gitUrls});
    }

    const updateExplorerPaths = (explorerPaths: ExplorerPath[]) => {
      setAddingProject({...addingProject, explorerPaths: explorerPaths});
    }

    const updateOtherUrls = (otherUrls: OtherURL[]) => {
      setAddingProject({...addingProject, otherUrls: otherUrls});
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
            value={addingProject?.projectName}
            onChange={(e) => {
              setAddingProject({...addingProject, projectName: e.target.value})
            }}
          />
        </div>

        {/* 説明文 */}
        <div className="my-2">
          <MultiRowInput
            title="Description"
            placeholder="Enter description"
            value={addingProject?.description}
            defaultHeight={32}
            onChange={(e) => {
              setAddingProject({...addingProject, description: e.target.value})
            }}
          />
        </div>

        {/* メインパス */}
        <div className="my-2">
          <SingleRowInput
            title="Main Path"
            subtitle="Path"
            placeholder="Enter main path"
            value={addingProject?.mainPath.path}
            onChange={(e) => {
              setAddingProject({...addingProject, mainPath: {id:addingProject.mainPath.id, title:"main", path: e.target.value, description: addingProject.mainPath.description}})
            }}
          />
          <MultiRowInput
            subtitle="Description"
            placeholder="Enter description"
            value={addingProject?.mainPath.description}
            defaultHeight={16}
            onChange={(e) => {
              setAddingProject({...addingProject, mainPath: {id:addingProject.mainPath.id, title:"main", path: addingProject.mainPath.path, description: e.target.value}})
            }}
          />
        </div>

        {/* gitURL */}
        <div className="my-2">
          <GitUrlListEditor
            gitUrls={addingProject.gitUrls}
            updateGitUrls={updateGitUrls}
          />
        </div>

        {/* exploler */}
        <div className="my-2">
          <ExplorerPathListEditor
            explorerPaths={addingProject.explorerPaths}
            updateExplorerPaths={updateExplorerPaths}
          />
        </div>

        {/* other */}
        <div className="my-2">
          <OtherUrlListEditor
            otherUrls={addingProject.otherUrls}
            updateOtherUrls={updateOtherUrls}
          />
        </div>
      </div>
    </CustomModal>
  );
}