/* tslint:disable */
/* eslint-disable */
import { Article } from '../models/article';
import { OfExtern } from '../models/of-extern';
export interface SuiviOfExtern {
  article?: Article;
  bonDeLivraison?: string;
  date?: string;
  id?: number;
  of?: OfExtern;
  quantity?: number;
  suiviType?: string;
}
