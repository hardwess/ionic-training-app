import { HomePage } from './../home/home';
import { LoginService } from './../../providers/login.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { delay } from 'rxjs/operators';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    private user: string;
    private password: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private toastService: ToastController,
        private loadingCtrl: LoadingController,
        private loginService: LoginService) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

    doLogin() {
        let loading = this.loadingCtrl.create({
            content: 'Autenticando...'
        });
        loading.present();
        this.loginService.doLogin(this.user,this.password).pipe(delay(2000)).subscribe(res => {
            loading.dismiss();
            this.navCtrl.setRoot(HomePage, {user: res});
        },error => {
            debugger
            loading.dismiss();
            if(error.status === 0){
                this.showErrorToast('Sem conexão com a internet');
                return;
            }else if(error.status === 401){
                this.showErrorToast('Usuário ou senha incorretos');
                return;
            }
            this.showErrorToast('Erro inesperado');
        });
    }

    showErrorToast(message: string){
        let toast = this.toastService.create({
            message: message,
            position: 'top',
            duration: 4000
        });
        toast.present();
    }

}
