import { LoginService } from './login.service';
import { SessionService } from './session.service';
import { HttpService } from './http.service';
import { PostsService } from './posts.service';
import { LocationService } from './location.service';
import { CameraService } from './camera.service';
import { Camera } from '@ionic-native/camera';
import { LaunchNavigator } from '@ionic-native/launch-navigator';

export const PROVIDERS = [
    PostsService,
    LoginService,
    SessionService,
    HttpService,
    LocationService,
    CameraService,
    Camera,
    LaunchNavigator
];
