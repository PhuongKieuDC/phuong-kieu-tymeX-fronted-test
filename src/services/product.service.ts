import APIService from './base.service';
import { QueryParams } from './../interface/home';

export class ProductService {
  static getProducts(params: QueryParams): Promise<any> {
    return APIService.get('/product', { params });
  }
}
