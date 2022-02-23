import { CommentModel } from "./comment.model";
import { NamedLinkModel } from "./named_link";

export interface ProjectModel {
    name: string;
    description: string;
    libs: NamedLinkModel[];
    sources: NamedLinkModel[];
    comments: CommentModel[];
    slug: string;
};