"use client";
import { ListEditor, ListData } from "./list-editor";
import { GitURL } from "../../data/git_url";

interface GitUrlListEditorProps {
    gitUrls: GitURL[];
    updateGitUrls: (gitUrl: GitURL[]) => void; // データ更新関数
}

export const GitUrlListEditor = ({gitUrls, updateGitUrls}: GitUrlListEditorProps) => {
    return (
        <ListEditor
            mainTitle="git URLs"
            subTitle1="Title"
            placeholder1="Enter title"
            subTitle2="URL"
            placeholder2="Enter URL"
            subTitle3="Description"
            placeholder3="Enter description"

            datas={gitUrls.map((gitUrl) => {
                return {
                    id: gitUrl.id,
                    title: gitUrl.title,
                    value: gitUrl.url,
                    discription: gitUrl.description,
                }
            })}
            updateData={(datas:ListData[]) => {
                // ListDataをgitUrlsに変換して伝搬
                updateGitUrls(datas.map((data) => {
                    return {
                        id: data.id,
                        title: data.title,
                        url: data.value,
                        description: data.discription,
                    }
                }))
            }}
        />
    );
};