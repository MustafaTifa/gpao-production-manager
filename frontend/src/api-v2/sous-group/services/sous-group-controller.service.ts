/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addGroup } from '../fn/sous-group-controller/add-group';
import { deleteGroup } from '../fn/sous-group-controller/delete-group';
import { getAllGroups } from '../fn/sous-group-controller/get-all-groups';
import { GetAllGroups$Params } from '../fn/sous-group-controller/get-all-groups';
import { getGroupById } from '../fn/sous-group-controller/get-group-by-id';
import { GetGroupById$Params } from '../fn/sous-group-controller/get-group-by-id';
import { SousGroupe } from '../models/sous-groupe';
import { updateGroup } from '../fn/sous-group-controller/update-group';

@Injectable({ providedIn: 'root' })
export class SousGroupControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllGroups()` */
  static readonly GetAllGroupsPath = '/api/v1/sous-group';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllGroups()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllGroups$Response(params?: GetAllGroups$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<SousGroupe>>> {
    return getAllGroups(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllGroups$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllGroups(params?: GetAllGroups$Params, context?: HttpContext): Observable<Array<SousGroupe>> {
    return this.getAllGroups$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<SousGroupe>>): Array<SousGroupe> => r.body)
    );
  }

  /** Path part for operation `updateGroup()` */
  static readonly UpdateGroupPath = '/api/v1/sous-group';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateGroup()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateGroup$Response(params: SousGroupe, context?: HttpContext): Observable<StrictHttpResponse<SousGroupe>> {
    return updateGroup(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateGroup$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateGroup(params: SousGroupe, context?: HttpContext): Observable<SousGroupe> {
    return this.updateGroup$Response(params, context).pipe(
      map((r: StrictHttpResponse<SousGroupe>): SousGroupe => r.body)
    );
  }

  /** Path part for operation `addGroup()` */
  static readonly AddGroupPath = '/api/v1/sous-group';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addGroup()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addGroup$Response(params: SousGroupe, context?: HttpContext): Observable<StrictHttpResponse<SousGroupe>> {
    return addGroup(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addGroup$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addGroup(params: SousGroupe, context?: HttpContext): Observable<SousGroupe> {
    return this.addGroup$Response(params, context).pipe(
      map((r: StrictHttpResponse<SousGroupe>): SousGroupe => r.body)
    );
  }

  /** Path part for operation `getGroupById()` */
  static readonly GetGroupByIdPath = '/api/v1/sous-group/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getGroupById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGroupById$Response(params: GetGroupById$Params, context?: HttpContext): Observable<StrictHttpResponse<SousGroupe>> {
    return getGroupById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getGroupById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGroupById(params: GetGroupById$Params, context?: HttpContext): Observable<SousGroupe> {
    return this.getGroupById$Response(params, context).pipe(
      map((r: StrictHttpResponse<SousGroupe>): SousGroupe => r.body)
    );
  }

  /** Path part for operation `deleteGroup()` */
  static readonly DeleteGroupPath = '/api/v1/sous-group/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteGroup()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteGroup$Response(id: number, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteGroup(this.http, this.rootUrl, id, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteGroup$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteGroup(id: number, context?: HttpContext): Observable<void> {
    return this.deleteGroup$Response(id, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
