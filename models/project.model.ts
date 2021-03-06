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
    links: NamedLinkModel[];
    comments: CommentPersonalizedModel[];

    issuesCount: number;
    starsCount: number;
    forksCount: number;
    updatedAt: string;
    license: string;
    readme: string;
};

export interface ProjectEditModel {
    main: ProjectModel,
    links: NamedLinkModel[],
    libs: string[];
}