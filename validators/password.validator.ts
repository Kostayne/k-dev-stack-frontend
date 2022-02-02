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

export function validatePasswordPair(val: string, val2: string) {
    const res = [];

    if (val.length < 5) {
		res.push('Слишком короткий пароль.');
	}

	if (val.length > 16) {
		res.push('Слишком длинный пароль.');
	}

    if (val != val2) {
        res.push('Пароли не совпадают.');
    }

    return res;
}