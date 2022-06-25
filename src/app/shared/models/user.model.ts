import {IProfile} from './profile.model';

export interface IUser {
    id?: any;
    username?: string;
    name?: string;
    password?: string;
    confirmPassword?: string;
    activated?: boolean;
    blocked?: boolean;
    createdDate?: string;
    profile?: IProfile;
}

export class User implements IUser {
    id?: any;
    username?: string;
    name?: string;
    password?: string;
    confirmPassword?: string;
    activated?: boolean;
    blocked?: boolean;
    createdDate?: string;
    profile?: IProfile;
}

export class UserList implements IUser {
    id?: any;
    name?: string;
    activated?: boolean;
    blocked?: boolean;
}
