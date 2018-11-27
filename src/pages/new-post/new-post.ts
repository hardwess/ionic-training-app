import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Post } from '../../providers/posts.service';
import { LocationService } from '../../providers/location.service';

@Component({
  selector: 'page-new-post',
  templateUrl: 'new-post.html'
})
export class NewPostPage {
    private subtitle: string = null;
    private useLocation: boolean = true;

    private post: Post;

    constructor(public navCtrl: NavController, private locationSrv: LocationService) {

    }

    private async createPost() {
        let location = null;

        if (this.useLocation) {
            location = await this.locationSrv.getPosition();
        }

        this.post = new Post(
            this.subtitle,
            location
        );

        console.log(this.post.getJSON());
    }

}
