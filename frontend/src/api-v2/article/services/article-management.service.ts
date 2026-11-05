/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addArticle } from '../fn/article-management/add-article';
import { Article } from '../models/article';
import { deleteArticle } from '../fn/article-management/delete-article';
import { getAllArticles } from '../fn/article-management/get-all-articles';
import { GetAllArticles$Params } from '../fn/article-management/get-all-articles';
import { getArticleById } from '../fn/article-management/get-article-by-id';
import { GetArticleById$Params } from '../fn/article-management/get-article-by-id';
import { updateArticle } from '../fn/article-management/update-article';
import { getChildArticles } from '../fn/article-management/get-child-articles';
import { getAllArticlesHistory } from '../fn/article-management/get-all-articles-history';


/**
 * Operations related to article management
 */
@Injectable({ providedIn: 'root' })
export class ArticleService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllArticles()` */
  static readonly GetAllArticlesPath = '/api/v1/article';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllArticles()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllArticles$Response(params?: GetAllArticles$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Article>>> {
    return getAllArticles(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllArticles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllArticles(params?: GetAllArticles$Params, context?: HttpContext): Observable<Array<Article>> {
    return this.getAllArticles$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Article>>): Array<Article> => r.body)
    );
  }

  /** Path part for operation `updateArticle()` */
  static readonly UpdateArticlePath = '/api/v1/article';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateArticle()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateArticle$Response(params: Article, context?: HttpContext): Observable<StrictHttpResponse<Article>> {
    return updateArticle(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateArticle$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateArticle(params: Article, context?: HttpContext): Observable<Article> {
    return this.updateArticle$Response(params, context).pipe(
      map((r: StrictHttpResponse<Article>): Article => r.body)
    );
  }

  /** Path part for operation `addArticle()` */
  static readonly AddArticlePath = '/api/v1/article';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addArticle()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addArticle$Response(params: Article, context?: HttpContext): Observable<StrictHttpResponse<Article>> {
    return addArticle(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addArticle$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addArticle(params: Article, context?: HttpContext): Observable<Article> {
    return this.addArticle$Response(params, context).pipe(
      map((r: StrictHttpResponse<Article>): Article => r.body)
    );
  }

  /** Path part for operation `getArticleById()` */
  static readonly GetArticleByIdPath = '/api/v1/article/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getArticleById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArticleById$Response(params: GetArticleById$Params, context?: HttpContext): Observable<StrictHttpResponse<Article>> {
    return getArticleById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getArticleById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArticleById(params: GetArticleById$Params, context?: HttpContext): Observable<Article> {
    return this.getArticleById$Response(params, context).pipe(
      map((r: StrictHttpResponse<Article>): Article => r.body)
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
  deleteArticle$Response(params: number, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteArticle(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteArticle$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteArticle(params: number, context?: HttpContext): Observable<void> {
    return this.deleteArticle$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getChildArticles()` */
  static readonly GetChildArticlesPath = '/api/v1/article/child/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getChildArticles()` instead.
   *
   * This method doesn't expect any request body.
   */
  getChildArticles$Response(params: number, context?: HttpContext): Observable<StrictHttpResponse<Array<Article>>> {
    return getChildArticles(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getChildArticles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getChildArticles(params: number, context?: HttpContext): Observable<Array<Article>> {
    return this.getChildArticles$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Article>>): Array<Article> => r.body)
    );
  }

  /** Path part for operation `getAllArticlesHistory()` */
  static readonly GetAllArticlesHistoryPath = '/api/v1/article/history/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllArticlesHistory()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllArticlesHistory$Response(params: number, context?: HttpContext): Observable<StrictHttpResponse<Array<Article>>> {
    return getAllArticlesHistory(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllArticlesHistory$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllArticlesHistory(params: number, context?: HttpContext): Observable<Array<Article>> {
    return this.getAllArticlesHistory$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Article>>): Array<Article> => r.body)
    );
  }

}
