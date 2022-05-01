import { apiUrl } from "../cfg";
import { PaginationParams } from "../interfaces/get_many_params";
import { LibFilterData } from "../interfaces/lib_filter_data";
import { RespInfo } from "../interfaces/resp_info";
import { LibEditModel, LibModel, LibNamedLinkModel } from "../models/lib.model";
import { NamedLinkModel } from "../models/named_link.model";
import { transformBackendFullLib } from "../transform/lib_full.transform";
import { appendArrToQuery } from "../utils/append_arr_to_query";
import { appendLibFilterToQuery } from "../utils/append_lib_filter_to_query";
import { getGetManyQuery } from "../utils/get_many_query";
import { HeaderBuilder } from "../utils/header_builder";

class LibReq {
    async create(mainData: LibModel, links: NamedLinkModel[]): Promise<RespInfo<null>> {
        const dataToSend = {
            main: mainData,
            links
        };

        try {
            const resp = await fetch(`${apiUrl}/lib/`, {
                method: 'POST',
                body: JSON.stringify(dataToSend),
                headers: new HeaderBuilder().json().jwt().headers
            });

            if (!resp.ok) {
                return {
                    error: resp.statusText,
                    resp
                };
            }

            return {
                data: null
            };
        }

        catch(e) {
            console.error(e);

            return {
                error: e as string,
            };
        }
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

    async getMany(params: PaginationParams): Promise<[LibModel[], boolean?]> {
        try {
            const queries = getGetManyQuery(params);

            const resp = await fetch(`${apiUrl}/lib/many?${queries}`, {
                method: 'GET'
            });

            if (!resp.ok) {
                console.error('Error when getMany libs req');
                console.error(resp.statusText);

                return [[], true];
            }

            const res = await resp.json() as LibModel[];
            return [res];
        } catch(e) {
            console.error(e);
            console.error('Error when load get many libs');

            return [[], true];
        }
    }

    getByFilter = async (params: PaginationParams, tags: string[], name: string): Promise<[LibModel[], boolean?]> => {
        const manyQueries = getGetManyQuery(params);
        const queryBuilder = new URLSearchParams(manyQueries);
        
        appendArrToQuery(queryBuilder, 'tags', tags);

        if (name) {
            queryBuilder.append('name', name);
        }

        const queries = queryBuilder.toString();

        try {
            const resp = await fetch(`${apiUrl}/lib/by_filter?${queries}`, {
                method: 'GET'
            });

            if (!resp.ok) {
                console.error('Error when sending getByFilter libs req');
                return [[], true];
            }

            const libs = await resp.json() as LibModel[];
            return [libs, false];
        } catch(e) {
            console.error(e);
            console.error('Error when sending getByFilter libs req');

            return[[], true];
        }
    }

    edit = async (data: LibEditModel): Promise<RespInfo<LibModel>> => {
        try {
            const resp = await fetch(`${apiUrl}/lib`, {
                method: 'PUT',
                headers: new HeaderBuilder().json().jwt().headers,
                body: JSON.stringify(data)
            });

            if (!resp.ok) {
                return {
                    resp,
                    error: resp.statusText
                };
            }

            const respData = await resp.json() as LibModel;

            return {
                resp,
                data: respData
            };
        } catch(e) {
            console.error(e);

            return {
                error: e as string
            };
        }
    }

    async delete(id: number): Promise<RespInfo<null>> {
        try {
            const resp = await fetch(`${apiUrl}/lib/?id=${id}`, {
                method: 'DELETE',
                headers: new HeaderBuilder().json().jwt().headers,
            });

            if (!resp.ok) {
                console.error(resp.statusText);

                return {
                    resp,
                    error: resp.statusText
                };
            }

            return {
                resp
            };
        } catch(e) {
            console.error(e);

            return {
                error: e as string
            };
        }
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

    getManyLinks(params: PaginationParams) {
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

    async countAll() {
        try {
            const resp = await fetch(`${apiUrl}/lib/count_all`, {
                method: 'GET'
            });

            if (!resp.ok) {
                console.error('Error while count all libs req');
                console.error(resp.statusText);

                return -1;
            }

            const text = await resp.text();
            const res = parseInt(text);
            return res;
        } catch(e) {
            console.error(e);
            console.error('Error while count all libs req');
            return -1;
        }
    }

    async countWithFilter(f: LibFilterData) {
        try {
            const q = new URLSearchParams();
            appendLibFilterToQuery(f, q);

            const resp = await fetch(`${apiUrl}/lib/count_with_filter?${q.toString()}`, {
                method: 'GET'
            });

            if (!resp.ok) {
                console.error('Error while count all libs req');
                console.error(resp.statusText);

                return -1;
            }

            const text = await resp.text();
            const res = parseInt(text);
            return res;
        } catch(e) {
            console.error(e);
            console.error('Error while count all libs req');
            return -1;
        }
    }

    // alternatives
    connectAlternativeBySlug = async (tg: string, to: string): Promise<RespInfo<null>> => {
        const qb = new URLSearchParams();
        qb.append('target', tg);
        qb.append('to', to);

        try {
            const resp = await fetch(`${apiUrl}/lib/connect_alternative_by_slug?` + qb.toString(), {
                method: 'POST',
                headers: new HeaderBuilder().jwt().headers
            });

            if (!resp.ok) {
                console.error(resp.statusText);

                return {
                    error: resp.statusText,
                    resp
                };
            }

            return {
                resp
            };
        } catch(e) {
            console.error(e);

            return {
                error: e as string
            };
        }
    }
}

export const libReq = new LibReq();