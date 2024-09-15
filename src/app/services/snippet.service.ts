import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../models/response.model';
import { SnippetModel } from '../models/snippet_model';

@Injectable({
  providedIn: 'root'
})
export class SnippetService {

  baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getAllSnippet() {
    return this.http.post<ResponseModel>(this.baseUrl + 'snippet/get', []);
  }

  addSnippet(snippet: SnippetModel) {
    return this.http.post<ResponseModel>(this.baseUrl + 'snippet/add', snippet);
  }
  deleteTopic(snippetId: number) {
    let fromData = new FormData();

    fromData.append('snippetId', `${snippetId}`);

    return this.http.post<ResponseModel>(
      this.baseUrl + 'snippet/delete',
      fromData
    );
  }

  updateSnippet(snippet: SnippetModel) {
    return this.http.post<ResponseModel>(this.baseUrl + 'snippet/update', snippet);
  }

  searchSnippet(languageId: number, topicId: number,
    frameworkId: number, searchTitle: String) {
    let fromData = new FormData();

    fromData.append('languageId', `${languageId}`);
    fromData.append('topicId', `${topicId}`);
    fromData.append('frameworkId', `${frameworkId}`);
    fromData.append('title', `${searchTitle}`);

    return this.http.post<ResponseModel>(
      this.baseUrl + 'Snippet/search',
      fromData
    );


  }
}
