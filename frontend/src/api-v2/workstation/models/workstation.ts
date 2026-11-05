/* tslint:disable */

import { CFI } from "src/api-v2/cfi/models/cfi";

/* eslint-disable */
export interface Workstation {
  codeWorkstation?: string;
  id?: number;
  libelle?: string;
  observation?: string;
  cfi?: CFI
}
