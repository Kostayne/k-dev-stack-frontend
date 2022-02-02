import type { NextPage } from 'next';
import * as RM from 'react-modifier';
import Head from 'next/head';
import Goto from '../components/goto';
import StyledTextInput from '../components/styled-text-input';
// import { useState } from 'react';
import { useSyntheticInput } from '../hooks/input_synthetic';
import Link from 'next/link';
import { validateEmail } from '../validators/email.validator';
import { validatePassword } from '../validators/password.validator';
import { joinValidationMessages } from '../shared/joinValidationMessages';
import ValidationErr from '../components/validation_err';

const Login: NextPage = () => {
	const emailInp = useSyntheticInput();
	const passwordInp = useSyntheticInput();

	const validationMessages =[
		...validateEmail(emailInp.binding.value),
		...validatePassword(passwordInp.binding.value)
	];

	return (
		<div className='page-content'>
			<Head>
				<title>Войти</title>
				<meta name="description" content="TODO" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Goto href='/' title='Войти' isMainHeading={true} headMod={RM.createMod('mt-5')} 
				goBack />

				<div className='mt-[25px] mx-auto w-fit'>
					<StyledTextInput {...emailInp.binding} label='Почта' placeholder='your@mail.com'  />

					<StyledTextInput {...passwordInp.binding} label='Пароль' placeholder='******' 
					type='password' headMod={RM.createMod('mt-3')} />
				</div>

				{validationMessages.length > 0 && (
					<ValidationErr messages={validationMessages}
					headMod={RM.createMod('mt-8')} />
				)}

				<button className='primary-btn mt-[38px] w-[92px] mx-auto'>войти</button>

				{/* other links */}
				<div className='mt-9 w-fit mx-auto'>
					<div className='splitter w-[165px]' />

					<Link href="/recover_password" passHref>
						<a className='mt-2 link block w-fit mx-auto'>восстановить пароль</a>
					</Link>

					<Link href="/register" passHref>
						<a className='mt-1 link block w-fit mx-auto'>регистрация</a>
					</Link>
				</div>
			</main>
		</div>
	);
};

export default Login;