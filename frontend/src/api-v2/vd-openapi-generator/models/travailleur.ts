/* tslint:disable */
/* eslint-disable */
import { Workstation } from '../models/workstation';
export interface Travailleur {
  codeTravailleur?: string;
  id?: number;
  libelle?: string;
  observation?: string;
  workstation?: Workstation;
}
