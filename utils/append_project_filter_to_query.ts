import { ProjectFilterData } from "../interfaces/project_filter_data";

export function appendProjectFilterToQuery(filter: ProjectFilterData, queries: URLSearchParams) {
    const { tags, libs, name } = filter;

    tags.forEach(t => {
        queries.append('tags', t);
    });

    libs.forEach(l => {
        queries.append('libs', l);
    });

    if (name) {
        queries.append('name', name);
    }
}