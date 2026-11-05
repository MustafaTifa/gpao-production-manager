/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SuiviOfTravailleur } from '../../models/suivi-of-travailleur';

export interface GetById$Params {
  id: number;
}

export function getById(http: HttpClient, rootUrl: string, params: GetById$Params, context?: HttpContext): Observable<StrictHttpResponse<SuiviOfTravailleur>> {
  const rb = new RequestBuilder(rootUrl, getById.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
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

getById.PATH = '/api/v1/suivi_of_travailleur/{id}';
