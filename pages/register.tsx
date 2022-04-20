import type { NextPage } from 'next';
import * as RM from 'react-modifier';
import Head from 'next/head';
import Goto from '../components/goto';
import StyledTextInput from '../components/styled-text-input';
import Link from 'next/link';
import StyledBtn from '../components/styled_btn';
import { useRegisterPageLogic } from '../hooks/register_page_logic.hook';
import ValidationErrBlock from '../components/validation_err_block';
import TextMsgBlock from '../components/text_msg_block';
import React from 'react';

const Register: NextPage = () => {
	const {
		emailInp,
		lastNameInp,
		nameInp,
		passwordInp,
		validationMessages,
		errorStatus,
		onSendClick
	} = useRegisterPageLogic();

	return (
		<div className='page-content'>
			<Head>
				<title>Регистрация</title>
				<meta name="description" content="Здесь вы можете создать аккаунт K_DevStack" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Goto href='/' title='Регистрация' isMainHeading={true} goBack />

				<form>
					{/* inputs */}
					<div className='mt-6 flex flex-col row gap-y-3 mx-auto w-fit'>
						<StyledTextInput {...nameInp.binding} label='Имя' placeholder='ваше имя' 
						name='firstname' />

						<StyledTextInput {...lastNameInp.binding} label='Фамилия' placeholder='ваша фамилия' 
						name='lastname' />

						<StyledTextInput {...emailInp.binding} label='Почта' placeholder='your@mail.com'
						name='email' />

						<StyledTextInput {...passwordInp.binding} label='Пароль' placeholder='******' 
						type='password' name='password' />
					</div>

					{errorStatus && (
						<TextMsgBlock color={'error'} title='статус'
						headMod={RM.createMod('mx-auto mt-4')}>
							<p>{errorStatus}</p>
						</TextMsgBlock>
					)}

					{validationMessages.length > 0 && (
						<ValidationErrBlock messages={validationMessages} 
						headMod={RM.createMod('mt-8 w-fit mx-auto text-center')} />
					)}

					<StyledBtn value='зарегистрировать' disabled={validationMessages.length > 0}
					headMod={RM.createMod('mt-9 w-[150px] mx-auto')} 
					onClick={(e) => onSendClick(e as React.MouseEvent)}
					type="submit" />
				</form>

				<div className='mt-9 w-[165px] mx-auto splitter' />

				<div className='mt-2 flex flex-col w-fit mx-auto'>
					<Link href="/recover_password" passHref>
						<a className='mt-2 text-link block w-fit mx-auto'>восстановить пароль</a>
					</Link>

					<Link href="/login" passHref>
						<a className='mt-1 text-link block w-fit mx-auto'>вход</a>
					</Link>
				</div>
			</main>
		</div>
	);
};

export default Register;