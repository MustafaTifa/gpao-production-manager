/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ArticleNomenclature } from '../../models/article-nomenclature';

export interface GetAllArticleNomenclatures$Params {
  size?: number;
  page?: number;
  sort?: Array<string>;
  id: number;
}

export function getAllArticleNomenclatures(http: HttpClient, rootUrl: string, params: GetAllArticleNomenclatures$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ArticleNomenclature>>> {
  const rb = new RequestBuilder(rootUrl, getAllArticleNomenclatures.PATH, 'get');
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
      return r as StrictHttpResponse<Array<ArticleNomenclature>>;
    })
  );
}

getAllArticleNomenclatures.PATH = '/api/v1/nomenclature/all/{id}';

export function getAllArticleNomenclaturesUsingIds(http: HttpClient, rootUrl: string, ids: Array<number>, context?: HttpContext): Observable<StrictHttpResponse<Array<ArticleNomenclature>>> {
  const rb = new RequestBuilder(rootUrl, getAllArticleNomenclaturesUsingIds.PATH, 'post');
  if (ids) {
    rb.body(ids, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ArticleNomenclature>>;
    })
  );
}

getAllArticleNomenclaturesUsingIds.PATH = '/api/v1/nomenclature/all';
