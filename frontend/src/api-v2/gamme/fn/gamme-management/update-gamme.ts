/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Gamme } from '../../models/gamme';


export function updateGamme(http: HttpClient, rootUrl: string, params: Gamme, context?: HttpContext): Observable<StrictHttpResponse<Gamme>> {
  const rb = new RequestBuilder(rootUrl, updateGamme.PATH, 'put');
  if (params) {
    rb.body(params, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Gamme>;
    })
  );
}

updateGamme.PATH = '/api/v1/gamme';
