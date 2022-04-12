import { LibFilterData } from "../interfaces/lib_filter_data";

export function appendLibFilterToQuery(f: LibFilterData, q: URLSearchParams) {
    const { tags,  name } = f;

    tags.forEach(t => {
        q.append('tags', t);
    });

    if (name) {
        q.append('name', name);
    }
}