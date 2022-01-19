import React from 'react';
import * as RM from 'react-modifier';
import styles from './like_btn.module.scss';
import { createModuleStylesConverter } from 'get-module-style';

interface LikeBtnProps {
    headMod?: RM.IModifier;
    onClick?: () => void;
    liked: boolean;
}

const LikeBtn= (props: LikeBtnProps) => {
    const headMod = props.headMod || RM.createMod();
    const gs = createModuleStylesConverter(styles);

    const btnCname = props.liked? gs('btn _liked') : gs('btn');

    return (
        RM.modElement((
            <button className={`border-none p-1 rounded-[50%] flex items-center justify-center ${btnCname}`}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className={gs('svg')}>
                    <path d="M7.068 2.90673L7.49998 3.648L7.93199 2.90674C8.78458 1.44383 10.4273 0.905561 11.878 1.21536C13.3085 1.52085 14.5 2.63806 14.5 4.49498C14.5 5.75914 13.7392 7.11185 12.3768 8.70715C11.368 9.8884 10.0871 11.1401 8.66117 12.5334C8.2835 12.9024 7.89566 13.2814 7.50003 13.6716C7.10348 13.2805 6.71476 12.9006 6.33625 12.5307C4.91159 11.1385 3.6316 9.88764 2.62341 8.70714C1.26094 7.11181 0.5 5.75912 0.5 4.49498C0.5 2.64426 1.68917 1.52087 3.11813 1.21105C4.56548 0.897242 6.20801 1.43098 7.068 2.90673Z" stroke="#EB478C"/>
                </svg>
            </button>
        ), headMod)
    );
};

export default LikeBtn;