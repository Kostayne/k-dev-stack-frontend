const jwtStorageKey = 'kdevstack_token';

export function saveJwtToLocalStore(val: string) {
    localStorage.setItem(jwtStorageKey, val);
}

export function loadJwtFromLocalStore() {
    if (typeof window == 'undefined') {
        return undefined;
    }
    
    return localStorage.getItem(jwtStorageKey);
}