import { Project } from "../data/project";
import { invoke } from "@tauri-apps/api/tauri";
import { message } from "@tauri-apps/api/dialog";

export const updateProjects = async (projects: Project[]):Promise<void> => {
    await invoke("save_projects_command", {projects:projects}).then((res) => {
        return;
    }).catch((err) => {
        // messageを出力
        message("Error", err.toString());
        throw err; // Throw the error to propagate it
    });
}

export const readProjects = async ():Promise<Project[]> => {
    return await invoke("load_projects_command").then((res) => {
        const projects: Project[] = JSON.parse(JSON.stringify(res));
        return projects;
    }).catch((err) => {
        // messageを出力
        message("Error", err.toString());
        throw err; // Throw the error to propagate it
    });
}

export const updateProjectContainers = async (projectContainers: Record<string, Project[]>):Promise<void> => {
    console.log("save_project_containers_command");
}

export const readProjectContainers = async ():Promise<Record<string, Project[]>> => {
    const sampledata: Record<string, Project[]> = {
        "container1":[
            {
                id: "project1",
                projectName: "プロジェクト1",
                description: "プロジェクト1の説明",
                mainPath:{
                    id: "mainPath1",
                    path: "C:\\Users\\user\\Documents\\project1",
                    title: "メインパス1",
                    description: "メインパス1の説明"
                },
                explorerPaths:[],
                gitUrls:[],
                otherUrls:[]
            },
            {
                id: "project2",
                projectName: "プロジェクト2",
                description: "プロジェクト2の説明",
                mainPath:{
                    id: "mainPath2",
                    path: "C:\\Users\\user\\Documents\\project2",
                    title: "メインパス2",
                    description: "メインパス2の説明"
                },
                explorerPaths:[],
                gitUrls:[],
                otherUrls:[]
            },
            {
                id: "project3",
                projectName: "プロジェクト3",
                description: "プロジェクト3の説明",
                mainPath:{
                    id: "mainPath3",
                    path: "C:\\Users\\user\\Documents\\project3",
                    title: "メインパス3",
                    description: "メインパス3の説明"
                },
                explorerPaths:[],
                gitUrls:[],
                otherUrls:[]
            }
        ],
        "container2":[
            {
                id: "project4",
                projectName: "プロジェクト4",
                description: "プロジェクト4の説明",
                mainPath:{
                    id: "mainPath4",
                    path: "C:\\Users\\user\\Documents\\project4",
                    title: "メインパス4",
                    description: "メインパス4の説明"
                },
                explorerPaths:[],
                gitUrls:[],
                otherUrls:[]
            },
            {
                id: "project5",
                projectName: "プロジェクト5",
                description: "プロジェクト5の説明",
                mainPath:{
                    id: "mainPath5",
                    path: "C:\\Users\\user\\Documents\\project5",
                    title: "メインパス5",
                    description: "メインパス5の説明"
                },
                explorerPaths:[],
                gitUrls:[],
                otherUrls:[]
            },
            {
                id: "project6",
                projectName: "プロジェクト6",
                description: "プロジェクト6の説明",
                mainPath:{
                    id: "mainPath6",
                    path: "C:\\Users\\user\\Documents\\project6",
                    title: "メインパス6",
                    description: "メインパス6の説明"
                },
                explorerPaths:[],
                gitUrls:[],
                otherUrls:[]
            }
        ]
    };
    return sampledata;
}