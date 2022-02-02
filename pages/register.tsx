import type { NextPage } from 'next';
import * as RM from 'react-modifier';
import Head from 'next/head';
import Goto from '../components/goto';
import { useSyntheticInput } from '../hooks/input_synthetic';
import StyledTextInput from '../components/styled-text-input';
import Link from 'next/link';
import { validateFirstName } from '../validators/firtsname.validator';
import { validateLastName } from '../validators/lastname.validator';
import ValidationErr from '../components/validation_err';

const Register: NextPage = () => {
	const name = useSyntheticInput();
	const lastName = useSyntheticInput();
	const emailInp = useSyntheticInput();
	const passwordInp = useSyntheticInput();

	const validationMsgs = [
		...validateFirstName(name.binding.value),
		...validateLastName(lastName.binding.value),
	];

	return (
		<div className='page-content'>
			<Head>
				<title>Регистрация</title>
				<meta name="description" content="Здесь вы можете создать аккаунт K_DevStack" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Goto href='/' title='Регистрация' isMainHeading={true} headMod={RM.createMod('mt-5')} 
				goBack />

				{/* inputs */}
				<div className='mt-6 flex flex-col row gap-y-3 mx-auto w-fit'>
					<StyledTextInput {...name.binding} label='Имя' placeholder='ваше имя'  />

					<StyledTextInput {...lastName.binding} label='Фамилия' placeholder='ваша фамилия'  />

					<StyledTextInput {...emailInp.binding} label='Почта' placeholder='your@mail.com'  />

					<StyledTextInput {...passwordInp.binding} label='Пароль' placeholder='******' 
					type='password' />
				</div>

				<ValidationErr messages={validationMsgs} 
				headMod={RM.createMod('mt-8 w-fit mx-auto text-center')} />

				<button className='primary-btn mt-9 w-[148px] mx-auto'>зарегистрировать</button>

				<div className='mt-9 w-[165px] mx-auto splitter' />
				<div className='mt-2 flex flex-col w-fit mx-auto'>
					<Link href="/recover_password" passHref>
						<a className='mt-2 link block w-fit mx-auto'>восстановить пароль</a>
					</Link>

					<Link href="/login" passHref>
						<a className='mt-1 link block w-fit mx-auto'>вход</a>
					</Link>
				</div>
			</main>
		</div>
	);
};

export default Register;