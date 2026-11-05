/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CFI } from '../../models/cfi';


export function updateCfi(http: HttpClient, rootUrl: string, params: CFI, context?: HttpContext): Observable<StrictHttpResponse<CFI>> {
  const rb = new RequestBuilder(rootUrl, updateCfi.PATH, 'put');
  if (params) {
    rb.body(params, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CFI>;
    })
  );
}

updateCfi.PATH = '/api/v1/cfi';
