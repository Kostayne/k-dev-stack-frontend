import type { NextPage } from 'next';
import * as RM from 'react-modifier';
import Head from 'next/head';
import Goto from '../components/goto';
import Image from 'next/image';
import { useSyntheticInput } from '../hooks/input_synthetic';
import StyledTextInput from '../components/styled-text-input';
import React, { useRef, useState } from 'react';

const Profile: NextPage = () => {
	const name = useSyntheticInput();
	const lastName = useSyntheticInput();
	const emailInp = useSyntheticInput();
	const passwordInp = useSyntheticInput();
	const newPasswordInp = useSyntheticInput();
	const imgInpRef = useRef<HTMLInputElement>(null);
	const [selectedFile, setSelectedFile] = useState('');

	const onImgClick = () => {
		imgInpRef.current?.click();
	};

	const onImgSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
		const fr = new FileReader();
		const files = e.currentTarget.files as FileList;
		const file = files[0];

		if (!file) {
			return;
		}
		
		fr.onload = () => {
			setSelectedFile(fr.result as string);
		}

		fr.readAsDataURL(file);
	};

	return (
		<div className='page-content'>
			<Head>
				<title>K_DevStack TODO</title>
				<meta name="description" content="TODO" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Goto href='/' title='Профиль' isMainHeading={true} headMod={RM.createMod('mt-5')} 
				goBack />

				<div className='mt-6 relative rounded-[50%] w-[77px] h-[77px] overflow-hidden 
				mx-auto cursor-pointer' onClick={onImgClick}>
					<Image src={selectedFile || "/default_ava.jpeg"} alt='аватарка' layout='fill' 
					objectFit='cover' />
				</div>

				{/* inputs */}
				<div className='mt-6 flex flex-col row gap-y-3 mx-auto w-fit'>
					<StyledTextInput {...name.binding} label='Имя' placeholder='ваше имя'  />

					<StyledTextInput {...lastName.binding} label='Фамилия' placeholder='ваша фамилия'  />

					<StyledTextInput {...emailInp.binding} label='Почта' placeholder='your@mail.com'  />

					<StyledTextInput {...passwordInp.binding} label='Пароль' placeholder='******' 
					type='password' name='' />

					<StyledTextInput {...newPasswordInp.binding} label='Новый пароль' placeholder='******' 
					type='password' />
				</div>

				<button className='primary-btn w-[104px] mx-auto mt-[50px]'>ПРИМЕНИТЬ</button>

				<button className='mt-5 btn mx-auto w-fit block'>ВЫЙТИ</button>

				<input className='hidden' ref={imgInpRef} accept="image/*" type="file" 
				onChange={onImgSelected} />
			</main>
		</div>
	);
};

export default Profile;