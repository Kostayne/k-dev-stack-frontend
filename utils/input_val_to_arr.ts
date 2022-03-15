export function inputValToArr(val: string): string[] {
    if (val == '') {
        return [];
    }

    return val.split(', ');
}