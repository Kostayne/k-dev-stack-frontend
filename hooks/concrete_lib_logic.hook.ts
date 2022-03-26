import { CommentModel } from "../models/comment.model";
import { PaginationParams } from "../models/get_many_params";
import { LibPageProps } from "../pages/libs/[slug]";
import { commentReq } from "../requests/comment.req";
import { transformLibToTaggedItemPreview, transformProjectToTaggedItemPreview } from "../transform/tagged_item_preview.transform";

export function useConcreteLibPageLogic(props: LibPageProps) {
	const alternativePreviews = props.lib.alternativeFor.map((a) => {
		return transformLibToTaggedItemPreview(a);
	});

    const projectPreviews = props.lib.projects.map((p) => {
        return transformProjectToTaggedItemPreview(p);
    });

	const createCommentReq = async (text: string, parentId?: number) => {
		const createdComment = await commentReq.create({
			text,
			libId: props.lib.id,
			parentId
		});

		return createdComment as CommentModel;
	};

	const fetchComments = (params: PaginationParams) => {
		return commentReq.getManyPersonalizedHoc(params, { libId: props.lib.id });
	};

	const swiperMod = '';

    return {
        alternativePreviews,
        projectPreviews,
		swiperMod,
		createCommentReq,
		fetchComments
    };
}