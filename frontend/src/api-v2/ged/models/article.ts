/* tslint:disable */
/* eslint-disable */
import { ArticleGamme } from './article-gamme';
import { ArticleNomenclature } from './article-nomenclature';
import { Engin } from './engin';
import { Groupe } from './groupe';
import { SousGroupe } from './sous-groupe';
import { Type } from './type';
export interface Article {
  articleGammes?: Array<ArticleGamme>;
  articleNomenclatures?: Array<ArticleNomenclature>;
  createDate?: string;
  engins?: Array<Engin>;
  fournisseurREF?: string;
  gammeId?: number;
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
