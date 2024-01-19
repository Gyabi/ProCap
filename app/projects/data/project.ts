import { ExplorerPath } from "./explorer_path";
import { GitURL } from "./git_url";
import { OtherURL } from "./other_url";

export type Project = {
    id: string; // UUID as string
    projectName: string; // Project name
    description: string; // Description
    mainPath: ExplorerPath; // Main path
    gitUrls: GitURL[]; // Array of git URLs
    explorerPaths: ExplorerPath[]; // Array of explorer paths
    otherUrls: OtherURL[]; // Array of other URLs
}