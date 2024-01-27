"use client";
import { CustomModal } from "./component/modal/custom-modal";
import React, { useEffect, useState } from 'react';
import { Project } from "./data/project";
import { ExplorerButton, BrowserButton, CopyButton, TerminalButton, VsCodeButton } from "./component/buttons/util-buttons";

import { RiDeleteBinFill } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";

import { ask } from "@tauri-apps/api/dialog";
/**
 * 選択画面のProps
 */
interface SelectProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedProject: Project|undefined;
  setSelectedProject: React.Dispatch<React.SetStateAction<Project | undefined>>;
  deleteProject: (id: string) => Promise<void>;
  openEditModal: () => void;
}

/**
 * 選択画面コンポーネント
 * @param param0 
 * @returns 
 */
export const Select: React.FC<SelectProps> = ({isOpen, onRequestClose, selectedProject, setSelectedProject, deleteProject, openEditModal}:SelectProps) => {
  useEffect(() => {
  }, [selectedProject]);
  
  const onClickEdit = () => {
    openEditModal();
  }
  const onClickDelete = async () => {
    if (selectedProject === undefined) {
      return;
    }

    // 確認ダイアログ
    await ask("本当に削除しますか？",{
      title: "",
      type: "warning",
      okLabel: "OK",
      cancelLabel: "Cancel",
    }).then(async (result) => {
      if(result){
        // データの削除と保存を実行
        await deleteProject(selectedProject.id);

        setSelectedProject(undefined);

        onRequestClose();
      };
    });
  }

  return (
    <CustomModal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={true}
      onRequestClose={onRequestClose}
      widthPercentage={80}
      heightPercentage={80}
    >
      <div className="flex flex-col justify-start">
        <div className="flex justify-between">
          {/* タイトル */}
          <h5 className="mb-2 text-2xl decoration-purple-700 underline font-extrabold tracking-tight text-gray-900 dark:text-white">{selectedProject?.projectName}</h5>
          <div className="flex justify-end">
            {/* 削除ボタン */}
            <div className="flex justify-center items-center bg-red-500 dark:bg-red-700 rounded-md px-2 py-2 mr-2"
              onClick={onClickDelete}>
                <div className="m-1">
                  <RiDeleteBinFill /> 
                </div>
            </div>

            {/* 編集ボタン */}
            <div className="flex justify-center items-center bg-gray-200 dark:bg-gray-700 hover:bg-purple-500 rounded-md px-2 py-2 mr-2"
              onClick={onClickEdit}>
                <div className="m-1">
                  <CiEdit />
                </div>
            </div>
          </div>
        </div>
        {/* 説明文 */}
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {selectedProject?.description.split('\n').map((line, i) => (
              <span key={i}>
                    {line}
                    <br />
                </span>
            ))}
        </p>
        
        {/* メインボタン */}
        <div className="flex justify-start">
          {/* 各要素が存在するなら表示 */}
          { selectedProject?.mainPath.path !== "" &&
            <div className="flex justify-start">
              <ExplorerButton path={selectedProject?.mainPath.path || ""} />
              <VsCodeButton path={selectedProject?.mainPath.path || ""}></VsCodeButton>
              <TerminalButton path={selectedProject?.mainPath.path || ""}></TerminalButton>
              <CopyButton path={selectedProject?.mainPath.path || ""}></CopyButton>
            </div>
          }
        </div>

        {/* gitURL */}
        <h5 className="my-2 text-xl font-extrabold tracking-tight text-gray-900 dark:text-white decoration-purple-700 underline">git URLs</h5>
        <div className="flex flex-col justify-start items-start w-full">
          {/* 各要素が存在するなら表示 */}
          { selectedProject?.gitUrls.map((gitURL, index) => {
            return (
              <div className="my-2" key={index}>
                <BrowserButton url={gitURL.url} >
                  <div className="flex flex-col mx-2">
                    <div className="font-bold">
                      {gitURL.title}
                    </div>
                    <div>
                      {gitURL.url}
                    </div>
                    <div>
                      <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">
                        {gitURL.description.split('\n').map((line, i) => (
                          <span key={i}>
                            {line}
                            <br />
                          </span>
                        ))}
                      </p>
                   </div>
                  </div>
                </BrowserButton>
              </div>
            );
          })}
        </div>

        {/* exploler */}
        <h5 className="my-2 text-xl font-extrabold tracking-tight text-gray-900 dark:text-white decoration-purple-700 underline">explorer</h5>
        <div className="flex flex-col justify-start items-start w-full">
          {/* 各要素が存在するなら表示 */}
          { selectedProject?.explorerPaths.map((explorerPath, index) => {
            return (
              <div className="my-2" key={index}>
                <ExplorerButton path={explorerPath.path} >
                  <div className="flex flex-col mx-2">
                    <div className="font-bold">
                      {explorerPath.title}
                    </div>
                    <div>
                      {explorerPath.path}
                    </div>
                    <div>
                    <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">
                      {explorerPath.description.split('\n').map((line, i) => (
                        <span key={i}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </p>
                   </div>
                  </div>
                </ExplorerButton>
              </div>
            );
          })}
        </div>

        {/* other */}
        <h5 className="my-2 text-xl font-extrabold tracking-tight text-gray-900 dark:text-white decoration-purple-700 underline">other</h5>
        <div className="flex flex-col justify-start items-start w-full">
          {/* 各要素が存在するなら表示 */}
          { selectedProject?.otherUrls.map((otherUrls, index) => {
            return (
              <div className="my-2" key={index}>
                <BrowserButton url={otherUrls.url} >
                  <div className="flex flex-col mx-2">
                    <div className="font-bold">
                      {otherUrls.title}
                    </div>
                    <div>
                      {otherUrls.url}
                    </div>
                    <div>
                    <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">
                      {otherUrls.description.split('\n').map((line, i) => (
                        <span key={i}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </p>
                   </div>
                  </div>
                </BrowserButton>
              </div>
            );
          })}
        </div>
      </div>
    </CustomModal>
  );
}