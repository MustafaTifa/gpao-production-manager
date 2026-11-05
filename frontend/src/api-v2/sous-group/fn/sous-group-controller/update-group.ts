/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SousGroupe } from '../../models/sous-groupe';

export function updateGroup(http: HttpClient, rootUrl: string, params: SousGroupe, context?: HttpContext): Observable<StrictHttpResponse<SousGroupe>> {
  const rb = new RequestBuilder(rootUrl, updateGroup.PATH, 'put');
  if (params) {
    rb.body(params, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<SousGroupe>;
    })
  );
}

updateGroup.PATH = '/api/v1/sous-group';
