/* tslint:disable */
/* eslint-disable */
import { ArticleNomenclature } from '../models/article-nomenclature';
import { Engin } from '../models/engin';
import { Groupe } from '../models/groupe';
import { SousGroupe } from '../models/sous-groupe';
import { Type } from '../models/type';
export interface Article {
  articleNomenclatures?: Array<ArticleNomenclature>;
  createDate?: string;
  engins?: Array<Engin>;
  fournisseurREF?: string;
  groupe?: Groupe;
  id?: number;
  identifiant?: string;
  identifiantSomatel?: string;
  lastModified?: string;
  libelleEN?: string;
  libelleFR?: string;
  libelleGER?: string;
  nature?: string;
  numberDessin?: string;
  observation?: string;
  sousGroupe?: SousGroupe;
  type?: Type;
  typeArticle?: 'PARENT' | 'CHILD';
  version?: number;
}
