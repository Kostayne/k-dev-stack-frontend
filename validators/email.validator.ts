export function validateEmail(val: string) {
    const res = [];

    if (val.length < 5) {
		res.push('Слишком короткая почта.');
	}

	if (val.length > 16) {
		res.push('Слишком длинная почта.');
	}

	if (!val.includes('@')) {
		res.push('Нет символа @.');
	}

    return res.join(' ');
}