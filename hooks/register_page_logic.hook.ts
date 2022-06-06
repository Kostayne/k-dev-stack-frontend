import { useRouter } from "next/router";
import React, { useState } from "react";
import { userReq } from "../requests/user.req";
import { userStore } from "../stores/user.store";
import { validateEmail } from "../validators/email.validator";
import { validateFirstName } from "../validators/firtsname.validator";
import { validateLastName } from "../validators/lastname.validator";
import { validatePassword } from "../validators/password.validator";
import { useSyntheticInput } from "./input_synthetic.hook";

export function useRegisterPageLogic() {
    const nameInp = useSyntheticInput('');
	const lastNameInp = useSyntheticInput('');
	const emailInp = useSyntheticInput('');
	const passwordInp = useSyntheticInput('');
    const [errorStatus, setErrorStatus] = useState('');
    const router = useRouter();

    const nameVal = nameInp.binding.value;
    const lastNameVal = lastNameInp.binding.value;
    const emailVal = emailInp.binding.value;
    const passwordVal = passwordInp.binding.value;

    const validationMessages = [
		...(validateFirstName(nameVal)),
		...(validateLastName(lastNameVal)),
		...(validateEmail(emailVal)),
		...(validatePassword(passwordVal))
	];

    const onSendClick = async (e: React.MouseEvent) => {
        e.preventDefault();

        if (validationMessages.length > 0) {
            return;
        }

        try {
            const resp = await userReq.register({
                email: emailVal,
                firstName: nameVal,
                lastName: lastNameVal,
                password: passwordVal
            });

            if (resp.status == 409) {
                setErrorStatus('Пользователь с такой почтой уже существует!');
                return;
            }

            if (!resp.ok) {
                console.error(resp.statusText);
                setErrorStatus('Произошла ошибка, повторите позже!');
                return;
            }

            const loginRespStatus = await userStore.login(emailVal, passwordVal);
            if (loginRespStatus != 200) {
                console.error(resp.statusText);
                setErrorStatus('Произошла ошибка, повторите позже!');
                return;
            }

            router.push('/');
        } catch(e) {
            console.log('Register page req error');
            setErrorStatus('Произошла ошибка, повторите позже!');
            console.error(e);
        }
	};

    return {
        nameInp,
        lastNameInp,
        emailInp,
        passwordInp,
        validationMessages,
        errorStatus,
        onSendClick
    };
}