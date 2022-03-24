import { CommentModel } from "../models/comment.model";
import { GetManyParams } from "../models/get_many_params";
import { ProjectPageProps } from "../pages/projects/[slug]";
import { commentReq } from "../requests/comment.req";
import { transformLibToTaggedItemPreview } from "../transform/tagged_item_preview.transform";

export function useConcreteProjectLogic(props: ProjectPageProps) {
    const libPreviews = props.project.libs.map(l => {
        return transformLibToTaggedItemPreview(l);
    });

	const createCommentReq = async (text: string) => {
		const createdComment = await commentReq.create({
			text,
			projectId: props.project.id
		});

		return createdComment as CommentModel;
	}

	const fetchComments = (params: GetManyParams) => {
		return commentReq.getManyPersonalizedByLibId(params, props.project.id);
	};

    return {
        libPreviews,
		createCommentReq,
		fetchComments
    };
}