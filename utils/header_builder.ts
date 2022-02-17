import { loadJwtFromLocalStore } from "./auth";

export class HeaderBuilder {
    public headers = new Headers();

    json() {
        this.headers.set('Content-Type', 'application/json');
        return this;
    }

    jwt() {
        const token = loadJwtFromLocalStore();
        this.headers.set('Authorization', `Bearer ${token}`);
        return this;
    }
}