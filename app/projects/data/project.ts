import { ExplolerPath } from "./explorer_path";
import { GitURL } from "./git_url";
import { OtherURL } from "./other_url";

export type Project = {
    id: string; // UUID as string
    projectName: string; // Project name
    description: string; // Description
    mainPath: ExplolerPath; // Main path
    gitURLs: GitURL[]; // Array of git URLs
    explorerPaths: ExplolerPath[]; // Array of explorer paths
    otherURLs: OtherURL[]; // Array of other URLs
}