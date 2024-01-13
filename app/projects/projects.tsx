"use client";

import { useState } from "react";
import { Select } from "./select";
import { Add } from "./add";
import { Edit } from "./edit";

export default function Projects() {
    enum State {
        DEFAULT,
        SELECT,
        ADD,
        EDIT,
    }

    // 画面状態管理
    const [state, setState] = useState(State.DEFAULT);
    const updateState = (state: State) => {
        setState(state);
    }

    // 選択画面
    const [showSelect, setShowSelect] = useState(false);
    const openSelect = () => {
        setShowSelect(true);
        setShowAdd(false);
        setShowEdit(false);
        updateState(State.SELECT);
    }
    const closeSelect = () => {
        setShowSelect(false);
        updateState(State.DEFAULT);
    }
    
    // 追加画面
    const [showAdd, setShowAdd] = useState(false);
    const openAdd = () => {
        setShowAdd(true);
        setShowSelect(false);
        setShowEdit(false);
        updateState(State.ADD);
    }
    const closeAdd = () => {
        setShowAdd(false);
        updateState(State.DEFAULT);
    }
    
    // 編集画面
    const [showEdit, setShowEdit] = useState(false);
    const openEdit = () => {
        setShowEdit(true);
        setShowSelect(false);
        setShowAdd(false);
        updateState(State.EDIT);
    }
    const closeEdit = () => {
        setShowEdit(false);
        // 編集画面を終了する時には選択画面に遷移する
        openSelect();
    }

    return (
        <div className="flex flex-col justify-start w-full h-full">
            {/* ボタンバー */}
            <div className="flex justify-end">
                {/* 追加ボタン */}
                <button
                    className="bg-purple-500 hover:bg-purple-700 text-black font-bold py-2 px-4 m-2 rounded-full"
                    onClick={() => {
                        openAdd();
                    }}    
                >
                    +
                </button>
            </div>

            {/* メインコンテンツ領域 */}
            <h1>home</h1>

            {/* 選択時画面 */}
            {
                state == State.SELECT &&
                <Select isOpen={showSelect} onRequestClose={closeSelect}/>
            }

            {/* 追加画面 */}
            {
                state == State.ADD &&
                <Add isOpen={showAdd} onRequestClose={closeAdd}/>
            }

            {/* 編集画面 */}
            {
                state == State.EDIT &&
                <Edit isOpen={showEdit} onRequestClose={closeEdit}/>
            }
        </div>
    )
}
