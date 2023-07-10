import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateShortUrlResponseModel } from './response-models/CreateShortUrlResponseModel';
import { GetShortUrlByIdResponseModel } from './response-models/GetShortUrlByIdResponseModel';

@Injectable({
    providedIn: 'root',
})
export class AddressService {
    private url = `${environment.baseApiUrl}addresses`;

    constructor(private http: HttpClient) {}

    public getUrlById(id: string): Observable<GetShortUrlByIdResponseModel> {
        let headers = new HttpHeaders();

        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('Accept', 'application/json');

        return this.http.get<GetShortUrlByIdResponseModel>(
            `${this.url}/${id}`,
            {
                headers,
            }
        );
    }

    public createUrl(
        original_address: string
    ): Observable<CreateShortUrlResponseModel> {
        const body = {
            original_address,
        };

        let headers = new HttpHeaders();

        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Access-Control-Allow-Origin', '*');

        return this.http.post<CreateShortUrlResponseModel>(this.url, body, {
            headers,
        });
    }

    public searchUrl(
        short_url: string
    ): Observable<GetShortUrlByIdResponseModel> {
        let headers = new HttpHeaders();

        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('Accept', 'application/json');

        const params = {
            short_url,
        };

        return this.http.get<GetShortUrlByIdResponseModel>(
            `${this.url}/search`,
            {
                params,
                headers: headers,
            }
        );
    }
}
