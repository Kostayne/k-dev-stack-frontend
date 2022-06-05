import { useRouter } from "next/router";
import React, { useState } from "react";
import { TextMsgColor } from "../components/text_msg_block";
import { userStore } from "../stores/user.store";
import { validateEmail } from "../validators/email.validator";
import { validatePassword } from "../validators/password.validator";
import { useSyntheticInput } from "./input_synthetic.hook";

interface LoginStatus {
    color: TextMsgColor;
    text: string;
}

export function useLoginPageLogic() {
    const router = useRouter();
    const [status, setStatus] = useState<LoginStatus>({
        color: 'status',
        text: ''
    });

    const emailInp = useSyntheticInput('');
	const passwordInp = useSyntheticInput('');

	const emailVal = emailInp.binding.value;
	const passVal = passwordInp.binding.value;
    const allInputsAreEmpty = emailVal == '' && passVal == '';

	let validationMessages = !allInputsAreEmpty? [
		...(validateEmail(emailInp.binding.value)),
		...(validatePassword(passwordInp.binding.value))
	] : [];

    const handleLogin = async(e: React.MouseEvent) => {
        e.preventDefault();

        const respCode = await userStore.login(
            emailVal,
            passVal
        );

        if (respCode == 200) {
            router.push('/');
            return;
        }

        if (respCode == 401) {
            setStatus({
                text: 'Неправильные данные для аутентификации!',
                color: 'error',
            });

            return;
        }

        setStatus({
            text: 'Произошла ошибка, пожалуйста повторите попытку.',
            color: 'error',
        });
    }

    const isLoginDisabled = validationMessages.length > 0 ||
        passVal == '' ||
        emailVal == '';

    return {
        emailInp,
        passwordInp,
        status,
        validationMessages,
        isLoginDisabled,
        handleLogin,
    };
}