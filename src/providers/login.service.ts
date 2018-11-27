import { SessionService } from './session.service';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, flatMap } from 'rxjs/operators';

@Injectable()
export class LoginService {

    constructor(private _http: HttpService, private sessionService: SessionService) {

    }


    public doLogin(user: string, password: string): Observable<any> {
        const body = {
            login: user,
            password: password
        }
        let url = '/authenticate';
        return this._http.post(url, body).pipe(
            flatMap(res => {
                return this.sessionService.saveUserToStorage(res['token'], res['username'], res['name'], res['userId']);
            })
        )
    }
}