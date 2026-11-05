/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Workstation } from '../../models/workstation';

export interface GetWorkstationById$Params {
  id: number;
}

export function getWorkstationById(http: HttpClient, rootUrl: string, id: number, context?: HttpContext): Observable<StrictHttpResponse<Workstation>> {
  const rb = new RequestBuilder(rootUrl, getWorkstationById.PATH, 'get');
  if (id) {
    rb.path('id', id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Workstation>;
    })
  );
}

getWorkstationById.PATH = '/api/v1/workstation/{id}';
