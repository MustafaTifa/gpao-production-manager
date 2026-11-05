/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Gamme } from '../../models/gamme';

export interface GetAllGammes$Params {
  size?: number;
  page?: number;
  sort?: Array<string>;
  filters?: Array<string>;
  id:number;
}

export function getAllGammes(http: HttpClient, rootUrl: string, params?: GetAllGammes$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Gamme>>> {
  console.log('gammesss');
  const rb = new RequestBuilder(rootUrl, getAllGammes.PATH, 'get');
  if (params) {
    rb.query('size', params.size, {});
    rb.query('page', params.page, {});
    rb.query('sort', params.sort, {});
    rb.query('filter', params.filters, {});
    rb.path('id',params.id);
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Gamme>>;
    })
  );
}

getAllGammes.PATH = '/api/v1/gamme/{id}';
