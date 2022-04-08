import { useRouter } from "next/router";
import React, { useState } from "react";
import { userFetch } from "../requests/user.req";
import { validateEmail } from "../validators/email.validator";
import { validateFirstName } from "../validators/firtsname.validator";
import { validateLastName } from "../validators/lastname.validator";
import { validatePassword } from "../validators/password.validator";
import { useSyntheticInput } from "./input_synthetic.hook";

export function useRegisterPageLogic() {
    const nameInp = useSyntheticInput();
	const lastNameInp = useSyntheticInput();
	const emailInp = useSyntheticInput();
	const passwordInp = useSyntheticInput();
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

    const onSendClick = (e: React.MouseEvent) => {
        e.preventDefault();

        if (validationMessages.length > 0) {
            return;
        }

        const asyncWrapper = async () => {            
            try {
                const resp = await userFetch.register({
                    email: emailVal,
                    firstName: nameVal,
                    lastName: lastNameVal,
                    password: passwordVal
                });
    
                if (resp.ok) {
                    router.push('/');
                    return;
                }
    
                if (resp.status == 409) {
                    setErrorStatus('Пользователь с такой почтой уже существует!');
                    return;
                }
    
                setErrorStatus('Произошла ошибка, повторите позже!');
            } catch(e) {
                console.log('Register page req error');
                console.error(e);
            }
        };

        asyncWrapper();
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