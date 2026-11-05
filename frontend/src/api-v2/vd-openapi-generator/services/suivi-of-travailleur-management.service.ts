/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { add } from '../fn/suivi-of-travailleur-management/add';
import { Add$Params } from '../fn/suivi-of-travailleur-management/add';
import { delete$ } from '../fn/suivi-of-travailleur-management/delete';
import { Delete$Params } from '../fn/suivi-of-travailleur-management/delete';
import { getAllBySuiviOf } from '../fn/suivi-of-travailleur-management/get-all-by-suivi-of';
import { GetAllBySuiviOf$Params } from '../fn/suivi-of-travailleur-management/get-all-by-suivi-of';
import { getAllByTravailleur } from '../fn/suivi-of-travailleur-management/get-all-by-travailleur';
import { GetAllByTravailleur$Params } from '../fn/suivi-of-travailleur-management/get-all-by-travailleur';
import { getById } from '../fn/suivi-of-travailleur-management/get-by-id';
import { GetById$Params } from '../fn/suivi-of-travailleur-management/get-by-id';
import { SuiviOfTravailleur } from '../models/suivi-of-travailleur';
import { update } from '../fn/suivi-of-travailleur-management/update';
import { Update$Params } from '../fn/suivi-of-travailleur-management/update';


/**
 * Association between SuiviOF and Travailleur
 */
@Injectable({ providedIn: 'root' })
export class SuiviOfTravailleurManagementService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `update()` */
  static readonly UpdatePath = '/api/v1/suivi_of_travailleur';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `update()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update$Response(params: Update$Params, context?: HttpContext): Observable<StrictHttpResponse<SuiviOfTravailleur>> {
    return update(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `update$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  update(params: Update$Params, context?: HttpContext): Observable<SuiviOfTravailleur> {
    return this.update$Response(params, context).pipe(
      map((r: StrictHttpResponse<SuiviOfTravailleur>): SuiviOfTravailleur => r.body)
    );
  }

  /** Path part for operation `add()` */
  static readonly AddPath = '/api/v1/suivi_of_travailleur';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `add()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  add$Response(params: Add$Params, context?: HttpContext): Observable<StrictHttpResponse<SuiviOfTravailleur>> {
    return add(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `add$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  add(params: Add$Params, context?: HttpContext): Observable<SuiviOfTravailleur> {
    return this.add$Response(params, context).pipe(
      map((r: StrictHttpResponse<SuiviOfTravailleur>): SuiviOfTravailleur => r.body)
    );
  }

  /** Path part for operation `getById()` */
  static readonly GetByIdPath = '/api/v1/suivi_of_travailleur/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById$Response(params: GetById$Params, context?: HttpContext): Observable<StrictHttpResponse<SuiviOfTravailleur>> {
    return getById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getById(params: GetById$Params, context?: HttpContext): Observable<SuiviOfTravailleur> {
    return this.getById$Response(params, context).pipe(
      map((r: StrictHttpResponse<SuiviOfTravailleur>): SuiviOfTravailleur => r.body)
    );
  }

  /** Path part for operation `delete()` */
  static readonly DeletePath = '/api/v1/suivi_of_travailleur/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `delete()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete$Response(params: Delete$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return delete$(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `delete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  delete(params: Delete$Params, context?: HttpContext): Observable<void> {
    return this.delete$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getAllByTravailleur()` */
  static readonly GetAllByTravailleurPath = '/api/v1/suivi_of_travailleur/travailleur/{travailleurId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllByTravailleur()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllByTravailleur$Response(params: GetAllByTravailleur$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<SuiviOfTravailleur>>> {
    return getAllByTravailleur(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllByTravailleur$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllByTravailleur(params: GetAllByTravailleur$Params, context?: HttpContext): Observable<Array<SuiviOfTravailleur>> {
    return this.getAllByTravailleur$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<SuiviOfTravailleur>>): Array<SuiviOfTravailleur> => r.body)
    );
  }

  /** Path part for operation `getAllBySuiviOf()` */
  static readonly GetAllBySuiviOfPath = '/api/v1/suivi_of_travailleur/suivi_of/{suiviOfId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllBySuiviOf()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllBySuiviOf$Response(params: GetAllBySuiviOf$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<SuiviOfTravailleur>>> {
    return getAllBySuiviOf(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllBySuiviOf$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllBySuiviOf(params: GetAllBySuiviOf$Params, context?: HttpContext): Observable<Array<SuiviOfTravailleur>> {
    return this.getAllBySuiviOf$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<SuiviOfTravailleur>>): Array<SuiviOfTravailleur> => r.body)
    );
  }

}
