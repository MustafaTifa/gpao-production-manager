/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OfExtern } from '../../models/of-extern';


export function updateOfExtern(http: HttpClient, rootUrl: string, params: OfExtern, context?: HttpContext): Observable<StrictHttpResponse<OfExtern>> {
  const rb = new RequestBuilder(rootUrl, updateOfExtern.PATH, 'put');
  if (params) {
    rb.body(params, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<OfExtern>;
    })
  );
}

updateOfExtern.PATH = '/api/v1/of_extern';
