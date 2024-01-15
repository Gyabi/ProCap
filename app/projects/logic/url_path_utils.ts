export const openExplorer = (path: string) => {
    // ディレクトリのパスになっているか確認
    if (!path.endsWith('/')) {
        // エラー発行
        throw new Error('Path is not directory path.');
    }
    
    // TODO: open explorer
};

export const openVsCode = (path: string) => {
    // ディレクトリのパスになっているか確認
    if (!path.endsWith('/')) {
        // エラー発行
        throw new Error('Path is not directory path.');
    }
    
    // TODO: open vscode
};

export const openTerminal = (path: string) => {
    // ディレクトリのパスになっているか確認
    if (!path.endsWith('/')) {
        // エラー発行
        throw new Error('Path is not directory path.');
    }

    // TODO: open
}


export const copyToClipboard = (text: string) => {
    // TODO: copy to clipboard
}

export const openBrowser = (url: string) => {
    
    // TODO: open browser
}
