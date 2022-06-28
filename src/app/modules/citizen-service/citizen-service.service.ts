import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ACTIVATED, API_SERVICES_URL, DISABLE_GENERIC_ROUTE} from '../../app.constants';
import {createRequestOption} from '../../shared/util/request-utils';
import {IService} from '../../shared/services/i-service.service';
import {ISGMService} from '../../shared/models/sgm-service.model';

@Injectable({providedIn: 'root'})
export class CitizenServiceService implements IService<ISGMService> {

    constructor(private readonly http: HttpClient) {
    }

    create(user: ISGMService): Observable<ISGMService> {
        return this.http.post<ISGMService>(`${API_SERVICES_URL}`, user);
    }

    query(params: any): Observable<HttpResponse<ISGMService[]>> {
        const options = createRequestOption(params);
        return this.http.get<ISGMService[]>(`${API_SERVICES_URL}`, {params: options, observe: 'response'});
    }

    getAll(params: any): Observable<HttpResponse<ISGMService[]>> {
        const options = createRequestOption(params);
        return this.http.get<ISGMService[]>(`${API_SERVICES_URL}${ACTIVATED}/${params.id}`, {
            params: options,
            observe: 'response'
        });
    }

    find(id: any): Observable<ISGMService> {
        return this.http.get<ISGMService>(`${API_SERVICES_URL}/${id}`);
    }

    update(user: ISGMService): Observable<ISGMService> {
        return this.http.put<ISGMService>(`${API_SERVICES_URL}/${user.id}`, user);
    }

    delete(id: any): Observable<ISGMService> {
        return this.http.delete<ISGMService>(`${API_SERVICES_URL}/${id}${DISABLE_GENERIC_ROUTE}`);
    }

}
