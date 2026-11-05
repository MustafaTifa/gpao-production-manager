/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addGroup } from '../fn/group-controller/add-group';
import { deleteGroup } from '../fn/group-controller/delete-group';
import { getAllGroups } from '../fn/group-controller/get-all-groups';
import { GetAllGroups$Params } from '../fn/group-controller/get-all-groups';
import { getGroupById } from '../fn/group-controller/get-group-by-id';
import { GetGroupById$Params } from '../fn/group-controller/get-group-by-id';
import { Groupe } from '../models/groupe';
import { updateGroup } from '../fn/group-controller/update-group';

@Injectable({ providedIn: 'root' })
export class GroupControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getGroupById()` */
  static readonly GetGroupByIdPath = '/api/v1/group/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getGroupById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGroupById$Response(params: GetGroupById$Params, context?: HttpContext): Observable<StrictHttpResponse<Groupe>> {
    return getGroupById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getGroupById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getGroupById(params: GetGroupById$Params, context?: HttpContext): Observable<Groupe> {
    return this.getGroupById$Response(params, context).pipe(
      map((r: StrictHttpResponse<Groupe>): Groupe => r.body)
    );
  }

  /** Path part for operation `updateGroup()` */
  static readonly UpdateGroupPath = '/api/v1/group/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateGroup()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateGroup$Response(groupe: Groupe, context?: HttpContext): Observable<StrictHttpResponse<Groupe>> {
    return updateGroup(this.http, this.rootUrl, groupe, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateGroup$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  updateGroup(groupe: Groupe, context?: HttpContext): Observable<Groupe> {
    return this.updateGroup$Response(groupe, context).pipe(
      map((r: StrictHttpResponse<Groupe>): Groupe => r.body)
    );
  }

  /** Path part for operation `deleteGroup()` */
  static readonly DeleteGroupPath = '/api/v1/group/{id}';

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

  /** Path part for operation `getAllGroups()` */
  static readonly GetAllGroupsPath = '/api/v1/group';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllGroups()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllGroups$Response(params?: GetAllGroups$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Groupe>>> {
    return getAllGroups(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllGroups$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllGroups(params?: GetAllGroups$Params, context?: HttpContext): Observable<Array<Groupe>> {
    return this.getAllGroups$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<Groupe>>): Array<Groupe> => r.body)
    );
  }

  /** Path part for operation `addGroup()` */
  static readonly AddGroupPath = '/api/v1/group';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addGroup()` instead.
   *
   * This method doesn't expect any request body.
   */
  addGroup$Response(groupe: Groupe, context?: HttpContext): Observable<StrictHttpResponse<Groupe>> {
    return addGroup(this.http, this.rootUrl, groupe, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addGroup$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  addGroup(groupe: Groupe, context?: HttpContext): Observable<Groupe> {
    return this.addGroup$Response(groupe, context).pipe(
      map((r: StrictHttpResponse<Groupe>): Groupe => r.body)
    );
  }

}
