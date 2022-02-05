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

export function validatePasswordPair(oldVal: string, confirmVal: string) {
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