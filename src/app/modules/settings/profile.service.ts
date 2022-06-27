import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {IProfile} from '../../shared/models/profile.model';
import {IAuthority} from '../../shared/models/authority.model';
import {ACTIVATED, API_PROFILE_URL, SERVER_API_URL} from '../../app.constants';
import {createRequestOption} from '../../shared/util/request-utils';
import {IService} from '../../shared/services/i-service.service';

@Injectable({
    providedIn: 'root'
})
export class ProfileService implements IService<IProfile> {
    private readonly resourceUrl = SERVER_API_URL + API_PROFILE_URL;

    constructor(private readonly httpClient: HttpClient) {
    }

    query(params?: any): Observable<HttpResponse<IProfile[]>> {
        const options = createRequestOption(params);
        return this.httpClient.get<IProfile[]>(this.resourceUrl, {params: options, observe: 'response'});
    }

    getAll(params?: any): Observable<HttpResponse<IProfile[]>> {
        const options = createRequestOption(params);
        return this.httpClient.get<IProfile[]>(`${this.resourceUrl}${ACTIVATED}`, {params: options, observe: 'response'});
    }

    getAllAuthorities(): Observable<IAuthority[]> {
        return this.httpClient.get<IProfile[]>(`${this.resourceUrl}/roles`);
    }

    create(profile: IProfile): Observable<IProfile> {
        return this.httpClient.post<IProfile>(`${this.resourceUrl}`, profile);
    }

    update(profile: IProfile): Observable<IProfile> {
        return this.httpClient.put<IProfile>(`${this.resourceUrl}/${profile.id}`, profile);
    }

    find(profileId: number): Observable<IProfile> {
        return this.httpClient.get<IProfile>(`${this.resourceUrl}/${profileId}`);
    }

    delete(profileId: number): Observable<IProfile> {
        return this.httpClient.delete(`${this.resourceUrl}/${profileId}/logic`);
    }

}
