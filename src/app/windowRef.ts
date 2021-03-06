import { Injectable, Inject, PLATFORM_ID, Injector, InjectionToken } from '@angular/core';
import { Request } from 'express';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class WindowRef {
    private _window;
    constructor(@Inject(PLATFORM_ID) platformId, private injector: Injector) {
        if (!isPlatformBrowser(platformId)) {
            const req: any = this.injector.get(this.injector.get(USERAGENTTOKEN));
            this._window = {navigator: {userAgent: req.get('User-Agent')}};
        } else {
            this._window = window;
        }
    }

    get nativeWindow(): any {
        return this._window;
    }
}

export const USERAGENTTOKEN = new InjectionToken('requestToken');
