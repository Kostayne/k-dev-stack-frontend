import { apiUrl } from "../cfg";
import { CommentModel, CreateCommentModel } from "../models/comment.model";
import { HeaderBuilder } from "../utils/header_builder";

class CommentReq {
    async like(id: number) {
        try {
            const resp = await fetch(`${apiUrl}/comment/like?id=${id}`, {
                method: 'GET',
                headers: new HeaderBuilder().jwt().headers
            });
    
            if (!resp.ok) {
                console.error('Error in like comment req');
                console.error(resp.statusText); 
            }

            return resp;
        } catch(e) {
            console.error('Error in like comment req');
            console.error(e);
        }
    }

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
}

export const commentReq = new CommentReq();