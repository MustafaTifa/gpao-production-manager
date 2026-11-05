/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Nomenclature } from '../../models/nomenclature';

export interface GetAllNomenclatures$Params {
  size?: number;
  page?: number;
  sort?: Array<string>;
  id: number;
}

export function getAllNomenclatures(http: HttpClient, rootUrl: string, params: GetAllNomenclatures$Params, context?: HttpContext): Observable<StrictHttpResponse<Nomenclature>> {
  const rb = new RequestBuilder(rootUrl, getAllNomenclatures.PATH, 'get');
  if (params) {
    rb.query('size', params.size, {});
    rb.query('page', params.page, {});
    rb.query('sort', params.sort, {});
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Nomenclature>;
    })
  );
}

getAllNomenclatures.PATH = '/api/v1/nomenclature/{id}';
