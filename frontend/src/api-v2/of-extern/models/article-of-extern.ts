/* tslint:disable */
/* eslint-disable */
import { Article } from '../models/article';
import { OfExtern } from '../models/of-extern';
import { DetailOfExtern } from './detail-of-extern';
export interface ArticleOfExtern {
  article?: Article;
  createDate?: string;
  id?: number;
  details?: Array<DetailOfExtern>;
  lastModified?: string;
  ofExtern?: OfExtern;
  quantity?: number;
  version?: number;
}
