/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { SuiviOf } from '../../models/suivi-of';

export interface GetAllSuiviOFs$Params {
  size?: number;
  page?: number;
  sort?: string;
  filter?: Array<string>;
  idOF: number;
}

export function getAllSuiviOFs(http: HttpClient, rootUrl: string, params: GetAllSuiviOFs$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<SuiviOf>>> {
  const rb = new RequestBuilder(rootUrl, getAllSuiviOFs.PATH, 'get');
  if (params) {
    rb.query('size', params.size, {});
    rb.query('page', params.page, {});
    rb.query('sort', params.sort, {});
    rb.query('filter', params.filter, {});
    rb.path('idOF', params.idOF, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<SuiviOf>>;
    })
  );
}

getAllSuiviOFs.PATH = '/api/v1/of_suivi/{idOF}';
