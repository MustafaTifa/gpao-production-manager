/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OfIntern } from '../../models/of-intern';

export interface GetAllOfInterns$Params {
  size?: number;
  page?: number;
  sort?: Array<string>;
  filters?: Array<string>;
}

export function getAllOfInterns(http: HttpClient, rootUrl: string, params?: GetAllOfInterns$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OfIntern>>> {
  const rb = new RequestBuilder(rootUrl, getAllOfInterns.PATH, 'get');
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
      return r as StrictHttpResponse<Array<OfIntern>>;
    })
  );
}

getAllOfInterns.PATH = '/api/v1/of_intern';
