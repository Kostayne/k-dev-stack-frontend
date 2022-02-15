import { loadJwtFromLocalStore } from "./auth";

export function getJwtHeader() {
    const h = new Headers();
    const token = loadJwtFromLocalStore();
    if (!token) { return h; }

    h.append('Autorization', token);
    return h;
}