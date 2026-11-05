/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addOfExtern } from '../fn/of-extern-management/add-of-extern';
import { deleteOfExtern } from '../fn/of-extern-management/delete-of-extern';
import { DeleteOfExtern$Params } from '../fn/of-extern-management/delete-of-extern';
import { getAllOfExterns } from '../fn/of-extern-management/get-all-of-externs';
import { GetAllOfExterns$Params } from '../fn/of-extern-management/get-all-of-externs';
import { getOfExternById } from '../fn/of-extern-management/get-of-extern-by-id';
import { OfExtern } from '../models/of-extern';
import { updateOfExtern } from '../fn/of-extern-management/update-of-extern';
import { ArticleOfExtern } from '../models/article-of-extern';
import { getAllOfExternArticles, GetAllOfExternArticles$Params } from '../fn/of-extern-management/get-all-of-extern-articles';
import { updateOfExternArticle } from '../fn/of-extern-management/update-of-extern-article';
import { addOfExternArticle } from '../fn/of-extern-management/add-of-extern-article';
import { getOfExternArticleById, GetOfExternArticleById$Params } from '../fn/of-extern-management/get-of-extern-article-by-id';
import { deleteOfExternArticle } from '../fn/of-extern-management/delete-of-extern-article';


/**
 * Operations related to OF Extern management
 */
@Injectable({ providedIn: 'root' })
export class OfExternService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllOfExterns()` */
  static readonly GetAllOfExternsPath = '/api/v1/of_extern';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllOfExterns()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllOfExterns$Response(params?: GetAllOfExterns$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OfExtern>>> {
    return getAllOfExterns(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllOfExterns$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllOfExterns(params?: GetAllOfExterns$Params, context?: HttpContext): Observable<Array<OfExtern>> {
    return this.getAllOfExterns$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<OfExtern>>): Array<OfExtern> => r.body)
    );
  }

  /** Path part for operation `updateOfExtern()` */
  static readonly UpdateOfExternPath = '/api/v1/of_extern';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateOfExtern()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateOfExtern$Response(params: OfExtern, context?: HttpContext): Observable<StrictHttpResponse<OfExtern>> {
    return updateOfExtern(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateOfExtern$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateOfExtern(params: OfExtern, context?: HttpContext): Observable<OfExtern> {
    return this.updateOfExtern$Response(params, context).pipe(
      map((r: StrictHttpResponse<OfExtern>): OfExtern => r.body)
    );
  }

  /** Path part for operation `addOfExtern()` */
  static readonly AddOfExternPath = '/api/v1/of_extern';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addOfExtern()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addOfExtern$Response(params: OfExtern, context?: HttpContext): Observable<StrictHttpResponse<OfExtern>> {
    return addOfExtern(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addOfExtern$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addOfExtern(params: OfExtern, context?: HttpContext): Observable<OfExtern> {
    return this.addOfExtern$Response(params, context).pipe(
      map((r: StrictHttpResponse<OfExtern>): OfExtern => r.body)
    );
  }

  /** Path part for operation `getOfExternById()` */
  static readonly GetOfExternByIdPath = '/api/v1/of_extern/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOfExternById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOfExternById$Response(params: string, context?: HttpContext): Observable<StrictHttpResponse<OfExtern>> {
    return getOfExternById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getOfExternById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOfExternById(params: string, context?: HttpContext): Observable<OfExtern> {
    return this.getOfExternById$Response(params, context).pipe(
      map((r: StrictHttpResponse<OfExtern>): OfExtern => r.body)
    );
  }

  /** Path part for operation `deleteOfExtern()` */
  static readonly DeleteOfExternPath = '/api/v1/of_extern/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteOfExtern()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteOfExtern$Response(params: number, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteOfExtern(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteOfExtern$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteOfExtern(params: number, context?: HttpContext): Observable<void> {
    return this.deleteOfExtern$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getAllOfExternArticles()` */
  static readonly GetAllOfExternArticlesPath = '/api/v1/of_extern/pieces-unitaire';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllOfExternArticles()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllOfExternArticles$Response(params?: GetAllOfExternArticles$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ArticleOfExtern>>> {
    return getAllOfExternArticles(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllOfExternArticles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllOfExternArticles(params?: GetAllOfExternArticles$Params, context?: HttpContext): Observable<Array<ArticleOfExtern>> {
    return this.getAllOfExternArticles$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ArticleOfExtern>>): Array<ArticleOfExtern> => r.body)
    );
  }

  /** Path part for operation `updateOfExternArticle()` */
  static readonly UpdateOfExternArticlePath = '/api/v1/of_extern/pieces-unitaire';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateOfExternArticle()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateOfExternArticle$Response(params: ArticleOfExtern, context?: HttpContext): Observable<StrictHttpResponse<ArticleOfExtern>> {
    return updateOfExternArticle(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateOfExternArticle$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateOfExternArticle(params: ArticleOfExtern, context?: HttpContext): Observable<ArticleOfExtern> {
    return this.updateOfExternArticle$Response(params, context).pipe(
      map((r: StrictHttpResponse<ArticleOfExtern>): ArticleOfExtern => r.body)
    );
  }

  /** Path part for operation `addOfExternArticle()` */
  static readonly AddOfExternArticlePath = '/api/v1/of_extern/pieces-unitaire';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addOfExternArticle()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addOfExternArticle$Response(params: ArticleOfExtern, context?: HttpContext): Observable<StrictHttpResponse<ArticleOfExtern>> {
    return addOfExternArticle(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addOfExternArticle$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addOfExternArticle(params: ArticleOfExtern, context?: HttpContext): Observable<ArticleOfExtern> {
    return this.addOfExternArticle$Response(params, context).pipe(
      map((r: StrictHttpResponse<ArticleOfExtern>): ArticleOfExtern => r.body)
    );
  }

  /** Path part for operation `getOfExternArticleById()` */
  static readonly GetOfExternArticleByIdPath = '/api/v1/of_extern/pieces-unitaire/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOfExternArticleById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOfExternArticleById$Response(params: GetOfExternArticleById$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ArticleOfExtern>>> {
    return getOfExternArticleById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getOfExternArticleById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOfExternArticleById(params: GetOfExternArticleById$Params, context?: HttpContext): Observable<Array<ArticleOfExtern>> {
    return this.getOfExternArticleById$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ArticleOfExtern>>): Array<ArticleOfExtern> => r.body)
    );
  }

  /** Path part for operation `deleteOfExternArticle()` */
  static readonly DeleteOfExternArticlePath = '/api/v1/of_extern/pieces-unitaire/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteOfExternArticle()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteOfExternArticle$Response(params: number, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteOfExternArticle(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteOfExternArticle$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteOfExternArticle(params: number, context?: HttpContext): Observable<void> {
    return this.deleteOfExternArticle$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
