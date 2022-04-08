import React from 'react';
import * as RM from 'react-modifier';
import { CommentReadyToDisplay } from '../models/comment.model';
import Image from 'next/image';
import Rating from './rating';
import { staticUrl } from '../cfg';
import CreateComment from '../components/create_comment';
import { backendDateToHuman } from '../utils/backend_date_to_str';
import { useCommentLogic } from '../hooks/comment_logic.hook';
import { observer } from 'mobx-react-lite';
import EditImgBtn from './edit_img_btn';
import RmBtnRounded from './rm_btn_rounded';
import RmIcoBtn from './rm_ico_btn';

export interface CommentProps {
    headMod?: RM.IModifier;
    data: CommentReadyToDisplay;
}

const Comment = (props: CommentProps) => {
    const headMod = props.headMod || RM.createMod();
    const { creationDate } = props.data;
    const { firstName, lastName, avatarName } = props.data.author;
    const date = backendDateToHuman(creationDate);

    const { 
        likedByUser, likesCount, replyOpened, 
        showActions, onCommentLike, onOpenReplyBtn, 
        onSendReply, onCloseReply, onDelete
    } = useCommentLogic(props);

    return (
        RM.modElement((
            <div className='w-full'>
                {/* current comment */}
                <div className='flex gap-x-3'>
                    <div className='relative min-w-[40px] min-h-[40px] w-[40px] h-[40px] md:w-[45px] md:h-[45px] rounded-[50%] overflow-hidden'>
                        <Image src={`${staticUrl}/avatars/${avatarName}`} alt="Аватарка" layout='fill' className='' />
                    </div>

                    {/* right part */}
                    <div className='flex flex-col grow-[1]'>
                        {/* right top */}
                        <div className='flex items-center gap-x-2 text-contrast text-sm'>
                            <span className='font-roboto font-medium'>{firstName} {lastName}</span>
                            <span className=''>{date}</span>

                            {showActions && (
                                <>
                                    <EditImgBtn />
                                    <RmIcoBtn onClick={onDelete} />
                                </>
                            )}
                        </div>

                        <pre className='font-roboto whitespace-pre-wrap mt-[5px]'>{props.data.text}</pre>

                        <div className='flex items-center mt-[5px]'>
                            <Rating onLikeClick={onCommentLike} likesCount={likesCount} liked={likedByUser} />
                            <button className='text-btn text-xs w-fit ml-1' 
                            onClick={onOpenReplyBtn}>ОТВЕТИТЬ</button>
                        </div>

                        {replyOpened && (
                            <CreateComment onCancel={onCloseReply}
                            onCreate={onSendReply} prefix={props.data.author.firstName + ', '} 
                            isFocused />
                        )}
                    </div>
                </div>
            </div>
        ), headMod)
    );
};

export default observer(Comment);