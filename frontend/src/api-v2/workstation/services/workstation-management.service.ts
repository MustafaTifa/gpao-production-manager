/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addWorkstation } from '../fn/workstation-management/add-workstation';
import { deleteWorkstation } from '../fn/workstation-management/delete-workstation';
import { getAllWorkstations } from '../fn/workstation-management/get-all-workstations';
import { GetAllWorkstations$Params } from '../fn/workstation-management/get-all-workstations';
import { getWorkstationById } from '../fn/workstation-management/get-workstation-by-id';
import { GetWorkstationById$Params } from '../fn/workstation-management/get-workstation-by-id';
import { updateWorkstation } from '../fn/workstation-management/update-workstation';
import { Workstation } from '../models/workstation';


/**
 * Operations related to workstation management
 */
@Injectable({ providedIn: 'root' })
export class WorkstationService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllWorkstations()` */
  static readonly GetAllWorkstationsPath = '/api/v1/workstation';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllWorkstations()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllWorkstations$Response(params?: GetAllWorkstations$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Workstation>>> {
    return getAllWorkstations(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllWorkstations$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllWorkstations(params?: GetAllWorkstations$Params, context?: HttpContext): Observable<Array<Workstation>> {
    return this.getAllWorkstations$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Workstation>>): Array<Workstation> => r.body)
    );
  }

  /** Path part for operation `updateWorkstation()` */
  static readonly UpdateWorkstationPath = '/api/v1/workstation';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateWorkstation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateWorkstation$Response(params: Workstation, context?: HttpContext): Observable<StrictHttpResponse<Workstation>> {
    return updateWorkstation(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateWorkstation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateWorkstation(params: Workstation, context?: HttpContext): Observable<Workstation> {
    return this.updateWorkstation$Response(params, context).pipe(
      map((r: StrictHttpResponse<Workstation>): Workstation => r.body)
    );
  }

  /** Path part for operation `addWorkstation()` */
  static readonly AddWorkstationPath = '/api/v1/workstation';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addWorkstation()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addWorkstation$Response(params: Workstation, context?: HttpContext): Observable<StrictHttpResponse<Workstation>> {
    return addWorkstation(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addWorkstation$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addWorkstation(params: Workstation, context?: HttpContext): Observable<Workstation> {
    return this.addWorkstation$Response(params, context).pipe(
      map((r: StrictHttpResponse<Workstation>): Workstation => r.body)
    );
  }

  /** Path part for operation `getWorkstationById()` */
  static readonly GetWorkstationByIdPath = '/api/v1/workstation/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getWorkstationById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getWorkstationById$Response(params: number, context?: HttpContext): Observable<StrictHttpResponse<Workstation>> {
    return getWorkstationById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getWorkstationById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getWorkstationById(params: number, context?: HttpContext): Observable<Workstation> {
    return this.getWorkstationById$Response(params, context).pipe(
      map((r: StrictHttpResponse<Workstation>): Workstation => r.body)
    );
  }

  /** Path part for operation `deleteWorkstation()` */
  static readonly DeleteWorkstationPath = '/api/v1/workstation/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteWorkstation()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteWorkstation$Response(params: number, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteWorkstation(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteWorkstation$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteWorkstation(params: number, context?: HttpContext): Observable<void> {
    return this.deleteWorkstation$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
