import { SessionService } from './session.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpService {
    private _server = 'http://thfservices.totvs.com.br:8085';
    constructor(private http: HttpClient, private sessionService: SessionService) {

    }

    public get(path: string) {
        const url = `${this._server}${path}`
        let headers: HttpHeaders = new HttpHeaders();
        if(this.sessionService.token){
            headers = headers.set('authorization',this.sessionService.token);
        }
        return this.http.get(url,{ headers: headers});
    }

    public post(path: string, body: any) {
        const url = `${this._server}${path}`
        let headers: HttpHeaders = new HttpHeaders();
        if(this.sessionService.token){
            headers = headers.set('authorization',this.sessionService.token);
        }
        return this.http.post(url, body,{ headers: headers})
    }

    public put(path: string, body: any) {
        const url = `${this._server}${path}`
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.set('authorization',this.sessionService.token);
        return this.http.put(url, body,{ headers: headers})
    }
}
