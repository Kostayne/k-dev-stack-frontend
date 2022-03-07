import { ProjectModel } from "../models/project.model";
import { transformBackendLib } from "./lib.transform";
import { transformBackendNamedLink } from "./named_link.transform";

export function transformBackendFullProject(data: any) {
    const transformed = {...data} as ProjectModel;

    transformed.libs = transformed.libs.map(l => {
        return transformBackendLib(l);
    });

    transformed.sources = transformed.sources.map(s => {
        return transformBackendNamedLink(s);
    });

    return transformed;
}