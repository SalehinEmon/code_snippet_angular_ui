import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../models/response.model';
import { FrameworkModel } from '../models/framework_model';

@Injectable({
  providedIn: 'root',
})
export class FrameworkService {
  baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getAllFramework() {
    return this.http.post<ResponseModel>(this.baseUrl + 'framework/getall', []);
  }

  addFramework(framework: FrameworkModel) {
    return this.http.post<ResponseModel>(
      this.baseUrl + 'framework/add',
      framework
    );
  }

  deleteFramework(frameworkId: number) {
    let fromData = new FormData();

    fromData.append('frameworkId', `${frameworkId}`);

    return this.http.post<ResponseModel>(
      this.baseUrl + 'framework/delete',
      fromData
    );
  }
  updateFramework(framework: FrameworkModel) {
    return this.http.post<ResponseModel>(
      this.baseUrl + 'framework/update',
      framework
    );
  }
}
