import React from 'react';
import * as RM from 'react-modifier';
import { useAdminLibCategoryLogic } from '../hooks/admin_lib_category_logic';
import { LibModel } from '../models/lib.model';
import AdminCategoryActions from './admin_category_actions';
import SpanBtn from './span_btn';

export interface AdminLibCategoryProps {
    headMod?: RM.IModifier;
    setCurForm: (v: string) => void;
    setInitialLib: (p: LibModel | null) => void;
}

const AdminLibCategory= (props: AdminLibCategoryProps) => {
    const headMod = props.headMod || RM.createMod();
    
    const { 
        onCreateGh, onCreateManual,
        onEdit, onDelete, onUpdate,
    } = useAdminLibCategoryLogic(props);

    return (
        RM.modElement((
            <AdminCategoryActions categoryDisplayName='Библиотеки'>
                <SpanBtn onClick={onCreateManual}>Создать вручную</SpanBtn>
                <SpanBtn onClick={onCreateGh}>Создать через npm</SpanBtn>
                <SpanBtn onClick={onEdit}>Редактировать</SpanBtn>
                <SpanBtn onClick={onUpdate}>Обновить</SpanBtn>
                <SpanBtn onClick={onDelete}>Удалить</SpanBtn>
            </AdminCategoryActions>
        ), headMod)
    );
};

export default AdminLibCategory;