/* tslint:disable */
/* eslint-disable */
import { Travailleur } from 'src/api-v2/travailleur/models/travailleur';

export interface SuiviOfTravailleur {
  id?: number;
  travailleur?: Travailleur;
  tempEffectif?: number;
  quantite?: number;
}

export interface SuiviOf {
  executionTime?: number;
  id?: number;
  idArticle?: number;
  idOf?: number;
  idWorkstation?: number;
  idsArticles?: Array<number>;
  travailleurs?: Array<SuiviOfTravailleur>;
  gs?: string;
  operation?: string;
  operationDetail?: string;
  pos?: string;
  preparationTime?: number;
  startDate?: string;
  endDate?: string;
  rc?: string;
  observation?: string;
}
