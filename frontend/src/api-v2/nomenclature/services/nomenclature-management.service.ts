/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addArticleNomenclature } from '../fn/nomenclature-management/add-article-nomenclature';
import { ArticleNomenclature } from '../models/article-nomenclature';
import { getAllArticleNomenclatures, getAllArticleNomenclaturesUsingIds } from '../fn/nomenclature-management/get-all-article-nomenclatures';
import { GetAllArticleNomenclatures$Params } from '../fn/nomenclature-management/get-all-article-nomenclatures';
import { getAllNomenclatures } from '../fn/nomenclature-management/get-all-nomenclatures';
import { GetAllNomenclatures$Params } from '../fn/nomenclature-management/get-all-nomenclatures';
import { Nomenclature } from '../models/nomenclature';
import { updateNomenclature } from '../fn/nomenclature-management/update-nomenclature';
import { deleteArticleNomenclature } from '../fn/delete-article-nomenclature';


/**
 * Operations related to nomenclature management
 */
@Injectable({ providedIn: 'root' })
export class NomenclatureService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateNomenclature()` */
  static readonly UpdateNomenclaturePath = '/api/v1/nomenclature';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateNomenclature()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateNomenclature$Response(params: ArticleNomenclature, context?: HttpContext): Observable<StrictHttpResponse<ArticleNomenclature>> {
    return updateNomenclature(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateNomenclature$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateNomenclature(params: ArticleNomenclature, context?: HttpContext): Observable<ArticleNomenclature> {
    return this.updateNomenclature$Response(params, context).pipe(
      map((r: StrictHttpResponse<ArticleNomenclature>): ArticleNomenclature => r.body)
    );
  }

  /** Path part for operation `addArticleNomenclature()` */
  static readonly AddArticleNomenclaturePath = '/api/v1/nomenclature';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addArticleNomenclature()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addArticleNomenclature$Response(params: ArticleNomenclature, context?: HttpContext): Observable<StrictHttpResponse<ArticleNomenclature>> {
    return addArticleNomenclature(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addArticleNomenclature$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addArticleNomenclature(params: ArticleNomenclature, context?: HttpContext): Observable<ArticleNomenclature> {
    return this.addArticleNomenclature$Response(params, context).pipe(
      map((r: StrictHttpResponse<ArticleNomenclature>): ArticleNomenclature => r.body)
    );
  }

  /** Path part for operation `getAllNomenclatures()` */
  static readonly GetAllNomenclaturesPath = '/api/v1/nomenclature/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllNomenclatures()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllNomenclatures$Response(params: GetAllNomenclatures$Params, context?: HttpContext): Observable<StrictHttpResponse<Nomenclature>> {
    return getAllNomenclatures(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllNomenclatures$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllNomenclatures(params: GetAllNomenclatures$Params, context?: HttpContext): Observable<Nomenclature> {
    return this.getAllNomenclatures$Response(params, context).pipe(
      map((r: StrictHttpResponse<Nomenclature>): Nomenclature => r.body)
    );
  }

  /** Path part for operation `getAllArticleNomenclatures()` */
  static readonly GetAllArticleNomenclaturesPath = '/api/v1/nomenclature/all/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllArticleNomenclatures()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllArticleNomenclatures$Response(params: GetAllArticleNomenclatures$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ArticleNomenclature>>> {
    return getAllArticleNomenclatures(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllArticleNomenclatures$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllArticleNomenclatures(params: GetAllArticleNomenclatures$Params, context?: HttpContext): Observable<Array<ArticleNomenclature>> {
    return this.getAllArticleNomenclatures$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ArticleNomenclature>>): Array<ArticleNomenclature> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllArticleNomenclatures()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllArticleNomenclaturesUsingIds$Response(ids: Array<number>, context?: HttpContext): Observable<StrictHttpResponse<Array<ArticleNomenclature>>> {
    return getAllArticleNomenclaturesUsingIds(this.http, this.rootUrl, ids, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllArticleNomenclaturesUsingIds$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllArticleNomenclaturesUsingIds(ids: Array<number>, context?: HttpContext): Observable<Array<ArticleNomenclature>> {
    return this.getAllArticleNomenclaturesUsingIds$Response(ids, context).pipe(
      map((r: StrictHttpResponse<Array<ArticleNomenclature>>): Array<ArticleNomenclature> => r.body)
    );
  }

  /** Path part for operation `deleteArticle()` */
  static readonly DeleteArticlePath = '/api/v1/article/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteArticle()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteArticleNomenclature$Response(params: number, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteArticleNomenclature(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteArticle$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteArticleNomenclature(params: number, context?: HttpContext): Observable<void> {
    return this.deleteArticleNomenclature$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
