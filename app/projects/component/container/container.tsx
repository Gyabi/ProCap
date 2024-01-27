// アイテム表示領域を分割するためのコンテナコンポーネント
import React from 'react';

interface ContainerProps {
    containerName: string;
    children?: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({containerName, children}:ContainerProps) => {
    return (
        <div className="flex flex-wrap">
            {children}
        </div>
    );
}

