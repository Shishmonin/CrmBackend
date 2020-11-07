import { Injectable } from '@angular/core';
import {Category} from "../model/Category";
import {TestData} from "../data/Testdata";

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  constructor() { }

  getCategories(): Category[] {
    return TestData.categories;
  }

}
