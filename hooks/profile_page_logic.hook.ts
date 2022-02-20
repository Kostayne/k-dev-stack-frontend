import { useRef, useState } from "react";
import { validateEmail } from "../validators/email.validator";
import { validateFirstName } from "../validators/firtsname.validator";
import { validateLastName } from "../validators/lastname.validator";
import { validatePasswordPair } from "../validators/password.validator";
import { useSyntheticInput } from "./input_synthetic.hook";

export function useProfilePageLogic() {
    const nameInp = useSyntheticInput();
	const lastNameInp = useSyntheticInput();
	const emailInp = useSyntheticInput();
	const passwordInp = useSyntheticInput();
	const newPasswordInp = useSyntheticInput();
	const imgInpRef = useRef<HTMLInputElement>(null);
	const [selectedFile, setSelectedFile] = useState('');

	const onImgClick = () => {
		imgInpRef.current?.click();
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

    return {
        nameInp,
        lastNameInp,
        emailInp,
        passwordInp,
        newPasswordInp,
        validationMessages,
        selectedFile,
        imgInpRef,
        onImgClick,
        onImgSelected,
    };
}