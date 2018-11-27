import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, ToastController } from 'ionic-angular';

import { Post } from '../../providers/posts.service';
import { LocationService } from '../../providers/location.service';
import { CameraService } from '../../providers/camera.service';
import { PostsService } from '../../providers/posts.service';

@Component({
  selector: 'page-new-post',
  templateUrl: 'new-post.html'
})
export class NewPostPage {
    private subtitle: string = null;
    private useLocation: boolean = true;
    private photo: string = null;
    private isCamera: boolean = true;
    private post: Post;

    constructor(
        public navCtrl: NavController,
        private toastCtrl: ToastController,
        public navParams: NavParams,
        private locationSrv: LocationService,
        private cameraSrv: CameraService,
        private postsSvr: PostsService,
        private loadingCtrl: LoadingController) {
        this.isCamera = navParams.get('isCamera');

        let promise;
        if( this.isCamera ) {
            promise = this.cameraSrv.getFromCamera()
        } else {
            promise = this.cameraSrv.getFromAlbum();
        }
        promise.then( imgRaw => {
            this.photo = imgRaw;
        }).catch( error => {
            console.log(error);
            let toast = this.toastCtrl.create({
                message: 'Erro ao carregar foto',
                duration: 3000,
                position: 'top'
            });
            toast.present();

            this.navCtrl.pop();
        })
    }

    private async createPost() {
        let loading = this.loadingCtrl.create({
            content: 'Salvando...'
        });
        loading.present();

        let location = null;

        if (this.useLocation) {
            location = await this.locationSrv.getPosition();
        }

        this.post = new Post(
            this.subtitle,
            location,
            this.photo
        );

        console.log(this.post.getJSON());
        this.postsSvr.savePost(this.post)
        .then( res => {
            this.navCtrl.pop();
            loading.dismiss();
        }).catch( e => {
            console.log(e);

            let toast = this.toastCtrl.create({
                message: 'Erro ao salvar post',
                duration: 3000,
                position: 'top'
            });
            loading.dismiss();
            toast.present();
        });
    }

}
