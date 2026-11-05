/* tslint:disable */
/* eslint-disable */
import { Workstation } from './workstation';
export interface Travailleur {
  codeTravailleur?: string;
  id?: number;
  libelle?: string;
  observation?: string;
  workstation?: Workstation;
}
