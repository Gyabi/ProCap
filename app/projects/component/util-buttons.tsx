"use client";
import { openExplorer, copyToClipboard, openTerminal, openVsCode, openBrowser } from "../logic/url_path_utils";
import { FaRegFolderOpen } from "react-icons/fa6";
import { BsBrowserChrome } from "react-icons/bs";
import { TbBrandVscode } from "react-icons/tb";
import { FaRegClipboard } from "react-icons/fa";
import { BsTerminal } from "react-icons/bs";
import React from "react";
import { TimerModal } from "./timer-modal";

import { message } from "@tauri-apps/api/dialog";

interface UtilButtonProps {
    children?: React.ReactNode;
    method: () => void;
}

export const UtilButton: React.FC<UtilButtonProps> = ({ children, method }: UtilButtonProps) => {
    return (
      <div className="flex justify-center items-center bg-gray-200 dark:bg-gray-700 hover:bg-purple-500 rounded-md px-2 py-1 mr-2"
          onClick={method}>
            {children}
        </div>
    )
}


interface ExplorerButtonProps {
    path: string;
    children?: React.ReactNode;
}

export const ExplorerButton: React.FC<ExplorerButtonProps> = ({ path, children }: ExplorerButtonProps) => {
  return (
        <UtilButton method={async ()=>{
          await openExplorer(path).catch((e:string) => {
            // エラーダイアログを表示
            message(e, { title: "error", type: "error" })
        })}}>
            <div className="m-1">
              <FaRegFolderOpen />
            </div>
            {children}
        </UtilButton>
    )
}

interface VsCodeButtonProps {
  path: string;
    children?: React.ReactNode;
}

export const VsCodeButton: React.FC<VsCodeButtonProps> = ({ path, children }: VsCodeButtonProps) => {
    return (
      <UtilButton method={async () => {
        await openVsCode(path).catch((e:string) => {
          // エラーダイアログを表示
          message(e, { title: "error", type: "error" })
        })
      }}>
        <div className="m-1">
          <TbBrandVscode/>
        </div>
        {children}
      </UtilButton>
    )
}

interface TerminalButtonProps {
    path: string;
    children?: React.ReactNode;
}

export const TerminalButton: React.FC<TerminalButtonProps> = ({ path, children }: TerminalButtonProps) => {
    return (
        <UtilButton method={async () => {
          await openTerminal(path).catch((e:string) => {
            // エラーダイアログを表示
            message(e, { title: "error", type: "error" })
          })
        }}>
            <div className="m-1">
              <BsTerminal/>
            </div>
            {children}
        </UtilButton>
      )
}

interface CopyButtonProps {
    path: string;
    children?: React.ReactNode;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ path, children }: CopyButtonProps) => {
    const [isSuccessOpen, setIsSuccessOpen] = React.useState(false);
    return (
      <div>
        <UtilButton method={async () => {
          await copyToClipboard(path).then(() => {
            // 成功ダイアログを表示
            setIsSuccessOpen(true);
          })
        }}>
            <div className="m-1">
              <FaRegClipboard/>
            </div>
            {children}
        </UtilButton>
        <TimerModal
          isOpen={isSuccessOpen}
          onRequestClose={() => setIsSuccessOpen(false)}
          timer={0.8}
          message="copied to clipboard!"
        />
      </div>
    )
}

interface BrowserButtonProps {
    url: string;
    children?: React.ReactNode;
}

export const BrowserButton: React.FC<BrowserButtonProps> = ({ url, children }: BrowserButtonProps) => {
    return (
        <UtilButton method={
          async () => {
            await openBrowser(url).catch((e:string) => {
              // エラーダイアログを表示
              message(e, { title: "error", type: "error" })
            })
          }
        }>
            <div className="m-1">
              <BsBrowserChrome/>  
            </div>
            {children}
        </UtilButton>
    )
}

