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
            flatMap(res => this.sessionService.saveUserToStorage(res['token'], res['username'], res['name'], res['userId'], res['photo_url']))
        )
    }

    public changeProfilePic(imageB64: string){
        const body = {
            photo: imageB64
        }
        let url = '/users/photo';
        return this._http.put(url, body).pipe(
            flatMap(res => {
                return this.sessionService.updateUser(res['name'], res['photo_url']);
            })
        )
    }
}
