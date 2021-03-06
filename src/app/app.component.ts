import { SessionService } from './../providers/session.service';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any;

    constructor(
        private platform: Platform,
        private statusBar: StatusBar,
        private splashScreen: SplashScreen,
        private sessionService: SessionService) {
        this.init();
    }

    async init() {
        try {
            await this.platform.ready()
            this.statusBar.backgroundColorByHexString('#146b81');
            this.splashScreen.hide();
            await this.sessionService.loadSession();
            this.rootPage = HomePage;
        } catch (error) {
            this.rootPage = LoginPage;
            console.log(error);
        }
    }
}
