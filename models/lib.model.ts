import { ToolType } from '../enums/tool_type.enum';
import { CommentPersonalizedModel } from './comment.model';
import { NamedLinkModel } from './named_link.model';
import { ProjectModel } from './project.model';

export interface LibModel {
    id: number;
    name: string;
    description: string;
    slug: string;
    tags: string[];
    links: NamedLinkModel[];
    weight: string;

    projects: ProjectModel[];
    alternativeFor: LibModel[];
    alternativeBy: LibModel[];
    comments: CommentPersonalizedModel[];

    readme: string;
    toolType: ToolType;
    version: string;
    issuesCount: number;
    downloads: string;
    lastUpdate: string;
    license: string;
}

export interface LibNamedLinkModel {
    libId: number;
    namedLinkId: number;
}