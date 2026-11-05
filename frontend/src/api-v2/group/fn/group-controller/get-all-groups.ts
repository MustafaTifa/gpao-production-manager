/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Groupe } from '../../models/groupe';

export interface GetAllGroups$Params {
  /**
     * Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     */
  sort?: Array<string>;

  /**
   * Size of a page
   */
  size?: number;

  /**
   * Page number of the requested page
   */
  page?: number;

  filters?: string[]
}

export function getAllGroups(http: HttpClient, rootUrl: string, params?: GetAllGroups$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Groupe>>> {
  const rb = new RequestBuilder(rootUrl, getAllGroups.PATH, 'get');
  (params?.sort || []).forEach((val) => {
    if (val != null) rb.query('sort', val.toString(), {});
  });
  if (params?.size != null)
    rb.query('size', params.size.toString(), {});
  if (params?.page != null)
    rb.query('page', params.page.toString(), {});
  if (params?.filters != null) {
      rb.query('filter', params.filters, {});
  }
  
  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      console.log('groups rr : ',r);
      return r as StrictHttpResponse<Array<Groupe>>;
    })
  );
}

getAllGroups.PATH = '/api/v1/group';
