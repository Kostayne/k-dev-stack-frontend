import { useRouter } from "next/router";
import { useState } from "react";
import { TextMsgColor } from "../components/text_msg_block";
import { userStore } from "../stores/user.store";
import { SyntheticInputData } from "./input_synthetic.hook";

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

    const handleLogin = async(email: SyntheticInputData, password: SyntheticInputData) => {
        const respCode = await userStore.login(
            email.binding.value,
            password.binding.value
        );

        if (respCode == 200) {
            router.push('/');

            // setStatus({
            //     text: 'Вы успешно вошли!',
            //     color: 'status',
            // });

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

    return {
        handleLogin,
        status
    };
}