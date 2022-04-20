import { ProjectModel } from "../models/project.model";
import { unwrapLibFromData } from "./lib.transform";
import { transformBackendNamedLink } from "./named_link.transform";

export function transformBackendFullProject(data: any) {
    const transformed = {...data} as ProjectModel;

    transformed.libs = transformed.libs.map(l => {
        return unwrapLibFromData(l);
    });

    transformed.links = transformed.links.map(s => {
        return transformBackendNamedLink(s);
    });

    return transformed;
}