/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Engin } from '../../models/engin';

export interface GetEnginById$Params {
  id: number;
}

export function getEnginById(http: HttpClient, rootUrl: string, params: GetEnginById$Params, context?: HttpContext): Observable<StrictHttpResponse<Engin>> {
  const rb = new RequestBuilder(rootUrl, getEnginById.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Engin>;
    })
  );
}

getEnginById.PATH = '/api/v1/engin/{id}';
