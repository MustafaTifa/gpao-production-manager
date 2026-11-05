/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';
import { TravailleurWorkDto } from 'src/api-v2/of-suivi/models/travailleur-work-dto';


export interface GetWorkByTravailleur$Params {
  startDate: string;
  endDate: string;
  workstationId?: number;
}

export function getWorkByTravailleur(http: HttpClient, rootUrl: string, params: GetWorkByTravailleur$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<TravailleurWorkDto>>> {
  const rb = new RequestBuilder(rootUrl, getWorkByTravailleur.PATH, 'get');
  if (params) {
    rb.query('startDate', params.startDate, {});
    rb.query('endDate', params.endDate, {});
    rb.query('workstationId', params.workstationId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<TravailleurWorkDto>>;
    })
  );
}

getWorkByTravailleur.PATH = '/api/v1/of_suivi/work-by-travailleur';
