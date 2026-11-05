/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addCfi } from '../fn/cfi-management/add-cfi';
import { CFI } from '../models/cfi';
import { deleteCfi } from '../fn/cfi-management/delete-cfi';
import { getAllCfIs } from '../fn/cfi-management/get-all-cf-is';
import { GetAllCfIs$Params } from '../fn/cfi-management/get-all-cf-is';
import { getCfiById } from '../fn/cfi-management/get-cfi-by-id';
import { GetCfiById$Params } from '../fn/cfi-management/get-cfi-by-id';
import { updateCfi } from '../fn/cfi-management/update-cfi';


/**
 * Operations related to cfi management
 */
@Injectable({ providedIn: 'root' })
export class CfiService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllCfIs()` */
  static readonly GetAllCfIsPath = '/api/v1/cfi';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllCfIs()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCfIs$Response(params?: GetAllCfIs$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CFI>>> {
    return getAllCfIs(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllCfIs$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCfIs(params?: GetAllCfIs$Params, context?: HttpContext): Observable<Array<CFI>> {
    return this.getAllCfIs$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CFI>>): Array<CFI> => r.body)
    );
  }

  /** Path part for operation `updateCfi()` */
  static readonly UpdateCfiPath = '/api/v1/cfi';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCfi()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCfi$Response(params: CFI, context?: HttpContext): Observable<StrictHttpResponse<CFI>> {
    return updateCfi(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateCfi$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCfi(params: CFI, context?: HttpContext): Observable<CFI> {
    return this.updateCfi$Response(params, context).pipe(
      map((r: StrictHttpResponse<CFI>): CFI => r.body)
    );
  }

  /** Path part for operation `addCfi()` */
  static readonly AddCfiPath = '/api/v1/cfi';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addCfi()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addCfi$Response(params: CFI, context?: HttpContext): Observable<StrictHttpResponse<CFI>> {
    return addCfi(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addCfi$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addCfi(params: CFI, context?: HttpContext): Observable<CFI> {
    return this.addCfi$Response(params, context).pipe(
      map((r: StrictHttpResponse<CFI>): CFI => r.body)
    );
  }

  /** Path part for operation `getCfiById()` */
  static readonly GetCfiByIdPath = '/api/v1/cfi/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCfiById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCfiById$Response(params: GetCfiById$Params, context?: HttpContext): Observable<StrictHttpResponse<CFI>> {
    return getCfiById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCfiById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCfiById(params: GetCfiById$Params, context?: HttpContext): Observable<CFI> {
    return this.getCfiById$Response(params, context).pipe(
      map((r: StrictHttpResponse<CFI>): CFI => r.body)
    );
  }

  /** Path part for operation `deleteCfi()` */
  static readonly DeleteCfiPath = '/api/v1/cfi/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteCfi()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCfi$Response(params: number, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteCfi(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteCfi$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCfi(params: number, context?: HttpContext): Observable<void> {
    return this.deleteCfi$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
