const jwtStorageKey = 'kdevstack_token';

export function saveJwtToLocalStore(val: string) {
    localStorage.setItem(jwtStorageKey, val);
}

export function loadJwtFromLocalStore() {
    return localStorage.getItem(jwtStorageKey);
}