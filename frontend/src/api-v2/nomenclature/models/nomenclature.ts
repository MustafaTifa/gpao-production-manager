/* tslint:disable */
/* eslint-disable */
import { Article } from './article';
import { ArticleNomenclature } from './article-nomenclature';
export interface Nomenclature {
  article?: Article;
  articleNomenclatures?: Array<ArticleNomenclature>;
  createDate?: string;
  id?: number;
  lastModified?: string;
  version?: number;
}
