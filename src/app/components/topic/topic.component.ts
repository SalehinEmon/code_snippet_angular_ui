import { NgFor, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TopicModel } from '../../models/topic_model';
import { TopicService } from '../../services/topic.service';

@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [NgFor, FontAwesomeModule, NgStyle, FormsModule],
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.css',
})
export class TopicComponent {
  faEdit = faEdit;
  faAdd = faPlus;
  faDelete = faTrash;

  loading = false;
  hidden = 'hidden';
  topicToAdd: TopicModel = {};
  topicToUpdate: TopicModel = {};
  topicIdToDelete: number = 0;

  displayUpdateModal = 'none';
  deleteModal = 'none';
  slNo: number = 1;
  response: any = {};
  topicList: TopicModel[] = [];

  constructor(private topicService: TopicService) {}
  ngOnInit(){
    this.loadTopics();
  }

  loadTopics() {
    this.topicService.getAllTopic().subscribe((data) => {
      this.response = data;
      this.topicList = this.response.requestedBody as TopicModel[];
    });
  }

  addtopics() {
    this.topicService.addTopic(this.topicToAdd).subscribe((data) => {
      if (data.isSuccess) {
        this.loadTopics();
      }
    });
  }

  updateTopic() {
    if (this.topicToUpdate) {
      this.topicService.updateTopic(this.topicToUpdate).subscribe((data) => {
        if (data.isSuccess) {
          this.closeUpdateModal();
          this.loadTopics();
        }
      });
    }
  }

  loadUpdateData(topicId: number) {
    this.topicToUpdate = this.topicList.find((l) => l.topicId === topicId)!;
    if (this.topicToUpdate) {
      this.showUpdateModal();
    }
  }

  deleteTopic() {
    if (this.topicIdToDelete) {
      this.topicService
        .deleteTopic(this.topicIdToDelete)
        .subscribe((data) => {
          if (data.isSuccess) {
            this.closeDeleteModal();
            this.loadTopics();
          }
        });
    }
  }

  onDeleteButtonClick(topicId: number) {
    this.topicIdToDelete = topicId;
    this.showDeleteModal();
  } 

  showUpdateModal() {
    this.displayUpdateModal = 'block';
  }
  closeUpdateModal() {
    this.displayUpdateModal = 'none';
  }

  showDeleteModal() {
    this.deleteModal = 'block';
  }
  closeDeleteModal() {
    this.deleteModal = 'none';
  }
}
