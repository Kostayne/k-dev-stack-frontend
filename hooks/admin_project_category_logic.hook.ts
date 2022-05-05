import { AdminProjectCategoryProps } from "../components/admin_project_category";
import { ProjectModel } from "../models/project.model";
import { projReq } from "../requests/project.req";

export function useAdminProjectCategoryLogic(props: AdminProjectCategoryProps) {
    const { setCurForm, setInitialProject } = props;

    const onCreateManual = async () => {
        setInitialProject(null);
        setCurForm('project_create');
    };

    const onCreateGh = async () => {
        const repoUrl = prompt('github repo url');
		if (!repoUrl) return;

		if (!repoUrl.includes('https://github.com/')) {
			alert('https://github.com/ required');
			return;
		}

		const respInfo = await projReq.fetchGhProject(repoUrl);

		if (respInfo.error) {
			alert('Error');
			return;
		}

		setInitialProject(respInfo.data as ProjectModel);
        setCurForm('project_create');
    };

    const onUpdate = async () => {
        
    };

    const onEdit = async () => {
        setCurForm('project_edit');
    };

    const onDelete = async () => {
        setCurForm('project_delete');
    };

    return {
        onCreateGh,
        onCreateManual,
        onEdit,
        onUpdate,
        onDelete
    };
}