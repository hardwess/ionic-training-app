import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Injectable()
export class CameraService {

    private camOptions: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        allowEdit: true
    }

    constructor(private camera: Camera) {

    }

    async getFromCamera() {
        this.camOptions.sourceType = this.camera.PictureSourceType.CAMERA;
        try {
            let base64Pic = await this.camera.getPicture(this.camOptions)
            return 'data:image/jpeg;base64,' + base64Pic;
        } catch (error) {
            throw error;
        }
    }

    async getFromAlbum() {
        this.camOptions.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
        try {
            let base64Pic = await this.camera.getPicture(this.camOptions)
            return 'data:image/jpeg;base64,' + base64Pic;
        } catch (error) {
            throw error;
        }
    }
}
