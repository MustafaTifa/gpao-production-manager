import { Injectable } from "@angular/core";
import * as moment from "moment";
import { Subject } from "rxjs/internal/Subject";

@Injectable({ providedIn: 'root' })
export class SharedService {

    public tabChange$: Subject<null> = new Subject();

    constructor() { }

    fromJsonDate(jDate): string {
        if (jDate) {
            const bDate = moment(jDate).format('MM/DD/YYYY HH:mm:ss');
            return bDate
        } else {
            return ''
        }
    }

    toDate(jDate): string {
        if (jDate) {
            const bDate = moment(jDate).format('MM/DD/YYYY');
            return bDate
        } else {
            return ''
        }
    }
}