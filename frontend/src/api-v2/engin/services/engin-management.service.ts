/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addEngin } from '../fn/engin-management/add-engin';
import { deleteEngin } from '../fn/engin-management/delete-engin';
import { Engin } from '../models/engin';
import { getAllEngins } from '../fn/engin-management/get-all-engins';
import { GetAllEngins$Params } from '../fn/engin-management/get-all-engins';
import { getEnginById } from '../fn/engin-management/get-engin-by-id';
import { GetEnginById$Params } from '../fn/engin-management/get-engin-by-id';
import { updateEngin } from '../fn/engin-management/update-engin';


/**
 * Operations related to engin management
 */
@Injectable({ providedIn: 'root' })
export class EnginService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllEngins()` */
  static readonly GetAllEnginsPath = '/api/v1/engin';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllEngins()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllEngins$Response(params?: GetAllEngins$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Engin>>> {
    return getAllEngins(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllEngins$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllEngins(params?: GetAllEngins$Params, context?: HttpContext): Observable<Array<Engin>> {
    return this.getAllEngins$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Engin>>): Array<Engin> => r.body)
    );
  }

  /** Path part for operation `updateEngin()` */
  static readonly UpdateEnginPath = '/api/v1/engin';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateEngin()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateEngin$Response(params: Engin, context?: HttpContext): Observable<StrictHttpResponse<Engin>> {
    return updateEngin(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateEngin$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateEngin(params: Engin, context?: HttpContext): Observable<Engin> {
    return this.updateEngin$Response(params, context).pipe(
      map((r: StrictHttpResponse<Engin>): Engin => r.body)
    );
  }

  /** Path part for operation `addEngin()` */
  static readonly AddEnginPath = '/api/v1/engin';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addEngin()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addEngin$Response(params: Engin, context?: HttpContext): Observable<StrictHttpResponse<Engin>> {
    return addEngin(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addEngin$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addEngin(params: Engin, context?: HttpContext): Observable<Engin> {
    return this.addEngin$Response(params, context).pipe(
      map((r: StrictHttpResponse<Engin>): Engin => r.body)
    );
  }

  /** Path part for operation `getEnginById()` */
  static readonly GetEnginByIdPath = '/api/v1/engin/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getEnginById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnginById$Response(params: GetEnginById$Params, context?: HttpContext): Observable<StrictHttpResponse<Engin>> {
    return getEnginById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getEnginById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getEnginById(params: GetEnginById$Params, context?: HttpContext): Observable<Engin> {
    return this.getEnginById$Response(params, context).pipe(
      map((r: StrictHttpResponse<Engin>): Engin => r.body)
    );
  }

  /** Path part for operation `deleteEngin()` */
  static readonly DeleteEnginPath = '/api/v1/engin/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteEngin()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEngin$Response(params: number, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteEngin(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteEngin$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteEngin(params: number, context?: HttpContext): Observable<void> {
    return this.deleteEngin$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
