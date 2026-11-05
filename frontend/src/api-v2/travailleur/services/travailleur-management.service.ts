/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addTravailleur } from '../fn/travailleur-management/add-travailleur';
import { deleteTravailleur } from '../fn/travailleur-management/delete-travailleur';
import { getAllTravailleurs } from '../fn/travailleur-management/get-all-travailleurs';
import { GetAllTravailleurs$Params } from '../fn/travailleur-management/get-all-travailleurs';
import { getTravailleurById } from '../fn/travailleur-management/get-travailleur-by-id';
import { GetTravailleurById$Params } from '../fn/travailleur-management/get-travailleur-by-id';
import { Travailleur } from '../models/travailleur';
import { updateTravailleur } from '../fn/travailleur-management/update-travailleur';


/**
 * Operations related to travailleur management
 */
@Injectable({ providedIn: 'root' })
export class TravailleurService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllTravailleurs()` */
  static readonly GetAllTravailleursPath = '/api/v1/travailleur';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllTravailleurs()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTravailleurs$Response(params?: GetAllTravailleurs$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Travailleur>>> {
    return getAllTravailleurs(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllTravailleurs$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTravailleurs(params?: GetAllTravailleurs$Params, context?: HttpContext): Observable<Array<Travailleur>> {
    return this.getAllTravailleurs$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Travailleur>>): Array<Travailleur> => r.body)
    );
  }

  /** Path part for operation `updateTravailleur()` */
  static readonly UpdateTravailleurPath = '/api/v1/travailleur';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateTravailleur()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTravailleur$Response(params: Travailleur, context?: HttpContext): Observable<StrictHttpResponse<Travailleur>> {
    return updateTravailleur(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateTravailleur$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateTravailleur(params: Travailleur, context?: HttpContext): Observable<Travailleur> {
    return this.updateTravailleur$Response(params, context).pipe(
      map((r: StrictHttpResponse<Travailleur>): Travailleur => r.body)
    );
  }

  /** Path part for operation `addTravailleur()` */
  static readonly AddTravailleurPath = '/api/v1/travailleur';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addTravailleur()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addTravailleur$Response(params: Travailleur, context?: HttpContext): Observable<StrictHttpResponse<Travailleur>> {
    return addTravailleur(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addTravailleur$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addTravailleur(params: Travailleur, context?: HttpContext): Observable<Travailleur> {
    return this.addTravailleur$Response(params, context).pipe(
      map((r: StrictHttpResponse<Travailleur>): Travailleur => r.body)
    );
  }

  /** Path part for operation `getTravailleurById()` */
  static readonly GetTravailleurByIdPath = '/api/v1/travailleur/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTravailleurById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTravailleurById$Response(params: GetTravailleurById$Params, context?: HttpContext): Observable<StrictHttpResponse<Travailleur>> {
    return getTravailleurById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTravailleurById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTravailleurById(params: GetTravailleurById$Params, context?: HttpContext): Observable<Travailleur> {
    return this.getTravailleurById$Response(params, context).pipe(
      map((r: StrictHttpResponse<Travailleur>): Travailleur => r.body)
    );
  }

  /** Path part for operation `deleteTravailleur()` */
  static readonly DeleteTravailleurPath = '/api/v1/travailleur/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteTravailleur()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTravailleur$Response(params: number, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteTravailleur(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteTravailleur$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTravailleur(params: number, context?: HttpContext): Observable<void> {
    return this.deleteTravailleur$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
