import { apiUrl } from "../cfg";
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
}

export const commentReq = new CommentReq();