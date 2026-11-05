/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Groupe } from '../../models/groupe';

export interface GetGroupById$Params {
  id: number;
}

export function getGroupById(http: HttpClient, rootUrl: string, params: GetGroupById$Params, context?: HttpContext): Observable<StrictHttpResponse<Groupe>> {
  const rb = new RequestBuilder(rootUrl, getGroupById.PATH, 'get');
  if (params) {
    rb.query('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Groupe>;
    })
  );
}

getGroupById.PATH = '/api/v1/group/{id}';
