import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../models/response.model';
import { TopicModel } from '../models/topic_model';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getAllTopic() {
    return this.http.post<ResponseModel>(this.baseUrl + 'topic/get', []);
  }
  addTopic(topic: TopicModel) {
    return this.http.post<ResponseModel>(this.baseUrl + 'topic/add', topic);
  }
  deleteTopic(topicId: number) {
    let fromData = new FormData();

    fromData.append('topicId', `${topicId}`);

    return this.http.post<ResponseModel>(
      this.baseUrl + 'topic/delete',
      fromData
    );
  }
  updateTopic(topic: TopicModel) {
    return this.http.post<ResponseModel>(this.baseUrl + 'topic/update', topic);
  }
}
