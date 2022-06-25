export interface IAccount {
    name?: string;
    username?: string;
    profile?: string;
    authorities?: string[];
    updatePassword?: boolean;
}

export class Account implements IAccount {
    name?: string;
    username?: string;
    profile?: string;
    authorities?: string[];
    updatePassword?: boolean;
}
