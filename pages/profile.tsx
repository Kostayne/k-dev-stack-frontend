import type { NextPage } from 'next';
import * as RM from 'react-modifier';
import Head from 'next/head';
import Goto from '../components/goto';
import StyledTextInput from '../components/styled-text-input';
import React from 'react';
import ValidationErr from '../components/validation_err';
import StyledBtn from '../components/styled_btn';
import { useProfilePageLogic } from '../hooks/profile_page_logic.hook';
import { observer } from 'mobx-react-lite';
import TextMsgBlock from '../components/text_msg_block';

const Profile: NextPage = () => {
	const {
		nameInp,
		lastNameInp,
		passwordInp,
		emailInp,
		newPasswordInp,
		selectedFile,
		validationMessages,
		imgInpRef,
		userAvatarUrl,
		disableSendBtn,
		status,
		onImgClick,
		onImgSelected,
		onImgError,
		onSend
	} = useProfilePageLogic();

	let statusColor = 'success';

	if (status.type == 'error') {
		statusColor = 'error';
	}

	if (status.type == 'success') {
		statusColor = 'status';
	}

	return (
		<div className='page-content'>
			<Head>
				<title>Профиль</title>
				<meta name="description" content="Смена имени, пароля, имейла и аватарки." />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Goto href='/' title='Профиль' isMainHeading={true} headMod={RM.createMod('')} 
				goBack />

				{/* avatar */}
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src={selectedFile || userAvatarUrl} alt='аватарка' 
				onError={onImgError} className={[
					'mt-6 relative rounded-[50%] w-[77px] h-[77px]',
					'mx-auto cursor-pointer'
				].join(' ')} onClick={onImgClick} />

				{/* inputs */}
				{/* TODO add horizontal v for desktop */}
				<div className='mt-6 flex flex-col row gap-y-3 mx-auto w-fit'>
					<StyledTextInput {...nameInp.binding} label='Имя' placeholder='ваше имя'  />

					<StyledTextInput {...lastNameInp.binding} label='Фамилия' placeholder='ваша фамилия'  />

					<StyledTextInput {...emailInp.binding} label='Почта' placeholder='your@mail.com'  />

					<StyledTextInput {...passwordInp.binding} label='Пароль' placeholder='******' 
					type='password' name='' />

					<StyledTextInput {...newPasswordInp.binding} label='Новый пароль' placeholder='******' 
					type='password' />
				</div>

				<ValidationErr messages={validationMessages} 
				headMod={RM.createMod('mt-5')} />
				
				{status.text && (
					<TextMsgBlock color={status.type=='error'? 'error' : 'status'} 
					title='статус' headMod={RM.createMod('mt-4 mx-auto text-center')}>
						<p>{status.text}</p>
					</TextMsgBlock>
				)}

				<StyledBtn value='ПРИМЕНИТЬ' disabled={disableSendBtn}
				headMod={RM.createMod(['w-[150px] mx-auto mt-[50px]'].join(' '))}
				onClick={onSend} />

				<button className='mt-5 mx-auto w-fit block text-btn'>ВЫЙТИ</button>

				<input className='hidden' ref={imgInpRef} accept="image/*" type="file" 
				onChange={onImgSelected} />
			</main>
		</div>
	);
};

export default observer(Profile);