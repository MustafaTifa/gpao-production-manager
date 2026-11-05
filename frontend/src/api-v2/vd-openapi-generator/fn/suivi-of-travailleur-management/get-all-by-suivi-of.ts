/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SuiviOfTravailleur } from '../../models/suivi-of-travailleur';

export interface GetAllBySuiviOf$Params {
  suiviOfId: number;
}

export function getAllBySuiviOf(http: HttpClient, rootUrl: string, params: GetAllBySuiviOf$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<SuiviOfTravailleur>>> {
  const rb = new RequestBuilder(rootUrl, getAllBySuiviOf.PATH, 'get');
  if (params) {
    rb.path('suiviOfId', params.suiviOfId, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<SuiviOfTravailleur>>;
    })
  );
}

getAllBySuiviOf.PATH = '/api/v1/suivi_of_travailleur/suivi_of/{suiviOfId}';
