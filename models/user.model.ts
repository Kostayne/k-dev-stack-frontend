export interface UserModel {
    id: number;
    firstName: string;
    lastName: string;
    avatarName: string;
    email: string;
    isAdmin: boolean;
};

export interface UserCommentRefModel {
    id: number;
    firstName: string;
    lastName: string;
    avatarName: string;
};

export interface UserLoginModel {
    email: string;
    password: string;
}

export interface UserRegisterModel {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}