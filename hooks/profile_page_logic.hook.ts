import React, { useEffect, useRef, useState } from "react";
import { staticUrl } from "../cfg";
import { validateEmail } from "../validators/email.validator";
import { validateFirstName } from "../validators/firtsname.validator";
import { validateLastName } from "../validators/lastname.validator";
import { validatePasswordPair } from "../validators/password.validator";
import { useSyntheticInput } from "./input_synthetic.hook";
import { userStore } from "../stores/user.store";
import { userFetch } from "../requests/user.req";
import { useRouter } from "next/router";

const prevUserData = {
	loaded: false
};

export function useProfilePageLogic() {
    const nameInp = useSyntheticInput();
	const lastNameInp = useSyntheticInput();
	const emailInp = useSyntheticInput();
	const passwordInp = useSyntheticInput();
	const newPasswordInp = useSyntheticInput();
	const imgInpRef = useRef<HTMLInputElement>(null);
	const [selectedFile, setSelectedFile] = useState('');
	const [errorStatus, setErrorStatus] = useState('');
	const router = useRouter();
	const user = userStore.userData;

	useEffect(() => {
		// setting up user values
		if (!prevUserData.loaded && user) {
			nameInp.setValue(user.firstName);
			lastNameInp.setValue(user.lastName);
			emailInp.setValue(user.email);
		}

		if (user) {
			prevUserData.loaded = true;
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	const onImgClick = () => {
		imgInpRef.current?.click();
	};

	const onImgError = (e: React.BaseSyntheticEvent) => {
		const tg = e.currentTarget as HTMLImageElement;
		tg.src = `${staticUrl}/avatars/ava.jpg`;
	};

	const onImgSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
		const fr = new FileReader();
		const files = e.currentTarget.files as FileList;
		const file = files[0];

		if (!file) {
			return;
		}
		
		fr.onload = () => {
			setSelectedFile(fr.result as string);
		}

		fr.readAsDataURL(file);
	};

	const onSend = async () => {
		if (validationMessages.length > 0) {
			return;
		}

		let passRes: Response | null = null;
		let nameRes: Response | null = null;
		const curPass = passwordInp.binding.value;
		const newPass = newPasswordInp.binding.value;
		const firstName = nameInp.binding.value;
		const lastName = lastNameInp.binding.value;
		let errorText = '';

		try {
			if (curPass) {
				passRes = await userFetch.editPassword({
					curPass,
					newPass
				});
			}

			if (firstName || lastName) {
				const nameData = {
					firstName: firstName || undefined,
					lastName: lastName || undefined
				};

				if (!firstName) {
					delete nameData.firstName;
				}

				if (!lastName) {
					delete nameData.lastName;
				}

				nameRes = await userFetch.editName(nameData);
			}

			if (nameRes && !nameRes.ok) {
				errorText = 'При измении имени / фамилии произошла ошибка.';
			}

			if (passRes && !passRes.ok) {
				if (passRes.status == 401) {
					errorText += ' Неправильный текущий пароль';
				} else {
					errorText += ' При измении пароля произошла ошибка.';
				}
			}

			if (!errorText) {
				router.push('/');
				return;
			}

			setErrorStatus(errorText);
		}

		catch(e) {
			console.log('Error in edit user res');
			console.error(e);
			setErrorStatus('Произошла ошибка при отправке, попробуйте снова!');
		}
	}

	const passwordInputsAreFilled = passwordInp.binding.value.length > 0 || newPasswordInp.binding.value.length > 0;
	const passwordMsgs = passwordInputsAreFilled?
		[
			...validatePasswordPair(passwordInp.binding.value, newPasswordInp.binding.value)
		] : [];

	const validationMessages = [
		...validateFirstName(nameInp.binding.value),
		...validateLastName(lastNameInp.binding.value),
		...validateEmail(emailInp.binding.value),
		...passwordMsgs
	];

	const userAvatarUrl = user? 
		`${staticUrl}/avatars/${user?.id}.jpg`
		: `/default_ava.jpeg`;

	
    return {
        nameInp,
        lastNameInp,
        emailInp,
        passwordInp,
        newPasswordInp,
        validationMessages,
        selectedFile,
        imgInpRef,
		userAvatarUrl,
		errorStatus,
        onImgClick,
        onImgSelected,
		onImgError,
		onSend,
    };
}