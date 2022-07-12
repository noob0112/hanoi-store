import { objectId } from '../types';

export interface ICategorySummary {
  categoryId: objectId | string;
  categoryName?: string;
}
