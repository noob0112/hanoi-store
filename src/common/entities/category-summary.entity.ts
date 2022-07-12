import { objectId } from '../types';

export interface ICategorySummary {
  categoryId: string | objectId;
  categoryName?: string;
}
