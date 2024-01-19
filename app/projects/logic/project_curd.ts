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