/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CFI } from '../../models/cfi';

export interface GetAllCfIs$Params {
  size?: number;
  page?: number;
  sort?: Array<string>;
  filters?: Array<string>;
}

export function getAllCfIs(http: HttpClient, rootUrl: string, params?: GetAllCfIs$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CFI>>> {
  const rb = new RequestBuilder(rootUrl, getAllCfIs.PATH, 'get');
  if (params) {
    rb.query('size', params.size, {});
    rb.query('page', params.page, {});
    rb.query('sort', params.sort, {});
    rb.query('filter', params.filters, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<CFI>>;
    })
  );
}

getAllCfIs.PATH = '/api/v1/cfi';
