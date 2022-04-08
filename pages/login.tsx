import type { NextPage } from 'next';
import * as RM from 'react-modifier';
import Head from 'next/head';
import Goto from '../components/goto';
import StyledTextInput from '../components/styled-text-input';
import { useSyntheticInput } from '../hooks/input_synthetic.hook';
import Link from 'next/link';
import { validateEmail } from '../validators/email.validator';
import { validatePassword } from '../validators/password.validator';
import StyledBtn from '../components/styled_btn';
import { observer } from 'mobx-react-lite';
import { useLoginPageLogic } from '../hooks/login_page_logic.hook';
// import ValidationErrInline from '../components/validation_err_inline';
import ValidationErrBlock from '../components/validation_err_block';
import TextMsgBlock from '../components/text_msg_block';

const InnerLogin: NextPage = () => {
	const {
		emailInp, passwordInp, status,
		validationMessages, handleLogin
	} = useLoginPageLogic();

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
				<form>
					<div className='mt-[25px] mx-auto w-fit'>
						<StyledTextInput {...emailInp.binding} label='Почта' placeholder='your@mail.com' 
						name='email' />

						<StyledTextInput {...passwordInp.binding} label='Пароль' placeholder='******' 
						type='password' name='password' headMod={RM.createMod('mt-3')} />
					</div>

					{/* status */}
					{status.text && (
						<TextMsgBlock color={status.color} title='статус'
						headMod={RM.createMod('mx-auto mt-4')}>
							<p>{status.text}</p>
						</TextMsgBlock>
					)}

					{validationMessages.length > 0 && (
						<>
							<ValidationErrBlock messages={validationMessages} 
							headMod={RM.createMod('mt-4 mx-auto')} />
						</>
					)}

					<StyledBtn value='войти' disabled={validationMessages.length > 0}
					headMod={RM.createMod([
						'mt-[38px] w-[92px] mx-auto'
					].join(' '))} 
					onClick={handleLogin} />
				</form>

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