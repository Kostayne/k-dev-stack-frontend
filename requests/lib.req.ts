import { apiUrl } from "../cfg";
import { GetManyParamsModel } from "../models/get_many_params.model";
import { LibModel, LibNamedLinkModel } from "../models/lib.model";
import { getGetManyQuery } from "../utils/get_many_query";
import { HeaderBuilder } from "../utils/header_builder";

class LibReq {
    create(data: LibModel) {
        return fetch(`${apiUrl}/lib/`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new HeaderBuilder().json().headers
        });
    }

    get(id: number) {
        return fetch(`${apiUrl}/lib/?id=${id}`, {
            method: 'GET'
        });
    }

    getFull(id: number) {
        return fetch(`${apiUrl}/lib/full?id=${id}`, {
            method: 'GET'
        });
    }

    getMany(params: GetManyParamsModel) {
        const queries = getGetManyQuery(params);
        return fetch(`${apiUrl}/lib/many?${queries}`, {
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
        return fetch(`${apiUrl}/lib/link?id=${id}`, {
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

    getManyLinks(params: GetManyParamsModel) {
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