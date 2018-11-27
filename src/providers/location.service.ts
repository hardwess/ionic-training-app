import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class LocationService {

    constructor(private _http: HttpService, private geolocation: Geolocation) {

    }

    public async getPosition() : Promise<string> {
        try {
            let resp = await this.geolocation.getCurrentPosition();

            return `${resp.coords.latitude},${resp.coords.longitude}`
        } catch( e ) {
            return null;
        }
    }
}
