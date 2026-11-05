/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OfExtern } from '../../models/of-extern';

export interface UpdateOfExtern$Params {
      body: OfExtern
}

export function updateOfExtern(http: HttpClient, rootUrl: string, params: UpdateOfExtern$Params, context?: HttpContext): Observable<StrictHttpResponse<OfExtern>> {
  const rb = new RequestBuilder(rootUrl, updateOfExtern.PATH, 'put');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<OfExtern>;
    })
  );
}

updateOfExtern.PATH = '/api/v1/of_extern';
