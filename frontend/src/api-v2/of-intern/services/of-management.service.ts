/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addOfIntern } from '../fn/of-management/add-of-intern';
import { deleteOfIntern } from '../fn/of-management/delete-of-intern';
import { getAllOfInterns } from '../fn/of-management/get-all-of-interns';
import { GetAllOfInterns$Params } from '../fn/of-management/get-all-of-interns';
import { getOfInternById } from '../fn/of-management/get-of-intern-by-id';
import { getBonDeSalaire, GetBonDeSalaire$Params } from '../fn/of-management/get-bon-de-salaire';
import { OfIntern } from '../models/of-intern';
import { OfInternDto } from '../models/of-intern-dto';
import { updateOfIntern } from '../fn/of-management/update-of-intern';


/**
 * OF related to article management
 */
@Injectable({ providedIn: 'root' })
export class OfService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllOfInterns()` */
  static readonly GetAllOfInternsPath = '/api/v1/of_intern';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllOfInterns()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllOfInterns$Response(params?: GetAllOfInterns$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OfIntern>>> {
    return getAllOfInterns(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllOfInterns$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllOfInterns(params?: GetAllOfInterns$Params, context?: HttpContext): Observable<Array<OfIntern>> {
    return this.getAllOfInterns$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<OfIntern>>): Array<OfIntern> => r.body)
    );
  }

  /** Path part for operation `updateOfIntern()` */
  static readonly UpdateOfInternPath = '/api/v1/of_intern';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateOfIntern()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateOfIntern$Response(params: OfIntern, context?: HttpContext): Observable<StrictHttpResponse<OfIntern>> {
    return updateOfIntern(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateOfIntern$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateOfIntern(params: OfIntern, context?: HttpContext): Observable<OfIntern> {
    return this.updateOfIntern$Response(params, context).pipe(
      map((r: StrictHttpResponse<OfIntern>): OfIntern => r.body)
    );
  }

  /** Path part for operation `addOfIntern()` */
  static readonly AddOfInternPath = '/api/v1/of_intern';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addOfIntern()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addOfIntern$Response(params: OfIntern, context?: HttpContext): Observable<StrictHttpResponse<OfIntern>> {
    return addOfIntern(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addOfIntern$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addOfIntern(params: OfIntern, context?: HttpContext): Observable<OfIntern> {
    return this.addOfIntern$Response(params, context).pipe(
      map((r: StrictHttpResponse<OfIntern>): OfIntern => r.body)
    );
  }

  /** Path part for operation `getOfInternById()` */
  static readonly GetOfInternByIdPath = '/api/v1/of_intern/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getOfInternById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOfInternById$Response(params: number, context?: HttpContext): Observable<StrictHttpResponse<OfIntern>> {
    return getOfInternById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getOfInternById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getOfInternById(params: number, context?: HttpContext): Observable<OfIntern> {
    return this.getOfInternById$Response(params, context).pipe(
      map((r: StrictHttpResponse<OfIntern>): OfIntern => r.body)
    );
  }

  /** Path part for operation `getBonDeSalaire()` */
  static readonly GetBonDeSalairePath = '/api/v1/of_intern/{ofid}/detail';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getBonDeSalaire()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBonDeSalaire$Response(params: GetBonDeSalaire$Params, context?: HttpContext): Observable<StrictHttpResponse<OfInternDto>> {
    return getBonDeSalaire(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getBonDeSalaire$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBonDeSalaire(params: GetBonDeSalaire$Params, context?: HttpContext): Observable<OfInternDto> {
    return this.getBonDeSalaire$Response(params, context).pipe(
      map((r: StrictHttpResponse<OfInternDto>): OfInternDto => r.body)
    );
  }

  /** Path part for operation `deleteOfIntern()` */
  static readonly DeleteOfInternPath = '/api/v1/of_intern/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteOfIntern()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteOfIntern$Response(params: number, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteOfIntern(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteOfIntern$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteOfIntern(params: number, context?: HttpContext): Observable<void> {
    return this.deleteOfIntern$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
