import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LibPageProps } from "../pages/libs/[slug]";
import { commentReq } from "../requests/comment.req";
import { libReq } from "../requests/lib.req";
import { userStore } from "../stores/user.store";
import { transformLibToTaggedItemPreview, transformProjectToTaggedItemPreview } from "../transform/tagged_item_preview.transform";

export function useConcreteLibPageLogic(props: LibPageProps) {
	const lib = props.lib;
	const [isEditFormOpened, setEditFormOpened] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const asyncWrapper = async () => {
			userStore.getOrLoadUser();
		};

		asyncWrapper();
	});

	const alternativePreviews = lib? lib.alternativeFor.map((a) => {
		return transformLibToTaggedItemPreview(a);
	}) : [];

    const projectPreviews = lib? lib.projects.map((p) => {
        return transformProjectToTaggedItemPreview(p);
    }) : [];

	const fetchHocsCount = async () => {
		if (!lib) {
			return 0;
		}

        return commentReq.countHocByOwnerId({
            libId: lib.id
        });
    }

	const swiperMod = '';

	const onDelete = async () => {
		if (!lib) {
			return;
		}

		const respInfo = await libReq.delete(lib.id);
		if (respInfo.error) {
			alert('Ошибка');
			return;
		}

		router.push('/libs');
	};

	const onGoToCommentsClick = () => {
		const commentsDiv = document.getElementById('comments');

		commentsDiv?.scrollIntoView({
			behavior: "smooth"
		});
	};

    return {
        alternativePreviews,
        projectPreviews,
		swiperMod,
		isEditFormOpened,
		onGoToCommentsClick,
		fetchHocsCount,
		setEditFormOpened,
		onDelete
    };
}