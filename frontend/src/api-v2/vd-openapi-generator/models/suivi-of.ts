/* tslint:disable */
/* eslint-disable */
import { SuiviOfTravailleur } from '../models/suivi-of-travailleur';
export interface SuiviOf {
  endDate?: string;
  executionTime?: number;
  gs?: string;
  id?: number;
  idArticle?: number;
  idOf?: number;
  idWorkstation?: number;
  idsArticles?: Array<number>;
  operation?: string;
  operationDetail?: string;
  pos?: string;
  preparationTime?: number;
  startDate?: string;
  travailleurs?: Array<SuiviOfTravailleur>;
}
