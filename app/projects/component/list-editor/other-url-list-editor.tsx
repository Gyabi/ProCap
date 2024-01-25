"use client";
import { ListEditor, ListData } from "./list-editor";
import { OtherURL } from "../../data/other_url";

interface OtherUrlListEditorProps {
    otherUrls: OtherURL[];
    updateOtherUrls: (otherUrls: OtherURL[]) => void; // データ更新関数
}

export const OtherUrlListEditor = ({otherUrls, updateOtherUrls}: OtherUrlListEditorProps) => {
    return (
        <ListEditor
            mainTitle="other URLs"
            subTitle1="Title"
            placeholder1="Enter title"
            subTitle2="URL"
            placeholder2="Enter URL"
            subTitle3="Description"
            placeholder3="Enter description"

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