import { CustomModal } from "./component/custom-modal";
import React, { useState } from 'react';
import { Project } from "./data/project";
import { ExplorerButton, BrowserButton, CopyButton, TerminalButton, VsCodeButton } from "./component/util-buttons";

import { RiDeleteBinFill } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
interface SelectProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedProject: Project|undefined;
  openEditModal: () => void;
  deleteProject: (id:string) => void;
}

export const Select: React.FC<SelectProps> = ({isOpen, onRequestClose, selectedProject, openEditModal, deleteProject}:SelectProps) => {
  const onClickEdit = () => {
    openEditModal();
    console.log("edit");
    //  TODO: 編集処理
  }
  const onClickDelete = () => {
    deleteProject(selectedProject?.id || "");
    console.log("delete");
    // TODO: 削除処理
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
        <div className="flex flex-col justify-center items-center w-full">
          {/* 各要素が存在するなら表示 */}
          { selectedProject?.gitURLs.map((gitURL, index) => {
            return (
              <div className="my-2" key={index}>
                <BrowserButton url={gitURL.url} >
                  <div className="flex flex-col mx-2">
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
        <div className="flex flex-col justify-center items-center w-full">
          {/* 各要素が存在するなら表示 */}
          { selectedProject?.explorerPaths.map((explorerPath, index) => {
            return (
              <div className="my-2" key={index}>
                <ExplorerButton path={explorerPath.path} >
                  <div className="flex flex-col mx-2">
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
        <div className="flex flex-col justify-center items-center w-full">
          {/* 各要素が存在するなら表示 */}
          { selectedProject?.otherURLs.map((otherURLs, index) => {
            return (
              <div className="my-2" key={index}>
                <BrowserButton url={otherURLs.url} >
                  <div className="flex flex-col mx-2">
                    <div>
                      {otherURLs.url}
                    </div>
                    <div>
                    <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">
                      {otherURLs.description.split('\n').map((line, i) => (
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