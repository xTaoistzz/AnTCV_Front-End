export interface Project {
    idproject: number;
    project_name: string;
    description: string;
    root_path: string;
}

export interface ProjectResponse {
    type: string;
    message: string;
    project: Project[];
}