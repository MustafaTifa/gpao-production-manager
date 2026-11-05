/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Travailleur } from '../../models/travailleur';


export function addTravailleur(http: HttpClient, rootUrl: string, params: Travailleur, context?: HttpContext): Observable<StrictHttpResponse<Travailleur>> {
  const rb = new RequestBuilder(rootUrl, addTravailleur.PATH, 'post');
  if (params) {
    rb.body(params, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Travailleur>;
    })
  );
}

addTravailleur.PATH = '/api/v1/travailleur';
