import {IArea} from './area.model';
import {IUser} from './user.model';

export interface ISGMService {
    id?: any;
    path?: string;
    name?: string;
    activated?: boolean;
    areas?: IArea[];
    localPath?: boolean;
}

export class SGMService implements ISGMService {
    id?: any;
    path?: string;
    name?: string;
    activated?: boolean;
    areas?: IArea[];
    localPath?: boolean;
}

export class SGMServiceList implements ISGMService {
    id?: any;
    name?: string;
    activated?: boolean;
    path?: string;
}

export class SGMServiceCard implements IUser {
    id?: any;
    name?: string;
    path?: string;
    localPath?: boolean;
    activated?: boolean;
}