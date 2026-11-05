/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addGamme } from '../fn/gamme-management/add-gamme';
import { deleteGamme } from '../fn/gamme-management/delete-gamme';
import { Gamme } from '../models/gamme';
import { getAllGammes } from '../fn/gamme-management/get-all-gammes';
import { GetAllGammes$Params } from '../fn/gamme-management/get-all-gammes';
import { getGammeById } from '../fn/gamme-management/get-gamme-by-id';
import { updateGamme } from '../fn/gamme-management/update-gamme';


/**
 * Operations related to gamme management
 */
@Injectable({ providedIn: 'root' })
export class GammeService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllGammes()` */
  static readonly GetAllGammesPath = '/api/v1/gamme';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllGammes()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllGammes$Response(params?: GetAllGammes$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Gamme>>> {
    return getAllGammes(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllGammes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllGammes(params?: GetAllGammes$Params, context?: HttpContext): Observable<Array<Gamme>> {
    return this.getAllGammes$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Gamme>>): Array<Gamme> => r.body)
    );
  }

  /** Path part for operation `updateGamme()` */
  static readonly UpdateGammePath = '/api/v1/gamme';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateGamme()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateGamme$Response(params: Gamme, context?: HttpContext): Observable<StrictHttpResponse<Gamme>> {
    return updateGamme(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateGamme$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateGamme(params: Gamme, context?: HttpContext): Observable<Gamme> {
    return this.updateGamme$Response(params, context).pipe(
      map((r: StrictHttpResponse<Gamme>): Gamme => r.body)
    );
  }

  /** Path part for operation `addGamme()` */
  static readonly AddGammePath = '/api/v1/gamme';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addGamme()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addGamme$Response(params: Gamme, context?: HttpContext): Observable<StrictHttpResponse<Gamme>> {
    return addGamme(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addGamme$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addGamme(params: Gamme, context?: HttpContext): Observable<Gamme> {
    return this.addGamme$Response(params, context).pipe(
      map((r: StrictHttpResponse<Gamme>): Gamme => r.body)
    );
  }

  /** Path part for operation `getGammeById()` */
  static readonly GetGammeByIdPath = '/api/v1/gamme/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getGammeById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGammeById$Response(params: number, context?: HttpContext): Observable<StrictHttpResponse<Gamme>> {
    return getGammeById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getGammeById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGammeById(params: number, context?: HttpContext): Observable<Gamme> {
    return this.getGammeById$Response(params, context).pipe(
      map((r: StrictHttpResponse<Gamme>): Gamme => r.body)
    );
  }

  /** Path part for operation `deleteGamme()` */
  static readonly DeleteGammePath = '/api/v1/gamme/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteGamme()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteGamme$Response(params: number, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteGamme(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteGamme$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteGamme(params: number, context?: HttpContext): Observable<void> {
    return this.deleteGamme$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
