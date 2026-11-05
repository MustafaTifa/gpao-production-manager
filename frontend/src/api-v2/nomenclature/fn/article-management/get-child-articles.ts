/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Article } from '../../models/article';

export interface GetChildArticles$Params {
  id: number;
}

export function getChildArticles(http: HttpClient, rootUrl: string, params: GetChildArticles$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Article>>> {
  const rb = new RequestBuilder(rootUrl, getChildArticles.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Article>>;
    })
  );
}

getChildArticles.PATH = '/api/v1/article/child/{id}';
