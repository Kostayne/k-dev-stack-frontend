export function joinValidationMessages(messages: string[]) {
    const filtered = messages.filter(m => Boolean(m));
    return filtered.join(' ');
}