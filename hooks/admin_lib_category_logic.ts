import { AdminLibCategoryProps } from "../components/admin_lib_category";
import { LibModel } from "../models/lib.model";
import { libReq } from "../requests/lib.req";

export function useAdminLibCategoryLogic(props: AdminLibCategoryProps) {
    const { setCurForm, setInitialLib } = props;

    const onCreateManual = async () => {
        setInitialLib(null);
        setCurForm('lib_create');
    };

    const onCreateGh = async () => {
        const repoUrl = prompt('package name');
		if (!repoUrl) return;

		const respInfo = await libReq.fetchInfo(repoUrl);

		if (respInfo.error) {
			alert('Error');
			return;
		}

		setInitialLib(respInfo.data as LibModel);
        setCurForm('lib_create');
    };

    const onUpdate = async () => {
        
    };

    const onEdit = async () => {
        setCurForm('lib_edit');
    };

    const onDelete = async () => {
        setCurForm('lib_delete');
    };

    return {
        onCreateGh,
        onCreateManual,
        onEdit,
        onUpdate,
        onDelete
    };
}