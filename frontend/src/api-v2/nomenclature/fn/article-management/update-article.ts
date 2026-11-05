/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Article } from '../../models/article';

export interface UpdateArticle$Params {
      body: Article
}

export function updateArticle(http: HttpClient, rootUrl: string, params: UpdateArticle$Params, context?: HttpContext): Observable<StrictHttpResponse<Article>> {
  const rb = new RequestBuilder(rootUrl, updateArticle.PATH, 'put');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Article>;
    })
  );
}

updateArticle.PATH = '/api/v1/article';
