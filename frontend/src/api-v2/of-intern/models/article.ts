/* tslint:disable */
/* eslint-disable */
import { ArticleGamme } from './article-gamme';
import { Engin } from './engin';
import { Groupe } from './groupe';
import { OfIntern } from './of-intern';
import { SousGroupe } from './sous-groupe';
import { Type } from './type';
export interface Article {
  action?: string;
  articleGammes?: Array<ArticleGamme>;
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
  ofIntern?: OfIntern;
  sousGroupe?: SousGroupe;
  type?: Type;
  typeArticle?: 'PARENT' | 'CHILD';
  version?: number;
  sortieUnit?: string;
}
