import { apiUrl } from "../cfg";
import { GetManyParams } from "../models/get_many_params";
import { LibModel, LibNamedLinkModel } from "../models/lib.model";
import { getGetManyQuery } from "../utils/get_many_query";
import { HeaderBuilder } from "../utils/header_builder";

class LibReq {
    create(data: LibModel) {
        return fetch(`${apiUrl}/lib/`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new HeaderBuilder().json().jwt().headers
        });
    }

    get(id: number) {
        return fetch(`${apiUrl}/lib/?id=${id}`, {
            method: 'GET'
        });
    }

    getFullBySlug(slug: string) {
        return fetch(`${apiUrl}/lib/full_by_slug?slug=${slug}`, {
            method: 'GET'
        });
    }

    getMany(params: GetManyParams) {
        const queries = getGetManyQuery(params);
        return fetch(`${apiUrl}/lib/many?${queries}`, {
            method: 'GET'
        });
    }

    getByFilter(params: GetManyParams, tags: string[], name: string) {
        const manyQueries = getGetManyQuery(params);
        const queryBuilder = new URLSearchParams(manyQueries);
        
        tags.forEach(t => {
            queryBuilder.append('tags', t);
        });

        if (name) {
            queryBuilder.append('name', name);
        }

        const queries = queryBuilder.toString();

        return fetch(`${apiUrl}/lib/by_filter?${queries}`, {
            method: 'GET'
        });
    }

    edit(data: LibModel) {
        return fetch(`${apiUrl}/lib`, {
            method: 'PUT',
            headers: new HeaderBuilder().json().jwt().headers,
            body: JSON.stringify(data)
        });
    }

    delete(id: number) {
        return fetch(`${apiUrl}/lib/?id=${id}`, {
            method: 'DELETE',
            headers: new HeaderBuilder().json().jwt().headers,
        });
    }

    // link
    createLink(data: LibNamedLinkModel) {
        return fetch(`${apiUrl}/lib/link`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new HeaderBuilder().json().headers
        });
    }

    getLink(libId: number, namedLinkId: number) {
        return fetch(`${apiUrl}/lib/link?libId=${libId}&namedLinkId=${namedLinkId}`, {
            method: 'GET',
        });
    }

    getManyLinks(params: GetManyParams) {
        const queries = getGetManyQuery(params);
        return fetch(`${apiUrl}/lib/many_links?${queries}`, {
            method: 'GET'
        });
    }

    editLink(data: LibModel) {
        return fetch(`${apiUrl}/lib/link`, {
            method: 'PUT',
            headers: new HeaderBuilder().json().jwt().headers,
            body: JSON.stringify(data)
        });
    }

    deleteLink(libId: number, namedLinkId: number) {
        return fetch(`${apiUrl}/lib/link?libId=${libId}&namedLinkId=${namedLinkId}`, {
            method: 'DELETE',
            headers: new HeaderBuilder().json().jwt().headers,
        });
    }
}

export const libReq = new LibReq();