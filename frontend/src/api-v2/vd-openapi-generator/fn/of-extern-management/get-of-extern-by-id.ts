/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OfExtern } from '../../models/of-extern';

export interface GetOfExternById$Params {
  id: string;
}

export function getOfExternById(http: HttpClient, rootUrl: string, params: GetOfExternById$Params, context?: HttpContext): Observable<StrictHttpResponse<OfExtern>> {
  const rb = new RequestBuilder(rootUrl, getOfExternById.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
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

getOfExternById.PATH = '/api/v1/of_extern/{id}';
