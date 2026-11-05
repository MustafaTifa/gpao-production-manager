/* tslint:disable */

import { Article } from "src/api-v2/article/models";
import { Nomenclature } from "src/api-v2/nomenclature/models";

/* eslint-disable */
export interface ArticleNomenclature {
  id?: number;
  observation?: string;
  quantity?: number;
  pos?:string;
  article?: Article;
  nomenclature?: Nomenclature;
  type?: 'PARENT' | 'CHILD';
}
