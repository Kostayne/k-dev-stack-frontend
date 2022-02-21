import { apiUrl } from "../cfg";
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
};

export const userFetch = new UserReq();