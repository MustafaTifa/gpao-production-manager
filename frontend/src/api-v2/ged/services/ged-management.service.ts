/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addGed, GEDParam } from '../fn/ged-management/add-ged';
import { deleteGed } from '../fn/ged-management/delete-ged';
import { Ged } from '../models/ged';
import { getAllGeDs } from '../fn/ged-management/get-all-ge-ds';
import { GetAllGeDs$Params } from '../fn/ged-management/get-all-ge-ds';
import { getGedById } from '../fn/ged-management/get-ged-by-id';
import { GetGedById$Params } from '../fn/ged-management/get-ged-by-id';
import { updateGed } from '../fn/ged-management/update-ged';


/**
 * Operations related to GED management
 */
@Injectable({ providedIn: 'root' })
export class GedService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllGeDs()` */
  static readonly GetAllGeDsPath = '/api/v1/ged';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllGeDs()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllGeDs$Response(params?: GetAllGeDs$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Ged>>> {
    return getAllGeDs(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllGeDs$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllGeDs(params?: GetAllGeDs$Params, context?: HttpContext): Observable<Array<Ged>> {
    return this.getAllGeDs$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Ged>>): Array<Ged> => r.body)
    );
  }

  /** Path part for operation `updateGed()` */
  static readonly UpdateGedPath = '/api/v1/ged';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateGed()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateGed$Response(params: Ged, context?: HttpContext): Observable<StrictHttpResponse<Ged>> {
    return updateGed(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateGed$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateGed(params: Ged, context?: HttpContext): Observable<Ged> {
    return this.updateGed$Response(params, context).pipe(
      map((r: StrictHttpResponse<Ged>): Ged => r.body)
    );
  }

  /** Path part for operation `addGed()` */
  static readonly AddGedPath = '/api/v1/ged';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addGed()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addGed$Response(params: FormData, context?: HttpContext): Observable<StrictHttpResponse<Ged>> {
    return addGed(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addGed$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addGed(params: FormData, context?: HttpContext): Observable<Ged> {
    return this.addGed$Response(params, context).pipe(
      map((r: StrictHttpResponse<Ged>): Ged => r.body)
    );
  }

  /** Path part for operation `getGedById()` */
  static readonly GetGedByIdPath = '/api/v1/ged/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getGedById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGedById$Response(params: number, context?: HttpContext): Observable<StrictHttpResponse<Ged>> {
    return getGedById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getGedById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGedById(params: number, context?: HttpContext): Observable<Ged> {
    return this.getGedById$Response(params, context).pipe(
      map((r: StrictHttpResponse<Ged>): Ged => r.body)
    );
  }

  /** Path part for operation `deleteGed()` */
  static readonly DeleteGedPath = '/api/v1/ged/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteGed()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteGed$Response(params: number, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteGed(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteGed$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteGed(params: number, context?: HttpContext): Observable<void> {
    return this.deleteGed$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
