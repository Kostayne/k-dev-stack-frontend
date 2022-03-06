import { ProjectModel } from "../models/project.model";

export function transformBackendProject(data: any): ProjectModel {
    return data.project;
}