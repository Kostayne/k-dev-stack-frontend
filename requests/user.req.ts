import { apiUrl } from "../cfg";
import { UserLoginModel, UserModel, UserRegisterModel } from "../models/user.model";
import { HeaderBuilder } from "../utils/header_builder";

export class UserReq {
    register(data: UserRegisterModel) {
        return fetch(`${apiUrl}/user/auth`, {
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
            
        });
    }

    edit(data: UserModel) {
        return fetch(`${apiUrl}/user/auth`, {
            method: 'POST',
            headers: new HeaderBuilder().json().jwt().headers,
            body: JSON.stringify(data)
        });
    }
};

export const userFetch = new UserReq();