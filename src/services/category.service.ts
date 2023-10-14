import APIService from './base.service';
import { Category } from 'src/interface/home';

export class CategoryService {
  static getCategory(): Promise<any> {
    return APIService.get('/category');
  }
}
