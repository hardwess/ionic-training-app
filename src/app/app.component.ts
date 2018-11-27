import { SessionService } from './../providers/session.service';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { NewPostPage } from '../pages/new-post/new-post';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any;

    constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen, private sessionService: SessionService) {
        this.init();
    }


    async init() {
        try {
            await this.platform.ready()
            await this.sessionService.loadSession();
            this.rootPage = HomePage;
        } catch (error) {
            this.rootPage = LoginPage;
            console.log(error);
        }
        this.statusBar.styleDefault();
        this.splashScreen.hide();

    }
}
