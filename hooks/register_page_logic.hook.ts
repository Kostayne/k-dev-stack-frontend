import { useRouter } from "next/router";
import { useState } from "react";
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

    const validationMessages = [
		...validateFirstName(nameInp.binding.value),
		...validateLastName(lastNameInp.binding.value),
		...validateEmail(emailInp.binding.value),
		...validatePassword(passwordInp.binding.value)
	];

    const onSendClick = async () => {
        if (validationMessages.length > 0) {
            return;
        }

        try {
            const resp = await userFetch.register({
                email: emailInp.binding.value,
                firstName: nameInp.binding.value,
                lastName: lastNameInp.binding.value,
                password: passwordInp.binding.value
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