import { apiUrl } from "../cfg";
import { CommentLikeResultModel, CommentModel, CreateCommentModel } from "../models/comment.model";
import { PaginationParams } from "../models/get_many_params";
import { transformCommentToPersonalized } from "../transform/comment.transform";
import { appendCommentOwnerToQuery } from "../utils/append_comment_owner_to_query";
import { getGetManyQuery } from "../utils/get_many_query";
import { HeaderBuilder } from "../utils/header_builder";

export interface CommentOwner {
    libId?: number;
    projectId?: number;
}

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
                console.error('Error while filterLikeByUser req');
                return;
            }

            return await resp.json() as number[];
        } catch(e) {
            console.error('Error while filterLikeByUser req');
            console.error(e);
        }
    }

    async getManyPersonalizedHoc(params: PaginationParams, owner: CommentOwner) {
        const getManyQueries = getGetManyQuery(params);
        const queries = new URLSearchParams(getManyQueries);
        appendCommentOwnerToQuery(queries, owner);

        try {
            const resp = await fetch(`${apiUrl}/comment/many_hoc?${queries.toString()}`, {
                method: 'GET',
                headers: new HeaderBuilder().jwt().headers
            });

            if (!resp.ok) {
                console.error('Error while getManyPersonalized comments req');
                console.error(resp.statusText);
                return [];
            }

            const comments = await resp.json() as CommentModel[];

            const personalized = comments.map(c => {
                return transformCommentToPersonalized(c);
            });

            return personalized;
        } catch(e) {
            console.error('Error while getManyPersonalized comments req');
            console.error(e);
            return [];
        }
    }

    async countHocByOwnerId(owner: CommentOwner) {
        try {
            const queries = new URLSearchParams();
            appendCommentOwnerToQuery(queries, owner);

            const resp = await fetch(`${apiUrl}/comment/count_hoc_by_owner?${queries.toString()}`, {
                method: 'GET',
                headers: new HeaderBuilder().jwt().headers
            });

            if (!resp.ok) {
                console.error('Error while countHocByOwnerId comments req');
                console.error(resp.statusText);
                return 0;
            }

            const text = await resp.text();
            const count = parseInt(text);

            return count;
        } catch(e) {
            console.error('Error while countHocByOwnerId comments req');
            console.error(e);

            return 0;
        }
    }
}

export const commentReq = new CommentReq();