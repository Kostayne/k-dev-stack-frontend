import { apiUrl } from "../cfg";
import { GetManyParamsModel } from "../models/get_many_params.model";
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

    getMany(params: GetManyParamsModel) {
        const queries = getGetManyQuery(params);
        return fetch(`${apiUrl}/project/many?${queries}`, {
            method: 'GET'
        });
    }

    getByFilter(params: GetManyParamsModel, tags: string[], name: string) {
        const manyQueries = getGetManyQuery(params);
        const queryBuilder = new URLSearchParams(manyQueries);
        
        tags.forEach(t => {
            queryBuilder.append('tags', t);
        });

        if (name) {
            queryBuilder.append('name', name);
        }

        const queries = queryBuilder.toString();

        return fetch(`${apiUrl}/project/by_filter?${queries}`, {
            method: 'GET'
        });
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