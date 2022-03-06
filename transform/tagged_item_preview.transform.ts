import { TaggedItemPreviewProps } from "../components/tagged-item-preview";
import { LibModel } from "../models/lib.model";
import { ProjectModel } from "../models/project.model";

export function transformLibToTaggedItemPreview(lib: LibModel): TaggedItemPreviewProps {
    return {
        name: lib.name,
        description: lib.description,
        href: `/libs/${lib.slug}`,
        tags: lib.tags
    };
}

export function transformProjectToTaggedItemPreview(proj: ProjectModel): TaggedItemPreviewProps {
    return {
        name: proj.name,
        description: proj.description,
        href: `/projects/${proj.slug}`,
        tags: proj.tags
    };
}