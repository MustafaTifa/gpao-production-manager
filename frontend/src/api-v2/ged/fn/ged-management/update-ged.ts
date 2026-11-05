/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Ged } from '../../models/ged';


export function updateGed(http: HttpClient, rootUrl: string, params: Ged, context?: HttpContext): Observable<StrictHttpResponse<Ged>> {
  const rb = new RequestBuilder(rootUrl, updateGed.PATH, 'put');
  if (params) {
    rb.body(params, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Ged>;
    })
  );
}

updateGed.PATH = '/api/v1/ged';
