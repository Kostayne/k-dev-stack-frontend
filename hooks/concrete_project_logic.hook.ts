import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ProjectPageProps } from "../pages/projects/[slug]";
import { projReq } from "../requests/project.req";
import { userStore } from "../stores/user.store";
import { transformLibToTaggedItemPreview } from "../transform/tagged_item_preview.transform";

export function useConcreteProjectLogic(props: ProjectPageProps) {
    const project = props.project;
    const [isEditFormOpened, setEditFormOpened] = useState(false);
    const router = useRouter();

	useEffect(() => {
		const asyncWrapper = async () => {
			userStore.getOrLoadUser();
		};

		asyncWrapper();
	});

    const onDelete = async () => {
		if (!project) {
			return;
		}

		const respInfo = await projReq.delete(project.id);
		if (respInfo.error) {
			alert('Ошибка');
			return;
		}

		router.push('/projects');
	};

	const onGoToCommentsClick = () => {
		const commentsDiv = document.getElementById('comments');

		commentsDiv?.scrollIntoView({
			behavior: "smooth"
		});
	};

    const libPreviews = project? project.libs.map(l => {
        return transformLibToTaggedItemPreview(l);
    }) : [];	

    return {
        libPreviews,
        isEditFormOpened,
		onGoToCommentsClick,
        setEditFormOpened,
        onDelete
    };
}