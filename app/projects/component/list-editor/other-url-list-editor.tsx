"use client";
import { ListEditor, ListData } from "./list-editor";
import { OtherURL } from "../../data/other_url";

interface OtherUrlListEditorProps {
    otherUrls: OtherURL[];
    updateOtherUrls: (otherUrls: OtherURL[]) => void; // データ更新関数
    sortabled?: boolean;
}

export const OtherUrlListEditor = ({otherUrls, updateOtherUrls, sortabled}: OtherUrlListEditorProps) => {
    return (
        <ListEditor
            mainTitle="other URLs"
            subTitle1="Title"
            placeholder1="Enter title"
            subTitle2="URL"
            placeholder2="Enter URL"
            subTitle3="Description"
            placeholder3="Enter description"

            sortabled={sortabled}

            datas={otherUrls.map((otherUrl) => {
                return {
                    id: otherUrl.id,
                    title: otherUrl.title,
                    value: otherUrl.url,
                    discription: otherUrl.description,
                }
            })}
            updateData={(datas:ListData[]) => {
                // ListDataをotherUrlsに変換して伝搬
                updateOtherUrls(datas.map((data) => {
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