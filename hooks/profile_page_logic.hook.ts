import React, { useEffect, useRef, useState } from "react";
import { staticUrl } from "../cfg";
import { validateEmail } from "../validators/email.validator";
import { validateFirstName } from "../validators/firtsname.validator";
import { validateLastName } from "../validators/lastname.validator";
import { validateEditPassword } from "../validators/password.validator";
import { useSyntheticInput } from "./input_synthetic.hook";
import { userStore } from "../stores/user.store";
import { userFetch } from "../requests/user.req";
import { useRouter } from "next/router";
import { ActionStatusInfo } from "../interfaces/base_action_status";
import { UserModel } from "../models/user.model";

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
	const [status, setStatus] = useState<ActionStatusInfo>({ type: 'none', text: '' });
	// const router = useRouter();
	const user = userStore.userData;

	const curPass = passwordInp.binding.value;
	const newPass = newPasswordInp.binding.value;
	const firstName = nameInp.binding.value;
	const lastName = lastNameInp.binding.value;
	const email = emailInp.binding.value;

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
		tg.src = `/default_ava.jpeg`;
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
		if (!user) {
			console.error('User required');
			return;
		}

		if (validationMessages.length > 0) {
			return;
		}

		let passRes: Response | null = null;
		let nameRes: Response | null = null;
		let avatarRes: Response | null = null;
		const errorMessages = [];

		try {
			if (curPass) {
				passRes = await userFetch.editPassword({
					curPass,
					newPass
				});
			}

			if (selectedFile) {
				const img = selectedFile as unknown as File;
				avatarRes = await userFetch.editAvatar(img);

				if (avatarRes.ok) {
					user.avatarName = user.id + '.jpg';
				}
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

				if (nameRes.ok) {
					const resJson = await nameRes.json() as UserModel;
					user.firstName = resJson.firstName;
					user.lastName = resJson.lastName;
				}
			}

			if (nameRes && !nameRes.ok) {
				errorMessages.push('При измении имени / фамилии произошла ошибка.');
			}

			if (passRes && !passRes.ok) {
				if (passRes.status == 401) {
					errorMessages.push('Неправильный текущий пароль');
				} else {
					errorMessages.push('При измении пароля произошла ошибка.');
				}
			}

			if (avatarRes && !avatarRes.ok) {
				errorMessages.push('Ошибка при загрузке изображения.');
			}

			if (!errorMessages) {
				setStatus({
					type: 'success',
					text: 'Успешно!'
				});

				// router.push('/');
				return;
			}

			setStatus({
				type: 'error',
				text: errorMessages.join(' ')
			});
		}

		catch(e) {
			console.log('Error in edit user res');
			console.error(e);
			setStatus({
				type: 'error',
				text: 'Произошла ошибка при отправке, попробуйте снова!'
			});
		}
	}

	const passwordInputsAreFilled = curPass.length > 0 || newPass.length > 0;
	const passwordValidationMsgs = passwordInputsAreFilled? validateEditPassword(curPass, newPass) : [];
	const emailValidationMsgs = email.length > 0? validateEmail(email) : [];
	const firstNameValidationMsgs = firstName.length > 0? validateFirstName(firstName) : [];
	const lastNameValidationMsgs = lastName.length > 0? validateLastName(lastName) : [];

	const validationMessages = [
		...firstNameValidationMsgs,
		...lastNameValidationMsgs,
		...emailValidationMsgs,
		...passwordValidationMsgs
	];

	const userAvatarUrl = `${staticUrl}/avatars/${user?.avatarName}`;

	const allInputsAreEmpty = [
		email,
		curPass,
		newPass,
		firstName,
		lastName
	].every((v) => v == '') && !selectedFile;

	// default values
	let allInputsAreDefault = false;

	if (user) {
		if (user.email == email && user.firstName == firstName && user.lastName == lastName) {
			allInputsAreDefault = true;
		}

		if (selectedFile) {
			allInputsAreDefault = false;
		}
	}

	let disableSendBtn = false;

	if (validationMessages.length > 0) {
		disableSendBtn = true;
	}

	if (allInputsAreDefault) {
		if (!curPass) {
			disableSendBtn = true;
		}
	}

	if (allInputsAreEmpty) {
		disableSendBtn = true;
	}

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
		disableSendBtn,
		status,
        onImgClick,
        onImgSelected,
		onImgError,
		onSend,
    };
}