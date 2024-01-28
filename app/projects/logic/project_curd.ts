import { Project, ProjectContainer } from "../data/project";
import { invoke } from "@tauri-apps/api/tauri";
import { message } from "@tauri-apps/api/dialog";

export const updateProjectContainers = async (projectContainers: Record<string, Project[]>):Promise<void> => {
    const saveDatas: ProjectContainer[] = Object.entries(projectContainers).map(([name, projects]) => {
        return {name: name, projects: projects};
    });

    await invoke("save_project_containers_command", {projects:saveDatas}).then((res) => {
        return;
    }).catch((err) => {
        // messageを出力
        message("Error", err.toString());
        throw err; // Throw the error to propagate it
    });
}

export const readProjectContainers = async ():Promise<Record<string, Project[]>> => {
    return await invoke("load_project_containers_command").then((res) => {
        const projectContainers: ProjectContainer[] = JSON.parse(JSON.stringify(res));
        const result: Record<string, Project[]> = {};
        projectContainers.forEach((projectContainer) => {
            result[projectContainer.name] = projectContainer.projects;
        });
        return result;
    }).catch((err) => {
        // messageを出力
        message("Error", err.toString());
        throw err; // Throw the error to propagate it
    });
}