import clone from "clone";
import { ProjectModel } from "../models/project.model";

export function unwrapProjectFromData(data: any): ProjectModel {
    return clone(data.project);
}