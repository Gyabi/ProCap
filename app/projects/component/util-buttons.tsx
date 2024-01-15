import { openExplorer, copyToClipboard, openTerminal, openVsCode, openBrowser } from "../logic/url_path_utils";
import { FaRegFolderOpen } from "react-icons/fa6";
import { BsBrowserChrome } from "react-icons/bs";
import { TbBrandVscode } from "react-icons/tb";
import { FaRegClipboard } from "react-icons/fa";
import { BsTerminal } from "react-icons/bs";
import React from "react";

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
    // エクスプローラを用いて開く処理
  const openProjectByExplorer = () => {
    try {
      openExplorer(path);
      console.log(path);
    } catch (e) {
      console.log(e);
    }
  }

    return (
        <UtilButton method={openProjectByExplorer}>
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
  // vscodeを用いて開く処理
  const openProjectByVsCode = () => {
    try {
      openVsCode(path);
    } catch (e) {
      console.log(e);
    }
  }

    return (
      <UtilButton method={openProjectByVsCode}>
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
    // ターミナルで開く処理
  const openProjectByTerminal = () => {
    try {
      openTerminal(path);
    } catch (e) {
      console.log(e);
    }
  }

    return (
        <UtilButton method={openProjectByTerminal}>
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
    // パスをコピーする処理
  const copyProjectPath = () => {
    try {
      copyToClipboard(path);
    } catch (e) {
      console.log(e);
    }
  }

    return (
        <UtilButton method={copyProjectPath}>
            <div className="m-1">
              <FaRegClipboard/>
            </div>
            {children}
        </UtilButton>
    )
}

interface BrowserButtonProps {
    url: string;
    children?: React.ReactNode;
}

export const BrowserButton: React.FC<BrowserButtonProps> = ({ url, children }: BrowserButtonProps) => {
    // パスをコピーする処理
  const openBrowserByPath = () => {
    try {
      openBrowser(url);
    } catch (e) {
      console.log(e);
    }
  }

    return (
        <UtilButton method={openBrowserByPath}>
            <div className="m-1">
              <BsBrowserChrome/>  
            </div>
            {children}
        </UtilButton>
    )
}

