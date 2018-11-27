import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PostsService {

    constructor(private _http: HttpService) {

    }


    public getPosts(page: number): Observable<any> {
        let url = `/posts?page=${page}&pageSize=4`;
        return this._http.get(url);
    }
}
