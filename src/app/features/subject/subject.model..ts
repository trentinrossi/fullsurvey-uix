import { Category } from './../category/category.model';
export interface Subject {
  id: string;
  category: Category;
  name: string;
}
