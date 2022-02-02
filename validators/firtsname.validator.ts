export function validateFirstName(val: string) {
    const res = [];

    if (val.length < 2) {
        res.push('Имя менее 2 символов.');
    }

    if (val.length > 15) {
        res.push('Имя более 15 символов.');
    }

    return res;
}