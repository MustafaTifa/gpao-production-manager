/* tslint:disable */
/* eslint-disable */
import { OfIntern } from './of-intern';
import { Workstation } from 'src/api-v2/workstation/models/workstation';
import { SuiviOf } from 'src/api-v2/of-suivi/models/suivi-of';

export interface OfInternDto {
  of?: OfIntern;
  posteDeTravail?: Workstation;
  suiviOf?: Array<SuiviOf>;
}