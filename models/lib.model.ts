import { CommentPersonalizedModel } from './comment.model';
import { NamedLinkModel } from './named_link.model';
import { ProjectModel } from './project.model';

export interface LibModel {
    id: number;
    name: string;
    description: string;
    slug: string;
    tags: string[];
    downloads: NamedLinkModel[];
    codeExample: string;
    codeLang: string;
    weight: string;
    projects: ProjectModel[];
    alternativeFor: LibModel[];
    alternativeBy: LibModel[];
    comments: CommentPersonalizedModel[];
    readme?: string;
}

export interface LibNamedLinkModel {
    libId: number;
    namedLinkId: number;
}