import { apiUrl } from "../cfg";
import { CommentLikeResultModel, CommentModel, CreateCommentModel } from "../models/comment.model";
import { GetManyParams } from "../models/get_many_params";
import { transformCommentToPersonalized } from "../transform/comment.transform";
import { getGetManyQuery } from "../utils/get_many_query";
import { HeaderBuilder } from "../utils/header_builder";

class CommentReq {
    async create(data: CreateCommentModel) {
        try {
            const body = {
                ...data
            };

            if (!body.libId) {
                delete body.libId;
            }

            if (!body.projectId) {
                delete body.projectId;
            }

            const resp = await fetch(`${apiUrl}/comment`, {
                method: 'POST',
                headers: new HeaderBuilder().json().jwt().headers,
                body: JSON.stringify(body)
            });

            if (!resp.ok) {
                console.error('Error in create comment req');
                console.error(resp.statusText);
                return;
            }

            const respComment = await resp.json() as CommentModel;
            return respComment;
        } catch(e) {
            console.error('Error in create comment req');
            console.error(e);
        }
    }

    async like(id: number) {
        try {
            const resp = await fetch(`${apiUrl}/comment/like?id=${id}`, {
                method: 'GET',
                headers: new HeaderBuilder().jwt().headers
            });
    
            if (!resp.ok) {
                console.error('Error in like comment req');
                console.error(resp.statusText); 
                return;
            }

            const likeResult = await resp.json() as CommentLikeResultModel;
            return likeResult;
        } catch(e) {
            console.error('Error in like comment req');
            console.error(e);
        }
    }

    async filterLikedByUser(ids: number[]) {
        const queries = new URLSearchParams();

        ids.map(id => {
            queries.append('ids[]', id.toString());
        });

        const queriesStr = queries.toString();

        try {
            const resp = await fetch(`${apiUrl}/comment/filter_liked_by_user?${queriesStr}`, {
                method: 'GET',
                headers: new HeaderBuilder().jwt().headers
            });

            if (!resp.ok) {
                console.error('Error when filterLikeByUser req');
                return;
            }

            return await resp.json() as number[];
        } catch(e) {
            console.error('Error when filterLikeByUser req');
            console.error(e);
        }
    }

    async getManyPersonalized(params: GetManyParams) {
        const getManyQueries = getGetManyQuery(params);
        // const queries = new URLSearchParams(getManyQueries);

        try {
            const resp = await fetch(`${apiUrl}/comment/many_personalized?${getManyQueries}`, {
                method: 'GET',
                headers: new HeaderBuilder().jwt().headers
            });

            if (!resp.ok) {
                console.error('Error when getManyPersonalized comments req');
                console.error(resp.statusText);
            }

            const comments = await resp.json();
            return comments as CommentModel;
        } catch(e) {
            console.error('Error when getManyPersonalized comments req');
            console.error(e);
        }
    }

    async getManyPersonalizedByLibId(params: GetManyParams, id: number) {
        const getManyQueries = getGetManyQuery(params);
        const queries = new URLSearchParams(getManyQueries);
        queries.append('libId', id.toString());

        try {
            const resp = await fetch(`${apiUrl}/comment/many_by_lib_id?${getManyQueries}`, {
                method: 'GET',
                headers: new HeaderBuilder().jwt().headers
            });

            if (!resp.ok) {
                console.error('Error when getManyPersonalized comments req');
                console.error(resp.statusText);
                return [];
            }

            const comments = await resp.json() as CommentModel[];

            const personalized = comments.map(c => {
                return transformCommentToPersonalized(c);
            });

            return personalized;
        } catch(e) {
            console.error('Error when getManyPersonalized comments req');
            console.error(e);
            return [];
        }
    }

    async getManyPersonalizedByProjectId(params: GetManyParams, id: number) {
        const getManyQueries = getGetManyQuery(params);
        const queries = new URLSearchParams(getManyQueries);
        queries.append('projectId', id.toString());

        try {
            const resp = await fetch(`${apiUrl}/comment/many_by_project_id?${queries.toString()}`, {
                method: 'GET',
                headers: new HeaderBuilder().jwt().headers
            });

            if (!resp.ok) {
                console.error('Error when getManyPersonalized comments req');
                console.error(resp.statusText);

                return [];
            }

            const comments = await resp.json() as CommentModel[];

            const personalized = comments.map(c => {
                return transformCommentToPersonalized(c);
            });

            return personalized;
        } catch(e) {
            console.error('Error when getManyPersonalized comments req');
            console.error(e);

            return[];
        }
    }
}

export const commentReq = new CommentReq();