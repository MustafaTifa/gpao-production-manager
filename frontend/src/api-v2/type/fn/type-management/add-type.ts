/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Type } from '../../models/type';


export function addType(http: HttpClient, rootUrl: string, params: Type, context?: HttpContext): Observable<StrictHttpResponse<Type>> {
  const rb = new RequestBuilder(rootUrl, addType.PATH, 'post');
  if (params) {
    rb.body(params, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Type>;
    })
  );
}

addType.PATH = '/api/v1/type';
