/* tslint:disable */
/* eslint-disable */
import { Article } from '../models/article';
import { Workstation } from '../models/workstation';
export interface Gamme {
  articles?: Array<Article>;
  createDate?: string;
  executionTime?: number;
  id?: number;
  lastModified?: string;
  gs?: string;
  observation?: string;
  preparationTime?: number;
  operation?: string;
  operationDetail?: string;
  pos?: number;
  rc?: string;
  workstation?: Workstation;
  version?: number;
}
