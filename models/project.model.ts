import { CommentPersonalizedModel } from "./comment.model";
import { LibModel } from "./lib.model";
import { NamedLinkModel } from "./named_link.model";

export interface ProjectModel {
    id: number;
    slug: string;
    name: string;
    tags: string[];
    description: string;
    libs: LibModel[];
    sources: NamedLinkModel[];
    comments: CommentPersonalizedModel[];
    // TODO remove commets, since they loading async
};