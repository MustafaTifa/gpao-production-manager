/* tslint:disable */
/* eslint-disable */
import { SuiviOf } from '../models/suivi-of';
import { Travailleur } from '../models/travailleur';
export interface SuiviOfTravailleur {
  id?: number;
  quantite?: number;
  suiviOf?: SuiviOf;
  tempEffectif?: number;
  travailleur?: Travailleur;
}
