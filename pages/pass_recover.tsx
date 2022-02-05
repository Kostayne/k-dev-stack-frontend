import type { NextPage } from 'next';
import * as RM from 'react-modifier';
import Head from 'next/head';
import Goto from '../components/goto';
import StyledTextInput from '../components/styled-text-input';
import { useSyntheticInput } from '../hooks/input_synthetic';
import { validateEmail } from '../validators/email.validator';
import StyledBtn from '../components/styled_btn';
import ValidationErr from '../components/validation_err';
import { useEffect, useState } from 'react';
import { BaseActionStatusType } from '../models/base_action_status';
import BaseActionStatus from '../components/base_action_status';

const PassRecover: NextPage = () => {
	const emailInp = useSyntheticInput();
	const [timer, setTimer] = useState(5);
	const [status, setStatus] = useState<BaseActionStatusType>('none');

	useEffect(() => {
		const timerId = setInterval(() => {
			if (timer >= 1) {
				setTimer(timer - 1);
			}
		}, 1000);

		return () => {
			clearInterval(timerId);
		};
	});

	const validationMessages = [
		...validateEmail(emailInp.binding.value)
	];

	const timeLeft = timer == 0? 'Прямо сейчас' : 'Осталось ' + timer.toString() + ' с';

	const onSendClick = () => {
		// setStatus('error');
		setStatus('success');
	}

	return (
		<div className='page-content'>
			<Head>
				<title>Восстановить пароль</title>
				<meta name="description" content="Забыли пароль? Восстановите его здесь с помощью своего имейла." />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Goto href='/login' title='Восстановить пароль' isMainHeading={true} headMod={RM.createMod('mt-5')} 
				goBack />

				<StyledTextInput {...emailInp.binding} label='Почта' placeholder='your@mail.com'  
				headMod={RM.createMod('mt-6 w-fit mx-auto sm:mx-0')} />

				<ValidationErr messages={validationMessages} 
				headMod={RM.createMod('mt-8 text-left')} />

				{/* spamm tip */}
				<p className='mt-4'>
					На вашу почту придет письмо со ссылкой для восстановления пароля. 
					На всякий случай проверьте папку спамм.
				</p>

				{/* {status != 'none' && (
					<p className='mt-3 text-status'>{status}</p>
				)} */}

				<BaseActionStatus status={status} succesMsg='Сообщение было отправлено.' 
				errorMsg='Сообщение не было отправлено, попробуйте снова.' 
				headMod={RM.createMod('mt-3')} />

				{/* {!status && ( */}
					<StyledBtn value='отправить письмо' disabled={validationMessages.length > 0}
					headMod={RM.createMod('mt-[56px] w-[150px] mx-auto')} onClick={onSendClick} />
				{/* )} */}

				{/* {!status && ( */}
					<span className='mt-2 text-contrastAlt w-fit mx-auto block'>{timeLeft}</span>
				{/* )} */}
			</main>
		</div>
	);
};

export default PassRecover;