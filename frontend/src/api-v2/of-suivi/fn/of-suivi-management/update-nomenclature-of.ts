/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { NomenclatureOf } from '../../models/nomenclature-of';

export interface UpdateNomenclatureOf$Params {
      body: NomenclatureOf
}

export function updateNomenclatureOf(http: HttpClient, rootUrl: string, params: UpdateNomenclatureOf$Params, context?: HttpContext): Observable<StrictHttpResponse<NomenclatureOf>> {
  const rb = new RequestBuilder(rootUrl, updateNomenclatureOf.PATH, 'put');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<NomenclatureOf>;
    })
  );
}

updateNomenclatureOf.PATH = '/api/v1/of_suivi/nomenclature_of';
