import { CommentPersonalizedModel } from "../models/comment.model";
import { ProjectModel } from "../models/project.model";
import { transformCommentListToNested } from "./comment.transform";
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

    transformed.comments = transformCommentListToNested(transformed.comments) as CommentPersonalizedModel[];
    return transformed;
}