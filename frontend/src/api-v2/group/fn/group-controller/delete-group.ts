/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export function deleteGroup(http: HttpClient, rootUrl: string, id: number, context?: HttpContext): Observable<StrictHttpResponse<void>> {
  let __params = new HttpParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      rootUrl + deleteGroup.PATH + id,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return http.request(req).pipe(
      filter(_r => _r instanceof HttpResponse),
      map((_r) => {
        return _r as StrictHttpResponse<null>;
      })
    );
}

deleteGroup.PATH = '/api/v1/group/';
