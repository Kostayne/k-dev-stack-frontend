import React from 'react';
import * as RM from 'react-modifier';
import Link from 'next/link';
import { useHeaderUserLogic } from '../hooks/header_user_logic.hook';

interface HeaderUserProps {
    headMod?: RM.IModifier;
    imgSrc: string;
    firstName: string;
}

const HeaderUser= (props: HeaderUserProps) => {
    const headMod = props.headMod || RM.createMod();
    const { onLogoutClick, onImgError } = useHeaderUserLogic();
    const { imgSrc, firstName } = props;

    return (
        RM.modElement((
            <div className='flex items-center'>
                <div>
                    {/* left */}
                    <Link href={'/profile'} passHref>
                        <a className='link'>{firstName}</a>
                    </Link>

                    <button className={[
                        'text-btn mt-auto w-[70px] text-base',
                        'ml-auto py-[1px] mt-auto'
                    ].join(' ')}
                    onClick={onLogoutClick}>выйти</button>
                </div>

                {/* img (right) */}
                <Link href={'/profile'} passHref>
                    { /* eslint-disable-next-line @next/next/no-img-element */ }
                    <img alt="Аватарка" src={imgSrc} className={['min-w-[40px] w-[40px] h-[40px]',
                    'rounded-[50%] cursor-pointer ml-2 object-cover'].join(' ')} 
                    onError={onImgError} />
                </Link>
            </div>
        ), headMod)
    );
};

export default HeaderUser;