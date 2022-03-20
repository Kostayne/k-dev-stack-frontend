import React, { useState } from 'react';
import * as RM from 'react-modifier';
import { CommentPersonalizedModel } from '../models/comment.model';
import Image from 'next/image';
import Rating from './rating';
import { staticUrl } from '../cfg';
import CreateComment from '../components/create_comment';
import CommentsList from './comments_list';

interface CommentProps {
    headMod?: RM.IModifier;
    data: CommentPersonalizedModel;
    onSendReply: (text: string, parentId: number) => void;
    onLike: (id: number) => void;
}

const Comment = (props: CommentProps) => {
    const headMod = props.headMod || RM.createMod();
    const { date, likesCount, likedByUser, nestedComments, id } = props.data;
    const { firstName, lastName, avatarName } = props.data.author;
    const [replyOpened, setReplyOpened] = useState(false);

    const onOpenReplyBtn = () => {
        setReplyOpened(true);
    };

    const onSendReply = (text: string) => {
        if (props.onSendReply) {
            props.onSendReply(text, props.data.id);
        }
    };

    const handleLike = () => {
        props.onLike(id);
    }

    return (
        RM.modElement((
            <div className='w-full'>
                {/* current comment */}
                <div className='flex gap-x-3'>
                    <div className='relative w-[45px] h-[45px] rounded-[50%] overflow-hidden'>
                        <Image src={`${staticUrl}/avatars/${avatarName}`} alt="Аватарка" layout='fill' className='' />
                    </div>
                    
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {/* <img src={`${staticUrl}/avatars/${props.data.author.id}.jpg`}
                    alt="Аватарка" className='relative w-[45px] h-[45px] rounded-[50%] overflow-hidden' /> */}

                    {/* right part */}
                    <div className='flex flex-col grow-[1]'>
                        {/* right top */}
                        <div className='flex items-center gap-x-2 text-contrast'>
                            <span className='font-roboto font-medium'>{firstName} {lastName}</span>
                            <span>{date}</span>
                        </div>

                        <pre className='font-robotoCond whitespace-pre-wrap mt-[5px]'>{props.data.text}</pre>

                        <div className='flex items-center mt-[5px]'>
                            <Rating onLikeClick={handleLike} likesCount={likesCount} liked={likedByUser} />
                            <button className='text-btn text-xs w-fit ml-1' 
                            onClick={onOpenReplyBtn}>ОТВЕТИТЬ</button>
                        </div>

                        {replyOpened && (
                            <CreateComment onCancel={() => { setReplyOpened(false); }}
                            onCreate={onSendReply} prefix={props.data.author.firstName + ', '} />
                        )}

                        {/* nested comments */}
                        {nestedComments && nestedComments.length > 0 && (
                            <CommentsList comments={nestedComments}
                            onCommentLike={props.onLike}
                            onSendCommentReply={props.onSendReply}
                            headMod={RM.createMod('ml-1 mt-2')} />
                        )}
                    </div>
                </div>
            </div>
        ), headMod)
    );
};

export default Comment;