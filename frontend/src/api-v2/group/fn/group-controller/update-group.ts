/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Groupe } from '../../models/groupe';


export function updateGroup(http: HttpClient, rootUrl: string, groupe: Groupe, context?: HttpContext): Observable<StrictHttpResponse<Groupe>> {
  let __params = new HttpParams();
  let __headers = new HttpHeaders();
  let __body: any = null;

  __body = groupe;
  let req = new HttpRequest<any>(
    'PUT',
    rootUrl + updateGroup.PATH,
    __body,
    {
      headers: __headers,
      params: __params,
      responseType: 'json'
    });

  return http.request(req).pipe(
    filter(_r => _r instanceof HttpResponse),
    map((_r) => {
      return _r as StrictHttpResponse<Groupe>;
    })
  );
}

updateGroup.PATH = '/api/v1/group';
