import { Storage } from '@ionic/storage';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {
    public token: string;
    public name: string;
    public profile_pic: string;
    constructor(private storage: Storage) {

    }

    public async loadSession(): Promise<any> {
        this.token = await this.storage.get('token');
        this.name = await this.storage.get('name');
        this.profile_pic = await this.storage.get('profile_pic');
        if(this.profile_pic){
            this.profile_pic = 'http://thfservices.totvs.com.br:8085' + this.profile_pic;
        }
        // const userId = await this.storage.get('userId');
        if (this.token && this.name) {
            return true;
        }
        throw 'usuário não autenticado';
    }

    public async saveUserToStorage(token: string, username?: string, name?: string, userId?: string, photo_url?: string) {
        await this.storage.set('token', token);
        this.token = token;
        if (username) {
            await this.storage.set('username', username);
        }
        if (photo_url) {
            await this.storage.set('profile_pic', photo_url);
            this.profile_pic = 'http://thfservices.totvs.com.br:8085' + photo_url;;
        }
        if (name) {
            await this.storage.set('name', name);
            this.name = name;
        }
        if (userId) {
            await this.storage.set('userId', userId);
        }
        return {
            username: username,
            name: name,
            userId: userId,
            profile_pic: photo_url
        }
    }


    public async updateUser(name: string, photo_url?: string) {
        if (photo_url) {
            await this.storage.set('profile_pic', photo_url);
            this.profile_pic = 'http://thfservices.totvs.com.br:8085' + photo_url;
        }
        if (name) {
            await this.storage.set('name', name);
            this.name = name;
        }
        return {
            name: name,
            profile_pic: this.profile_pic
        }
    }

    public async clearSession(): Promise<any> {
        return await this.storage.clear();
    }


}
