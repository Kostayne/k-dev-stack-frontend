import React from 'react';
import * as RM from 'react-modifier';
import { CommentPersonalizedModel } from '../models/comment.model';
import Image from 'next/image';
import { UserCommentRefModel } from '../models/user.model';
import Rating from './rating';

interface CommentProps {
    headMod?: RM.IModifier;
    data: CommentPersonalizedModel;
    onReply?: (author: UserCommentRefModel) => void;
    onLike: () => void;
}

const Comment = (props: CommentProps) => {
    const headMod = props.headMod || RM.createMod();
    const { date, likesCount, likedByUser } = props.data;
    const { firstName, lastName, avatarName } = props.data.author;

    return (
        RM.modElement((
            <div className='w-full'>
                {/* current comment */}
                <div className='flex gap-x-2'>
                    <div className='relative w-[45px] h-[45px] rounded-[50%] overflow-hidden'>
                        <Image src={avatarName} alt="Аватарка" layout='fill' className='' />
                    </div>

                    {/* right part */}
                    <div className='flex flex-col grow-[1]'>
                        {/* right top */}
                        <div className='flex items-center gap-x-2 text-contrast'>
                            <span className='font-roboto font-medium'>{firstName} {lastName}</span>
                            <span>{date}</span>
                        </div>

                        <pre className='font-robotoCond whitespace-pre-wrap mt-[5px]'>{props.data.text}</pre>
                        <button className='text-btn mt-[5px] w-fit ml-auto'>ответить</button>

                        <Rating onLikeClick={props.onLike} likesCount={likesCount} liked={likedByUser} />
                    </div>
                </div>
            </div>
        ), headMod)
    );
};

export default Comment;