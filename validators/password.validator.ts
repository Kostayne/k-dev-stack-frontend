export function validatePassword(val: string) {
    const res = [];

    if (val.length < 5) {
		res.push('Слишком короткий пароль.');
	}

	if (val.length > 16) {
		res.push('Слишком длинный пароль.');
	}

    return res;
}

export function validateConfirmPassword(oldVal: string, confirmVal: string) {
    const res = [];

    const oldValMsgs = validatePassword(oldVal);
	
	if (oldValMsgs.length > 0) {
		return oldValMsgs;
	}

    if (oldVal != confirmVal) {
        res.push('Пароли не совпадают.');
    }

    return res;
}

export function validateEditPassword(curVal: string, newVal: string) {
    const res = [];
    const curPassMsgs = validatePassword(curVal);
    const newPassMsgs = validatePassword(newVal);

    if (curVal == newVal) {
        res.push('Новый пароль равен текущему.');
    }

    if (curPassMsgs.length > 0) {
        res.push('Для текущего пароля');
        res.push(...curPassMsgs);
    }

    if (newPassMsgs.length > 0) {
        res.push('Для нового пароля');
        res.push(...newPassMsgs);
    }

    return res;
}