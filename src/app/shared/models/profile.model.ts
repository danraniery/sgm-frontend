import {IAuthority} from './authority.model';

export interface IProfile {
    id?: any;
    name?: string;
    description?: string;
    roles?: IAuthority[];
    activated?: boolean;
    onlyRead?: boolean;
}

export class Profile implements IProfile {
    id?: any;
    name?: string;
    description?: string;
    roles?: IAuthority[];
    activated?: boolean;
    onlyRead?: boolean;

    constructor(obj: any) {
        this.id = obj.id ? obj.id : undefined;
        this.name = obj.name ? obj.name : '';
        this.description = obj.description ? obj.description : '';
        this.roles = obj.roles ? obj.roles : [];
        this.activated = obj.activated ? obj.activated : false;
        this.onlyRead = obj.onlyRead ? obj.onlyRead : false;
    }

}
