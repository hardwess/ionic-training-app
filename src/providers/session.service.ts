import { Storage } from '@ionic/storage';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {
    public token: string;
    public name: string;
    constructor(private storage: Storage) {

    }

    public async loadSession(): Promise<any> {
        this.token = await this.storage.get('token');
        this.name = await this.storage.get('name');
        // const userId = await this.storage.get('userId');
        if (this.token && this.name) {
            return true;
        }
        throw 'usuário não autenticado';
    }

    public async saveUserToStorage(token: string, username?: string, name?: string, userId?: string) {
        await this.storage.set('token', token);
        this.token = token;
        if (username) {
            await this.storage.set('username', username);
        }
        if (name) {
            await this.storage.set('name', name);
        }
        if (userId) {
            await this.storage.set('userId', userId);
        }
        return {
            username: username,
            name: name,
            userId: userId
        }
    }

}
