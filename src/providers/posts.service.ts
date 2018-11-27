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


    public savePost(post : Post): Promise<any> {
        let url = `/posts`;
        return this._http.post(url, post.getJSON()).toPromise();
    }
}

export class Post {
    private subtitle : string = null;
    public location : string = null;
    public photo_url : string = null;
    public user: any = null;

    constructor(private pSubtitle:string, private pLocation:string, private pPhoto:string) {
        this.subtitle = pSubtitle;
        this.location = pLocation;
        this.photo_url = pPhoto;
    }

    getJSON() {
        return {
            subtitle : this.subtitle,
            location : this.location,
            photo : this.photo_url
        }
    }

}
