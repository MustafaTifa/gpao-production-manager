/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addSuiviOf } from '../fn/of-suivi-management/add-suivi-of';
import { deleteSuiviOf } from '../fn/of-suivi-management/delete-suivi-of';
import { getAllSuiviOFs } from '../fn/of-suivi-management/get-all-suivi-o-fs';
import { GetAllSuiviOFs$Params } from '../fn/of-suivi-management/get-all-suivi-o-fs';
import { SuiviOf } from '../models/suivi-of';
import { updateSuiviOf } from '../fn/of-suivi-management/update-suivi-of';
import { NomenclatureOf } from '../models/nomenclature-of';
import { updateNomenclatureOf, UpdateNomenclatureOf$Params } from '../fn/of-suivi-management/update-nomenclature-of';
import { getAllNomenclactureOFs, GetAllNomenclactureOFs$Params } from '../fn/of-suivi-management/get-all-nomenclacture-o-fs';
import { addNomenclatureOf, AddNomenclatureOf$Params } from '../fn/of-suivi-management/add-nomenclature-of';
import { getWorkByTravailleur, GetWorkByTravailleur$Params } from '../fn/of-suivi-management/get-work-by-travailleur';
import { TravailleurWorkDto } from '../models/travailleur-work-dto';


/**
 * OF Suivi related to article management
 */
@Injectable({ providedIn: 'root' })
export class OfSuiviService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `updateSuiviOf()` */
  static readonly UpdateSuiviOfPath = '/api/v1/of_suivi';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateSuiviOf()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSuiviOf$Response(params: SuiviOf, context?: HttpContext): Observable<StrictHttpResponse<SuiviOf>> {
    return updateSuiviOf(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateSuiviOf$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateSuiviOf(params: SuiviOf, context?: HttpContext): Observable<SuiviOf> {
    return this.updateSuiviOf$Response(params, context).pipe(
      map((r: StrictHttpResponse<SuiviOf>): SuiviOf => r.body)
    );
  }

  /** Path part for operation `addSuiviOf()` */
  static readonly AddSuiviOfPath = '/api/v1/of_suivi';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addSuiviOf()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addSuiviOf$Response(params: SuiviOf, context?: HttpContext): Observable<StrictHttpResponse<SuiviOf>> {
    return addSuiviOf(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addSuiviOf$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addSuiviOf(params: SuiviOf, context?: HttpContext): Observable<SuiviOf> {
    return this.addSuiviOf$Response(params, context).pipe(
      map((r: StrictHttpResponse<SuiviOf>): SuiviOf => r.body)
    );
  }

  /** Path part for operation `getAllSuiviOFs()` */
  static readonly GetAllSuiviOFsPath = '/api/v1/of_suivi/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllSuiviOFs()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllSuiviOFs$Response(params?: GetAllSuiviOFs$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<SuiviOf>>> {
    return getAllSuiviOFs(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllSuiviOFs$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllSuiviOFs(params?: GetAllSuiviOFs$Params, context?: HttpContext): Observable<Array<SuiviOf>> {
    return this.getAllSuiviOFs$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<SuiviOf>>): Array<SuiviOf> => r.body)
    );
  }

  /** Path part for operation `deleteSuiviOf()` */
  static readonly DeleteSuiviOfPath = '/api/v1/of_suivi/{id}';

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

  /** Path part for operation `getAllNomenclactureOFs()` */
  static readonly GetAllNomenclactureOFsPath = '/api/v1/of_suivi/nomenclature_of/{idOF}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllNomenclactureOFs()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllNomenclactureOFs$Response(params: GetAllNomenclactureOFs$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<NomenclatureOf>>> {
    return getAllNomenclactureOFs(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllNomenclactureOFs$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllNomenclactureOFs(params: GetAllNomenclactureOFs$Params, context?: HttpContext): Observable<Array<NomenclatureOf>> {
    return this.getAllNomenclactureOFs$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<NomenclatureOf>>): Array<NomenclatureOf> => r.body)
    );
  }

  /** Path part for operation `addNomenclatureOf()` */
  static readonly AddNomenclatureOfPath = '/api/v1/of_suivi/nomenclature_of';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addNomenclatureOf()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addNomenclatureOf$Response(params: AddNomenclatureOf$Params, context?: HttpContext): Observable<StrictHttpResponse<NomenclatureOf>> {
    return addNomenclatureOf(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addNomenclatureOf$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addNomenclatureOf(params: AddNomenclatureOf$Params, context?: HttpContext): Observable<NomenclatureOf> {
    return this.addNomenclatureOf$Response(params, context).pipe(
      map((r: StrictHttpResponse<NomenclatureOf>): NomenclatureOf => r.body)
    );
  }

  /** Path part for operation `updateNomenclatureOf()` */
  static readonly UpdateNomenclatureOfPath = '/api/v1/of_suivi/nomenclature_of';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateNomenclatureOf()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateNomenclatureOf$Response(params: UpdateNomenclatureOf$Params, context?: HttpContext): Observable<StrictHttpResponse<NomenclatureOf>> {
    return updateNomenclatureOf(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateNomenclatureOf$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateNomenclatureOf(params: UpdateNomenclatureOf$Params, context?: HttpContext): Observable<NomenclatureOf> {
    return this.updateNomenclatureOf$Response(params, context).pipe(
      map((r: StrictHttpResponse<NomenclatureOf>): NomenclatureOf => r.body)
    );
  }

  /** Path part for operation `getWorkByTravailleur()` */
  static readonly GetWorkByTravailleurPath = '/api/v1/of_suivi/work-by-travailleur';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getWorkByTravailleur()` instead.
   *
   * This method doesn't expect any request body.
   */
  getWorkByTravailleur$Response(params: GetWorkByTravailleur$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<TravailleurWorkDto>>> {
    return getWorkByTravailleur(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getWorkByTravailleur$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getWorkByTravailleur(params: GetWorkByTravailleur$Params, context?: HttpContext): Observable<Array<TravailleurWorkDto>> {
    return this.getWorkByTravailleur$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<TravailleurWorkDto>>): Array<TravailleurWorkDto> => r.body)
    );
  }

}
