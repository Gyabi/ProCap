import { invoke } from "@tauri-apps/api/tauri";

/**
 * エクスプローラを開く
 * @param path 
 * @returns 実行結果エラーログ
 */
export const openExplorer = async (path: string): Promise<string> => {
    return await invoke("open_explorer", { path: path });
}

/**
 * VSCodeを開く
 * @param path
 * @returns 実行結果エラーログ
 *  
 */
export const openVsCode = async (path: string): Promise<string> => {
    return await invoke("open_vscode", { path: path });
}

/**
 * ターミナルを開く
 * @param path 
 * @returns 実行結果エラーログ
 */
export const openTerminal = async (path: string): Promise<string> => {
    return await invoke("open_terminal", { path: path });
}

/**
 * クリップボードへコピー
 * @param path 
 * @returns 実行結果エラーログ
 */
export const copyToClipboard = async (text: string): Promise<string> => {
    return await invoke("copy_to_clipboard", { text: text });
}

/**
 * ブラウザを開く
 * @param path 
 * @returns 実行結果エラーログ
 */
export const openBrowser = async (url: string): Promise<string> => {
    return await invoke("open_browser", { url: url });
}