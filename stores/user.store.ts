import { makeAutoObservable, runInAction } from "mobx";
import { UserModel } from "../models/user.model";
import { loadJwtFromLocalStore, saveJwtToLocalStore } from '../utils/auth';
import { userFetch, UserReq } from '../requests/user.req';

export class UserStore {
    protected fetcher: UserReq;
    public userData: UserModel | null = null;
    public isLoading: boolean = false;

    constructor(fetcher: UserReq) {
        this.fetcher = fetcher;
        makeAutoObservable(this, {}, { autoBind: true });
    }

    protected resetState() {
        this.isLoading = false;
        this.userData = null;
    }

    logOut() {
        this.userData = null;
        saveJwtToLocalStore('');
    }

    async loadUserFromServer() {
        const token = loadJwtFromLocalStore();
        this.isLoading = true;

        if (!token) {
            this.resetState();
            return;
        }

        try {
            const resp = await this.fetcher.me();

            if (!resp.ok) {
                console.warn('User/me');
                console.warn(resp.statusText);
                this.resetState();
                return;
            }

            const parsedUserData = await resp.json();

            runInAction(() => {
                this.userData = parsedUserData;
                this.isLoading = false;
            });
        } catch(e) {
            console.group('Load user from server action');
            console.error(e);
            console.groupEnd();
            this.resetState();
        }
    }

    async login(email: string, password: string) {
        try {
            const resp = await this.fetcher.login({
                email,
                password
            });

            if (resp.ok) {
                const newToken = await resp.text();
                saveJwtToLocalStore(newToken);

                await this.loadUserFromServer();
            }

            return resp.status;

        } catch(e) {
            console.error(e);
            return 500;
        }
    }
}

export const userStore = new UserStore(userFetch);