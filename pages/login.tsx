import type { NextPage } from 'next';
import * as RM from 'react-modifier';
import Head from 'next/head';
import Goto from '../components/goto';
import StyledTextInput from '../components/styled-text-input';
// import { useState } from 'react';
import { SyntheticInputData, useSyntheticInput } from '../hooks/input_synthetic.hook';
import Link from 'next/link';
import { validateEmail } from '../validators/email.validator';
import { validatePassword } from '../validators/password.validator';
import StyledBtn from '../components/styled_btn';
import { observer } from 'mobx-react-lite';
import { useLoginPageLogic } from '../hooks/login_page_logic.hook';
import ValidationErrInline from '../components/validation_err_inline';
import ValidationErrBlock from '../components/validation_err_block';

const InnerLogin: NextPage = () => {
	const emailInp = useSyntheticInput();
	const passwordInp = useSyntheticInput();

	const validationMessages =[
		...validateEmail(emailInp.binding.value),
		...validatePassword(passwordInp.binding.value)
	];

	const logic = useLoginPageLogic();

	return (
		<div className='page-content'>
			<Head>
				<title>Войти</title>
				<meta name="description" content="TODO" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Goto href='/' title='Войти' isMainHeading={true} goBack />

				{/* inputs */}
				<div className='mt-[25px] mx-auto w-fit'>
					<StyledTextInput {...emailInp.binding} label='Почта' placeholder='your@mail.com'  />

					<StyledTextInput {...passwordInp.binding} label='Пароль' placeholder='******' 
					type='password' headMod={RM.createMod('mt-3')} />
				</div>

				{/* status */}
				{logic.status && (
					<p className={['text-error text-center mt-4 max-w-[250px]',
					'block w-fit mx-auto'].join(' ')}>
						{logic.status}
					</p>
				)}

				{validationMessages.length > 0 && (
					<>
						{/* <ValidationErr messages={validationMessages}
						headMod={RM.createMod('mt-4 text-center')} /> */}

						{/* <ValidationErrInline messages={validationMessages}
						headMod={RM.createMod('mt-4 mx-auto')} /> */}

						<ValidationErrBlock messages={validationMessages} 
						headMod={RM.createMod('mt-4 mx-auto')} />
					</>
				)}

				<StyledBtn value='войти' disabled={validationMessages.length > 0}
				headMod={RM.createMod([
					'mt-[38px] w-[92px] mx-auto'
				].join(' '))} 
				onClick={() => logic.handleLogin(emailInp, passwordInp)} />

				{/* links */}
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

const LoginPage = observer(InnerLogin);
export default LoginPage;