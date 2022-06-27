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
    profileId?: any;
    ruralProducer?: boolean;
    type?: string;
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
    profileId?: any;
    ruralProducer?: boolean;
    type?: string;
}

export class UserList implements IUser {
    id?: any;
    name?: string;
    activated?: boolean;
    blocked?: boolean;
    type?: string;
    ruralProducer?: boolean;
}
