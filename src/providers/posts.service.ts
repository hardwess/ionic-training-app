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

export class Post {
    private subtitle : string = null;
    public location : string = null;
    public photo : string = null;

    constructor(private pSubtitle:string, private pLocation:string) {
        this.subtitle = pSubtitle;
        this.location = pLocation;
    }

    getJSON() {
        return {
            subtitle : this.subtitle,
            location : this.location,
            photo : this.photo
        }
    }
}
