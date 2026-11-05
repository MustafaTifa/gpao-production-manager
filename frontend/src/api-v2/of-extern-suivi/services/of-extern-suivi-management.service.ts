/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addSuiviOf } from '../fn/of-extern-suivi-management/add-suivi-of';
import { deleteSuiviOf } from '../fn/of-extern-suivi-management/delete-suivi-of';
import { getAllSuiviOFs } from '../fn/of-extern-suivi-management/get-all-suivi-o-fs';
import { GetAllSuiviOFs$Params } from '../fn/of-extern-suivi-management/get-all-suivi-o-fs';
import { getSuiviOfById } from '../fn/of-extern-suivi-management/get-suivi-of-by-id';
import { GetSuiviOfById$Params } from '../fn/of-extern-suivi-management/get-suivi-of-by-id';
import { SuiviOfExtern } from '../models/suivi-of-extern';
import { updateSuiviOf } from '../fn/of-extern-suivi-management/update-suivi-of';
import { UpdateSuiviOf$Params } from '../fn/of-extern-suivi-management/update-suivi-of';


/**
 * OF Extern Suivi related to article management
 */
@Injectable({ providedIn: 'root' })
export class OfExternSuiviService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateSuiviOf()` */
  static readonly UpdateSuiviOfPath = '/api/v1/of_suivi_extern';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateSuiviOf()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSuiviOf$Response(params: UpdateSuiviOf$Params, context?: HttpContext): Observable<StrictHttpResponse<SuiviOfExtern>> {
    return updateSuiviOf(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateSuiviOf$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSuiviOf(params: UpdateSuiviOf$Params, context?: HttpContext): Observable<SuiviOfExtern> {
    return this.updateSuiviOf$Response(params, context).pipe(
      map((r: StrictHttpResponse<SuiviOfExtern>): SuiviOfExtern => r.body)
    );
  }

  /** Path part for operation `addSuiviOf()` */
  static readonly AddSuiviOfPath = '/api/v1/of_suivi_extern';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addSuiviOf()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addSuiviOf$Response(params: SuiviOfExtern, context?: HttpContext): Observable<StrictHttpResponse<SuiviOfExtern>> {
    return addSuiviOf(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addSuiviOf$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addSuiviOf(params: SuiviOfExtern, context?: HttpContext): Observable<SuiviOfExtern> {
    return this.addSuiviOf$Response(params, context).pipe(
      map((r: StrictHttpResponse<SuiviOfExtern>): SuiviOfExtern => r.body)
    );
  }

  /** Path part for operation `getSuiviOfById()` */
  static readonly GetSuiviOfByIdPath = '/api/v1/of_suivi_extern/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getSuiviOfById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSuiviOfById$Response(params: GetSuiviOfById$Params, context?: HttpContext): Observable<StrictHttpResponse<SuiviOfExtern>> {
    return getSuiviOfById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getSuiviOfById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getSuiviOfById(params: GetSuiviOfById$Params, context?: HttpContext): Observable<SuiviOfExtern> {
    return this.getSuiviOfById$Response(params, context).pipe(
      map((r: StrictHttpResponse<SuiviOfExtern>): SuiviOfExtern => r.body)
    );
  }

  /** Path part for operation `deleteSuiviOf()` */
  static readonly DeleteSuiviOfPath = '/api/v1/of_suivi_extern/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteSuiviOf()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSuiviOf$Response(params: number, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteSuiviOf(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteSuiviOf$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteSuiviOf(params: number, context?: HttpContext): Observable<void> {
    return this.deleteSuiviOf$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getAllSuiviOFs()` */
  static readonly GetAllSuiviOFsPath = '/api/v1/of_suivi_extern/{idOF}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllSuiviOFs()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllSuiviOFs$Response(params: GetAllSuiviOFs$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<SuiviOfExtern>>> {
    return getAllSuiviOFs(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllSuiviOFs$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllSuiviOFs(params: GetAllSuiviOFs$Params, context?: HttpContext): Observable<Array<SuiviOfExtern>> {
    return this.getAllSuiviOFs$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<SuiviOfExtern>>): Array<SuiviOfExtern> => r.body)
    );
  }

}
