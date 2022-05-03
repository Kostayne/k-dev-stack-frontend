import { apiUrl } from "../cfg";
import { PaginationParams } from "../interfaces/get_many_params";
import { ProjectFilterData } from "../interfaces/project_filter_data";
import { RespInfo } from "../interfaces/resp_info";
import { NamedLinkModel } from "../models/named_link.model";
import { ProjectEditModel, ProjectModel } from "../models/project.model";
import { appendProjectFilterToQuery } from "../utils/append_project_filter_to_query";
import { getGetManyQuery } from "../utils/get_many_query";
import { HeaderBuilder } from "../utils/header_builder";

export class ProjectReq {
    create = async (mainData: ProjectModel, links: NamedLinkModel[]): Promise<RespInfo<ProjectModel>> => {
        try {
            const resp = await fetch(`${apiUrl}/project`, {
                method: 'POST',
                body: JSON.stringify({
                    main: mainData,
                    links
                }),
                headers: new HeaderBuilder().json().jwt().headers
            });

            if (!resp.ok) {
                console.error(resp.statusText);

                return {
                    resp,
                    error: resp.statusText
                };
            }

            const rawProj = await resp.json() as ProjectModel;

            return {
                data: rawProj,
                resp
            };
        } catch(e) {
            console.error(e);

            return {
                error: e as string
            };
        }
    }

    get(id: number) {
        return fetch(`${apiUrl}/project/?id=${id}`, {
            method: 'GET'
        });
    }

    async getMany(params: PaginationParams): Promise<[ProjectModel[], boolean?]> {
        try {
            const queries = getGetManyQuery(params);
            const resp = await fetch(`${apiUrl}/project/many?${queries}`, {
                method: 'GET'
            });

            if (!resp.ok) {
                console.error('Error while get many project req');
                console.error(resp.statusText);
                return [[], true];
            }

            const data = await resp.json() as ProjectModel[];
            return [data];
        } catch(e) {
            console.error('Error while getManyProjects request');
            console.error(e);

            return [[], true];
        }
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
            
            return [];
        }
    }

    getFullBySlug(slug: string) {
        return fetch(`${apiUrl}/project/full_by_slug?slug=${slug}`, {
            method: 'GET'
        });
    }
    
    async edit(data: ProjectEditModel): Promise<RespInfo<ProjectModel>> {
        try {
            const resp = await fetch(`${apiUrl}/project`, {
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

            const resData = await resp.json();

            return {
                data: resData,
                resp
            };
        } catch(e) {
            console.error(e);

            return {
                error: e as string
            };
        }
    }

    async delete(id: number): Promise<RespInfo<ProjectModel>> {
        try {
            const resp = await fetch(`${apiUrl}/project?id=${id}`, {
                method: 'DELETE',
                headers: new HeaderBuilder().jwt().headers,
            });

            if (!resp.ok) {
                console.error(resp.statusText);

                return {
                    error: resp.statusText,
                    resp
                };
            }

            const data = await resp.json();

            return {
                resp,
                data
            };
        } catch(e) {
            console.error(e);

            return {
                error: e as string
            };
        }
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