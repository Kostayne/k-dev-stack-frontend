import { apiUrl } from "../cfg";
import { RespInfo } from "../interfaces/resp_info";
import { UserEditNameModel, UserEditPassModel, UserLoginModel, UserModel, UserRegisterModel } from "../models/user.model";
import { HeaderBuilder } from "../utils/header_builder";

export class UserReq {
    register(data: UserRegisterModel) {
        return fetch(`${apiUrl}/user/`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new HeaderBuilder().json().headers
        });
    }

    login(data: UserLoginModel) {
        return fetch(`${apiUrl}/user/auth`, {
            method: 'POST',
            headers: new HeaderBuilder().json().headers,
            body: JSON.stringify(data)
        });
    }

    me = () => {
        return fetch(`${apiUrl}/user/me`, {
            headers: new HeaderBuilder().jwt().headers
        });
    }

    editName(data: UserEditNameModel) {
        return fetch(`${apiUrl}/user/name`, {
            method: 'PUT',
            headers: new HeaderBuilder().json().jwt().headers,
            body: JSON.stringify(data)
        });
    }

    editPassword(data: UserEditPassModel) {
        return fetch(`${apiUrl}/user/pass`, {
            method: 'PUT',
            headers: new HeaderBuilder().json().jwt().headers,
            body: JSON.stringify(data)
        });
    }

    editAvatar(file: File) {
        const fd = new FormData();
        fd.append('img', file);

        return fetch(`${apiUrl}/user/avatar`, {
            method: 'PUT',
            headers: new HeaderBuilder().jwt().headers,
            body: fd
        });
    }

    async setBanned(id: number, val: boolean): Promise<RespInfo> {
        const qb = new URLSearchParams();
        qb.append('id', id.toString());
        qb.append('value', val? 'true' : 'false');

        try {
            const resp = await fetch(`${apiUrl}/user/setBanned?${qb.toString()}`);

            if (!resp.ok) {
                return {
                    resp,
                    error: resp.statusText
                };
            }

            return {
                resp
            };
        } catch(e) {
            console.error(e);

            return {
                error: e as string
            };
        }
    }
};

export const userReq = new UserReq();