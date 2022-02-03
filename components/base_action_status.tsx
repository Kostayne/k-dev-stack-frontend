import React from 'react';
import * as RM from 'react-modifier';
import { BaseActionStatusType } from '../models/base_action_status';

interface BaseActionStatusProps {
    headMod?: RM.IModifier;
    status: BaseActionStatusType;

    succesMsg?: string;
    errorMsg?: string;
}

const BaseActionStatus= (props: BaseActionStatusProps) => {
    const headMod = props.headMod || RM.createMod();

    const okMsg = props.succesMsg || 'Действие было выполнено успешно.';
    const errMsg = props.errorMsg || 'Произошла ошибка.';

    if (props.status == 'none') {
        return null;
    }

    const className = props.status == 'success'? `text-status` : `text-error`;

    return (
        RM.modElement((
            <p className={className}>
                {props.status == 'success'? okMsg : errMsg}
            </p>
        ), headMod)
    );
};

export default BaseActionStatus;