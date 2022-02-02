export function validateLastName(val: string) {
    const res = [];

    if (val.length < 2) {
        res.push('Фамилия менее 2 символов.');
    }

    if (val.length > 15) {
        res.push('Фамилия более 15 символов.');
    }

    return res;
}