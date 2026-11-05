/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addType } from '../fn/type-management/add-type';
import { deleteType } from '../fn/type-management/delete-type';
import { getAllTypes } from '../fn/type-management/get-all-types';
import { GetAllTypes$Params } from '../fn/type-management/get-all-types';
import { getTypeById } from '../fn/type-management/get-type-by-id';
import { GetTypeById$Params } from '../fn/type-management/get-type-by-id';
import { Type } from '../models/type';
import { updateType } from '../fn/type-management/update-type';


/**
 * Operations related to type management
 */
@Injectable({ providedIn: 'root' })
export class TypeService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllTypes()` */
  static readonly GetAllTypesPath = '/api/v1/type';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllTypes()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTypes$Response(params?: GetAllTypes$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Type>>> {
    return getAllTypes(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllTypes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTypes(params?: GetAllTypes$Params, context?: HttpContext): Observable<Array<Type>> {
    return this.getAllTypes$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Type>>): Array<Type> => r.body)
    );
  }

  /** Path part for operation `updateType()` */
  static readonly UpdateTypePath = '/api/v1/type';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateType()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateType$Response(params: Type, context?: HttpContext): Observable<StrictHttpResponse<Type>> {
    return updateType(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateType$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateType(params: Type, context?: HttpContext): Observable<Type> {
    return this.updateType$Response(params, context).pipe(
      map((r: StrictHttpResponse<Type>): Type => r.body)
    );
  }

  /** Path part for operation `addType()` */
  static readonly AddTypePath = '/api/v1/type';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addType()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addType$Response(params: Type, context?: HttpContext): Observable<StrictHttpResponse<Type>> {
    return addType(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addType$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addType(params: Type, context?: HttpContext): Observable<Type> {
    return this.addType$Response(params, context).pipe(
      map((r: StrictHttpResponse<Type>): Type => r.body)
    );
  }

  /** Path part for operation `getTypeById()` */
  static readonly GetTypeByIdPath = '/api/v1/type/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getTypeById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTypeById$Response(params: GetTypeById$Params, context?: HttpContext): Observable<StrictHttpResponse<Type>> {
    return getTypeById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getTypeById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getTypeById(params: GetTypeById$Params, context?: HttpContext): Observable<Type> {
    return this.getTypeById$Response(params, context).pipe(
      map((r: StrictHttpResponse<Type>): Type => r.body)
    );
  }

  /** Path part for operation `deleteType()` */
  static readonly DeleteTypePath = '/api/v1/type/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteType()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteType$Response(id:number, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteType(this.http, this.rootUrl, id, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteType$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteType(id:number, context?: HttpContext): Observable<void> {
    return this.deleteType$Response(id, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
