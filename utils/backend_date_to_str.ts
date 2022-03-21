export function backendDateToHuman(backendDate: string) {
    const date = new Date(backendDate);
    return date.toLocaleDateString('ru-RU');
}