import { Project, ProjectContainer } from "../data/project";
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

export const updateProjectContainers = async (projectContainers: ProjectContainer[]):Promise<void> => {
}

export const readProjectContainers = async ():Promise<ProjectContainer[]> => {
    const sampledata:ProjectContainer[] = [
        {
            id: "1",
            containerName: "Sample Container",
            projects: [
                {
                    id: "01",
                    projectName: "Sample Project",
                    description: "This is a sample project.",
                    mainPath: {
                        id: "1",
                        title: "Sample Path",
                        path: "C:\\Users\\user\\Documents\\sample_project",
                        description: "This is a sample path."

                    },
                    gitUrls: [],
                    explorerPaths: [],
                    otherUrls: []
                },
                {
                    id: "2",
                    projectName: "Sample Project 2",
                    description: "This is a sample project 2.",
                    mainPath: {
                        id: "2",
                        title: "Sample Path 2",
                        path: "C:\\Users\\user\\Documents\\sample_project2",
                        description: "This is a sample path 2."
                    },
                    gitUrls: [],
                    explorerPaths: [],
                    otherUrls: []
                }
            ]
        },
        {
            id: "02",
            containerName: "Sample Container 2",
            projects: [
                {
                    id: "3",
                    projectName: "Sample Project 3",
                    description: "This is a sample project 3.",
                    mainPath: {
                        id: "3",
                        title: "Sample Path 3",
                        path: "C:\\Users\\user\\Documents\\sample_project3",
                        description: "This is a sample path 3."
                    },
                    gitUrls: [],
                    explorerPaths: [],
                    otherUrls: []
                },
                {
                    id: "4",
                    projectName: "Sample Project 4",
                    description: "This is a sample project 4.",
                    mainPath: {
                        id: "4",
                        title: "Sample Path 4",
                        path: "C:\\Users\\user\\Documents\\sample_project4",
                        description: "This is a sample path 4."
                    },
                    gitUrls: [],
                    explorerPaths: [],
                    otherUrls: []
                }
            ]
        },
        {
            id: "03",
            containerName: "Sample Container 3",
            projects: [
                {
                    id: "5",
                    projectName: "Sample Project 5",
                    description: "This is a sample project 5.",
                    mainPath: {
                        id: "5",
                        title: "Sample Path 5",
                        path: "C:\\Users\\user\\Documents\\sample_project5",
                        description: "This is a sample path 5."
                    },
                    gitUrls: [],
                    explorerPaths: [],
                    otherUrls: []
                },
                {
                    id: "6",
                    projectName: "Sample Project 6",
                    description: "This is a sample project 6.",
                    mainPath: {
                        id: "6",
                        title: "Sample Path 6",
                        path: "C:\\Users\\user\\Documents\\sample_project6",
                        description: "This is a sample path 6."
                    },
                    gitUrls: [],
                    explorerPaths: [],
                    otherUrls: []
                }
            ]
        }
    ]

    return sampledata;
}