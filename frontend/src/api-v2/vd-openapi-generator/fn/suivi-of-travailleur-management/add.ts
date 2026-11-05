/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SuiviOfTravailleur } from '../../models/suivi-of-travailleur';

export interface Add$Params {
      body: SuiviOfTravailleur
}

export function add(http: HttpClient, rootUrl: string, params: Add$Params, context?: HttpContext): Observable<StrictHttpResponse<SuiviOfTravailleur>> {
  const rb = new RequestBuilder(rootUrl, add.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<SuiviOfTravailleur>;
    })
  );
}

add.PATH = '/api/v1/suivi_of_travailleur';
