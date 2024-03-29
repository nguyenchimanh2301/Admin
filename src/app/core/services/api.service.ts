import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    public host = environment.BASE_API;
    constructor(private _http: HttpClient, public router: Router) { }

    public post(url: string, obj: any) {
        const body = JSON.stringify(obj);
        let cloneHeader: any = {};
        cloneHeader['Content-Type'] = 'application/json';
        const headerOptions = new HttpHeaders(cloneHeader);
        return this._http
            .post<any>(this.host + url, body, { headers: headerOptions })
            .pipe(
                map((res: any) => {
                    return res;
                })
            );
    }

    public get(url: string) {
        let cloneHeader: any = {};
        cloneHeader['Content-Type'] = 'application/json';
        const headerOptions = new HttpHeaders(cloneHeader);

        return this._http
            .get(this.host + url, { headers: headerOptions })
            .pipe(
                map((res: any) => {
                    return res;
                })
            );

    }
    public uploadFileSingle(url: string, folder: string, file: Blob) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);
        return this._http.post(this.host + url, formData, {reportProgress: true, observe: 'events' })
    }

    public uploadFileMulti(url: string, folder: string, ...file: Blob[]) {
        const formData = new FormData();
        file.forEach(x => {
            formData.append('files', x);
        });
        formData.append('folder', folder);
        return this._http.post(this.host + url, formData, { reportProgress: true, observe: 'events' })
    }
}
