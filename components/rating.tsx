import React from 'react';
import * as RM from 'react-modifier';
import LikeBtn from './like_btn';

interface RatingProps {
    headMod?: RM.IModifier;
    onLikeClick?: () => void;
    likesCount: number;
    liked: boolean;
}

const Rating= (props: RatingProps) => {
    const headMod = props.headMod || RM.createMod();

    return (
        RM.modElement((
            <div className='flex items-center gap-x-1.5'>
                <span>{props.likesCount}</span>
                <LikeBtn onClick={props.onLikeClick} liked={props.liked} />
            </div>
        ), headMod)
    );
};

export default Rating;