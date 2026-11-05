/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Ged } from '../../models/ged';

export interface GetAllGeDs$Params {
  size?: number;
  page?: number;
  sort?: Array<string>;
  filters?: Array<string>;
  id?: number
}

export function getAllGeDs(http: HttpClient, rootUrl: string, params?: GetAllGeDs$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Ged>>> {
  const rb = new RequestBuilder(rootUrl, getAllGeDs.PATH, 'get');
  if (params) {
    rb.query('size', params.size, {});
    rb.query('page', params.page, {});
    rb.query('sort', params.sort, {});
    rb.query('filter', params.filters, {});
    rb.query('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Ged>>;
    })
  );
}

getAllGeDs.PATH = '/api/v1/ged';
