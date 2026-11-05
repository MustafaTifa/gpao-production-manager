import { Injectable } from "@angular/core";

@Injectable()
export class BrowserUtilService {
    constructor(){}
    
    triggerResize(delay: number = 0) {
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, delay);
    }
}