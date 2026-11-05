/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SuiviOf } from '../../models/suivi-of';

export interface AddSuiviOf$Params {
      body: SuiviOf
}

export function addSuiviOf(http: HttpClient, rootUrl: string, params: AddSuiviOf$Params, context?: HttpContext): Observable<StrictHttpResponse<SuiviOf>> {
  const rb = new RequestBuilder(rootUrl, addSuiviOf.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<SuiviOf>;
    })
  );
}

addSuiviOf.PATH = '/api/v1/of_suivi';
