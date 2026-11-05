/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SuiviOfExtern } from '../../models/suivi-of-extern';

export interface GetAllSuiviOFs$Params {
  size?: number;
  page?: number;
  sort?: Array<string>;
  filter?: Array<string>;
}

export function getAllSuiviOFs(http: HttpClient, rootUrl: string, params: GetAllSuiviOFs$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<SuiviOfExtern>>> {
  const rb = new RequestBuilder(rootUrl, getAllSuiviOFs.PATH, 'get');
  if (params) {
    rb.query('size', params.size, {});
    rb.query('page', params.page, {});
    rb.query('sort', params.sort, {});
    rb.query('filter', params.filter, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<SuiviOfExtern>>;
    })
  );
}

getAllSuiviOFs.PATH = '/api/v1/of_suivi_extern';
