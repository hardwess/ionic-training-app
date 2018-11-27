import { LoginService } from './../../providers/login.service';
import { CameraService } from './../../providers/camera.service';
import { SessionService } from './../../providers/session.service';
import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, Toast, ToastController, LoadingController, Content } from 'ionic-angular';
import { PostsService, Post } from '../../providers/posts.service';
import { NewPostPage } from '../new-post/new-post';
import { LaunchNavigatorOptions, LaunchNavigator } from '@ionic-native/launch-navigator';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    @ViewChild(Content) content: Content;
    private userName: string;
    private profile_pic: string;

    private page = 1;

    private hasNext: boolean = false;
    private posts: Post[] = [];

    constructor(
        public navCtrl: NavController,
        private postsService: PostsService,
        private sessionService: SessionService,
        private alertCtrl: AlertController,
        private toastCtrl: ToastController,
        private loadingCtrl: LoadingController,
        private loginService: LoginService,
        private launchNavigator: LaunchNavigator,
        private cameraService: CameraService) {
        this.getPosts();
    }

    ionViewDidLoad() {
        this.userName = this.sessionService.name;
        this.profile_pic = this.sessionService.profile_pic;
    }

    getPosts() {
        if( this.page == 1 ) {
            this.posts = [];
        }
        this.postsService.getPosts(this.page).subscribe(
            res => {
                this.hasNext = res.hasNext;

                for( let i = 0; i < res.posts.length; i++ ) {
                    let post = res.posts[i];
                    post.photo_url = "http://thfservices.totvs.com.br:8085" + post.photo_url;
                    if( post.user.photo_url )
                        post.user.photo_url = "http://thfservices.totvs.com.br:8085" + post.user.photo_url;

                    this.posts.unshift(post);
                }
            }, error => {
                let toast = this.toastCtrl.create({
                    message: 'Erro ao carregar posts',
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            }
        );
    }

    askForChangeProfilePic() {
        let alert = this.alertCtrl.create({
            title: 'Alterar a foto de perfil',
            buttons: [

                {
                    text: 'Tirar Foto',
                    handler: () => {
                        this.changeProfilePicture('Camera');
                    }
                },
                {
                    text: 'Selecionar do Álbum',
                    handler: () => {
                        this.changeProfilePicture('Álbum');
                    }
                },
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
            ]
        });
        alert.present();
    }

    async changeProfilePicture(from: string) {
        try {
            let imageB64 = from === 'Camera' ? await this.cameraService.getFromCamera() : await this.cameraService.getFromAlbum();
            let loading = this.loadingCtrl.create({
                content: 'Enviando Foto'
            });
            loading.present();
            this.loginService.changeProfilePic(imageB64).subscribe(res => {
                this.profile_pic = res['profile_pic'];
                loading.dismiss();
            }, error => {
                loading.dismiss();
                let toast = this.toastCtrl.create({
                    message: 'Erro ao enviar a foto',
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            });
        } catch (error) {
            let toast = this.toastCtrl.create({
                message: 'Não foi possível abrir a câmera!',
                duration: 3000,
                position: 'top'
            });
            toast.present();
        }


    }

    doRefresh(ev){
        this.page = 1;
        this.getPosts();
    }

    private navigate() {
        let options: LaunchNavigatorOptions = {};
        this.launchNavigator.navigate('Diadema, SP', options)
            .then(
                success => console.log('Launched navigator'),
                error => console.log('Error launching navigator', error)
            );
    }

    scrollToTop(fab){
        fab.close();
        this.content.scrollToTop();
    }

    newPost(isCamera) {
        this.navCtrl.push(NewPostPage, { isCamera: isCamera});
    }

    doInfinite(infiniteScroll) {
        console.log('infinite');
        infiniteScroll.complete();
        if( this.hasNext ) {
            this.page++;
            this.getPosts();
        }
    }
}
