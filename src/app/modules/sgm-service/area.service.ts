import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {ACTIVATED, API_AREAS_URL} from '../../app.constants';
import {createRequestOption} from '../../shared/util/request-utils';
import {IArea} from '../../shared/models/area.model';

@Injectable({
    providedIn: 'root'
})
export class AreaService {

    constructor(private readonly httpClient: HttpClient) {
    }

    getAll(params?: any): Observable<HttpResponse<IArea[]>> {
        const options = createRequestOption(params);
        return this.httpClient.get<IArea[]>(`${API_AREAS_URL}${ACTIVATED}`, {params: options, observe: 'response'});
    }

}
