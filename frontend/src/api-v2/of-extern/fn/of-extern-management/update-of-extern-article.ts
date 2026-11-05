/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ArticleOfExtern } from '../../models/article-of-extern';

export function updateOfExternArticle(http: HttpClient, rootUrl: string, params: ArticleOfExtern, context?: HttpContext): Observable<StrictHttpResponse<ArticleOfExtern>> {
  const rb = new RequestBuilder(rootUrl, updateOfExternArticle.PATH, 'put');
  if (params) {
    rb.body(params, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ArticleOfExtern>;
    })
  );
}

updateOfExternArticle.PATH = '/api/v1/of_extern/pieces-unitaire';
