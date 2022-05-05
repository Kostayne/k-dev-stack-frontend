import React from 'react';
import * as RM from 'react-modifier';
import { useAdminProjectCategoryLogic } from '../hooks/admin_project_category_logic.hook';
import { ProjectModel } from '../models/project.model';
import AdminCategoryActions from './admin_category_actions';
import Card from './card';
import SpanBtn from './span_btn';

export interface AdminProjectCategoryProps {
    headMod?: RM.IModifier;
    setCurForm: (v: string) => void;
    setInitialProject: (p: ProjectModel | null) => void;
}

const AdminProjectCategory = (props: AdminProjectCategoryProps) => {
    const headMod = props.headMod || RM.createMod();

    const { 
        onCreateGh, onCreateManual,
        onEdit, onDelete, onUpdate,
    } = useAdminProjectCategoryLogic(props);

    return (
        RM.modElement((
            <AdminCategoryActions categoryDisplayName='проекты'>
                <SpanBtn onClick={onCreateManual}>Создать вручную</SpanBtn>
                <SpanBtn onClick={onCreateGh}>Создать через гитхаб</SpanBtn>
                <SpanBtn onClick={onEdit}>Редактировать</SpanBtn>
                <SpanBtn onClick={onUpdate}>Обновить</SpanBtn>
                <SpanBtn onClick={onDelete}>Удалить</SpanBtn>
            </AdminCategoryActions>
        ), headMod)
    );
};

export default AdminProjectCategory;