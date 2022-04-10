import { apiUrl } from "../cfg";
import { PaginationParams } from "../interfaces/get_many_params";
import { ProjectFilterData } from "../interfaces/project_filter_data";
import { ProjectModel } from "../models/project.model";
import { appendProjectFilterToQuery } from "../utils/append_project_filter_to_query";
import { getGetManyQuery } from "../utils/get_many_query";
import { HeaderBuilder } from "../utils/header_builder";

export class ProjectReq {
    create(data: ProjectModel) {
        return fetch(`${apiUrl}/project`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new HeaderBuilder().json().jwt().headers
        });
    }

    get(id: number) {
        return fetch(`${apiUrl}/project/?id=${id}`, {
            method: 'GET'
        });
    }

    async getMany(params: PaginationParams) {
        const queries = getGetManyQuery(params);
        const resp = await fetch(`${apiUrl}/project/many?${queries}`, {
            method: 'GET'
        });

        if (!resp.ok) {
            console.error('Error while get many project req');
            console.error(resp.statusText);
            return;
        }

        const data = await resp.json() as ProjectModel[];
        return data;
    }

    async getByFilter(params: PaginationParams, tags: string[], libs: string[], name: string) {
        const manyQueries = getGetManyQuery(params);
        const queryBuilder = new URLSearchParams(manyQueries);
        
        appendProjectFilterToQuery({
            libs,
            name,
            tags
        }, queryBuilder);

        const queries = queryBuilder.toString();

        try {
            const resp = await fetch(`${apiUrl}/project/by_filter?${queries}`, {
                method: 'GET'
            });
    
            if (!resp.ok) {
                console.error('Error at get projects by filter req!');
                console.error(resp.statusText);
            }
    
            const data = await resp.json() as ProjectModel[];
            return data;
        } catch(e) {
            console.error('Error at get many projects req!');
            console.error(e);
        }

        return;
    }

    getFullBySlug(slug: string) {
        return fetch(`${apiUrl}/project/full_by_slug?slug=${slug}`, {
            method: 'GET'
        });
    }
    
    edit(data: ProjectModel) {
        return fetch(`${apiUrl}/project`, {
            method: 'PUT',
            headers: new HeaderBuilder().json().jwt().headers,
            body: JSON.stringify(data)
        });
    }

    delete(id: number) {
        return fetch(`${apiUrl}/project?id=${id}`, {
            method: 'DELETE',
            headers: new HeaderBuilder().json().jwt().headers,
        });
    }

    async countAll() {
        try {
            const resp = await fetch(`${apiUrl}/project/count_all`, {
                method: 'GET'
            });

            if (!resp.ok) {
                console.error('Error at count all projects req!');
                console.error(resp.statusText);

                return -1;
            }

            const text = await resp.text();
            const result = parseInt(text);

            return result;
        } catch(e) {
            console.error('Error at count all projects req!');
            console.error(e);

            return -1;
        }
    }

    async countWithFilter(filter: ProjectFilterData) {
        const qb = new URLSearchParams();
        appendProjectFilterToQuery(filter, qb);
        const queries = qb.toString();

        try {
            const resp = await fetch(`${apiUrl}/project/count_with_filter?${queries}`, {
                method: 'GET'
            });
    
            if (!resp.ok) {
                console.error('Error at count projects with filter req!');
                console.error(resp.statusText);

                return -1;
            }

            const text = await resp.text();
            const result = parseInt(text);
            return result;
        } catch(e) {
            console.error('Error at count projects with filter req!');
            console.error(e);

            return -1;
        }
    }
}

export const projReq = new ProjectReq();