export interface IAuthority {
    key?: string;
    name?: string;
    description?: string;
}

export class Authority implements IAuthority {
    key?: string;
    name?: string;
    description?: string;

    constructor(obj: any) {
        this.key = obj.key ? obj.key : null;
        this.name = obj.name ? obj.name : null;
        this.description = obj.description ? obj.description : null;
    }

}
