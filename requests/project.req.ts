import { apiUrl } from "../cfg";
import { PaginationParams } from "../models/get_many_params";
import { ProjectModel } from "../models/project.model";
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
        
        tags.forEach(t => {
            queryBuilder.append('tags', t);
        });

        libs.forEach(l => {
            queryBuilder.append('libs', l);
        });

        if (name) {
            queryBuilder.append('name', name);
        }

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
}

export const projReq = new ProjectReq();