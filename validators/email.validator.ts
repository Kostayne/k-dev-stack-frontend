export function validateEmail(val: string) {
    const res = [];

	if (!val.includes('@')) {
		res.push('В почте нет символа @.');
	}

	if (!val.includes('.')) {
		res.push('Почта без точки.');
	}

    if (val.length < 5) {
		res.push('Слишком короткая почта.');
	}

	if (val.length > 25) {
		res.push('Слишком длинная почта.');
	}

    return res;
}