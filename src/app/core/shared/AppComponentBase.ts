import { Injector } from "@angular/core";
import { ApiService } from "../services/api/api.service";
import { AuthService } from "../services/auth.service";

export abstract class AppComponentBase {
    authService: AuthService;
    apiService: ApiService;
    constructor(injector: Injector) {
        this.authService = injector.get(AuthService);
        this.apiService = injector.get(ApiService);
    }

}