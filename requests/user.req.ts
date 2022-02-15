import { projectCfg } from "../cfg";
import { UserLoginModel, UserModel, UserRegisterModel } from "../models/user.model";
import { getJwtHeader } from "../utils/get_jwt_header";

export class UserReq {
    protected api = projectCfg.getApiUrl();

    register(data: UserRegisterModel) {
        return fetch(`${this.api}/user/auth`, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    login(data: UserLoginModel) {
        return fetch(`${this.api}/user/auth`, {
            method: 'POST',
            headers: getJwtHeader(),
            body: JSON.stringify(data)
        });
    }

    me = () => {
        return fetch(`${this.api}/user/me`, {
            
        });
    }

    edit(data: UserModel) {
        return fetch(`${this.api}/user/auth`, {
            method: 'POST',
            headers: getJwtHeader(),
            body: JSON.stringify(data)
        });
    }
};

export const userFetch = new UserReq();