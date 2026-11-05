/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SuiviOfExtern } from '../../models/suivi-of-extern';

export interface UpdateSuiviOf$Params {
      body: SuiviOfExtern
}

export function updateSuiviOf(http: HttpClient, rootUrl: string, params: UpdateSuiviOf$Params, context?: HttpContext): Observable<StrictHttpResponse<SuiviOfExtern>> {
  const rb = new RequestBuilder(rootUrl, updateSuiviOf.PATH, 'put');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<SuiviOfExtern>;
    })
  );
}

updateSuiviOf.PATH = '/api/v1/of_suivi_extern';
