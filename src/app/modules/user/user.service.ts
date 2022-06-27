import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {IUser} from '../../shared/models/user.model';
import {Observable} from 'rxjs';
import {API_USERS_URL, DISABLE_GENERIC_ROUTE} from '../../app.constants';
import {createRequestOption} from '../../shared/util/request-utils';
import {IService} from '../../shared/services/i-service.service';

@Injectable({providedIn: 'root'})
export class UserService implements IService<IUser> {

    constructor(private readonly http: HttpClient) {
    }

    create(user: IUser): Observable<IUser> {
        return this.http.post<IUser>(`${API_USERS_URL}`, user);
    }

    query(params: any): Observable<HttpResponse<IUser[]>> {
        const options = createRequestOption(params);
        return this.http.get<IUser[]>(`${API_USERS_URL}`, {params: options, observe: 'response'});
    }

    getAll(params: any): Observable<HttpResponse<IUser[]>> {
        const options = createRequestOption(params);
        return this.http.get<IUser[]>(`${API_USERS_URL}`, {params: options, observe: 'response'});
    }

    find(id: any): Observable<IUser> {
        return this.http.get<IUser>(`${API_USERS_URL}/${id}`);
    }

    update(user: IUser): Observable<IUser> {
        return this.http.put<IUser>(`${API_USERS_URL}/${user.id}`, user);
    }

    delete(id: any): Observable<IUser> {
        return this.http.delete<IUser>(`${API_USERS_URL}/${id}${DISABLE_GENERIC_ROUTE}`);
    }

}
