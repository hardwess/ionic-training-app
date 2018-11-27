import { LoginService } from './login.service';
import { SessionService } from './session.service';
import { HttpService } from './http.service';
import { PostsService } from './posts.service';

export const PROVIDERS = [
    PostsService,
    LoginService,
    SessionService,
    HttpService
];
