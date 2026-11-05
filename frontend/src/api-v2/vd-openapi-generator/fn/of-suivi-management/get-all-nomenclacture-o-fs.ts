/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { NomenclatureOf } from '../../models/nomenclature-of';

export interface GetAllNomenclactureOFs$Params {
  size?: number;
  page?: number;
  sort?: string;
  filter?: Array<string>;
  idOF: number;
}

export function getAllNomenclactureOFs(http: HttpClient, rootUrl: string, params: GetAllNomenclactureOFs$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<NomenclatureOf>>> {
  const rb = new RequestBuilder(rootUrl, getAllNomenclactureOFs.PATH, 'get');
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
      return r as StrictHttpResponse<Array<NomenclatureOf>>;
    })
  );
}

getAllNomenclactureOFs.PATH = '/api/v1/of_suivi/nomenclature_of/{idOF}';
