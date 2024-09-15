import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LanguageModel } from '../models/language_model';
import { environment } from '../../environments/environment';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getAllLanguages() {
    return this.http.post<ResponseModel>(this.baseUrl + 'Language/get', []);
  }

  addLanguage(language: LanguageModel) {  
    return this.http.post<ResponseModel>(this.baseUrl + 'Language/add', language);
  }

  deleteLanguage(languageId:number){
    let fromData = new FormData();

    fromData.append('languageId', `${languageId}`);
  
    return this.http.post<ResponseModel>(this.baseUrl + 'Language/delete', fromData);
  }
  updteLanguage(language:LanguageModel){
    return this.http.post<ResponseModel>(this.baseUrl + 'Language/update', language);
  }
}
