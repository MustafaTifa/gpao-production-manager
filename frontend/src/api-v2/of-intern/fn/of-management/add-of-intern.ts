/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OfIntern } from '../../models/of-intern';


export function addOfIntern(http: HttpClient, rootUrl: string, params: OfIntern, context?: HttpContext): Observable<StrictHttpResponse<OfIntern>> {
  const rb = new RequestBuilder(rootUrl, addOfIntern.PATH, 'post');
  if (params) {
    rb.body(params, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<OfIntern>;
    })
  );
}

addOfIntern.PATH = '/api/v1/of_intern';
