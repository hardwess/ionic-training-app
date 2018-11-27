import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PostsService } from '../../providers/posts.service';

import { NewPostPage } from '../new-post/new-post';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    private page = 1;


    constructor(public navCtrl: NavController, private postsService: PostsService) {
        this.getPosts(this.page)
    }

    getPosts(page){
        this.postsService.getPosts(this.page).subscribe(
            res => {
                console.log(res);
            },error => {

            }
        );
    }


}
