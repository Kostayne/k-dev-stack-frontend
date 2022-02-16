import { useRouter } from "next/router";
import { useState } from "react";
import { userStore } from "../stores/user.store";
import { SyntheticInputData } from "./input_synthetic.hook";

export function useLoginPageLogic() {
    const router = useRouter();
    const [status, setStatus] = useState('');

    const handleLogin = async(email: SyntheticInputData, password: SyntheticInputData) => {
        const respCode = await userStore.login(
            email.binding.value,
            password.binding.value
        );

        if (respCode == 200) {
            router.push('/');
            setStatus('Вы успешно вошли!');
            return;
        }

        if (respCode == 401) {
            setStatus('Неправильные данные для аутентификации!');
            return;
        }

        setStatus('Произошла ошибка, пожалуйста повторите попытку.');
    }

    return {
        handleLogin,
        status
    };
}