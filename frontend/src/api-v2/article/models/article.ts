/* tslint:disable */
/* eslint-disable */
import { Engin } from './engin';
import { Groupe } from './groupe';
import { SousGroupe } from './sous-groupe';
import { Type } from './type';
export interface Article {
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
  version?: number;
  operation?: string;
  facteurTaux?: number;
  sortieUnit?: string;
}
