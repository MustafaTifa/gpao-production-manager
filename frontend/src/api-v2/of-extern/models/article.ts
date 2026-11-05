/* tslint:disable */
/* eslint-disable */
import { ArticleGamme } from '../models/article-gamme';
import { Engin } from '../models/engin';
import { Groupe } from '../models/groupe';
import { SousGroupe } from '../models/sous-groupe';
import { Type } from '../models/type';
export interface Article {
  action?: string;
  articleGammes?: Array<ArticleGamme>;
  createDate?: string;
  engins?: Array<Engin>;
  facteurTaux?: number;
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
  arcticle_ass?: string;
  id_arcticle_ass?: number;
  nbrTole?: number;
}
