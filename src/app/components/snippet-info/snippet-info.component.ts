import { NgFor, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SnippetModel } from '../../models/snippet_model';
import { SnippetService } from '../../services/snippet.service';
import { LanguageModel } from '../../models/language_model';
import { FrameworkModel } from '../../models/framework_model';
import { TopicModel } from '../../models/topic_model';
import { LanguageService } from '../../services/language.service';
import { TopicService } from '../../services/topic.service';
import { FrameworkService } from '../../services/framework.service';

@Component({
  selector: 'app-snippet-info',
  standalone: true,
  imports: [NgFor, FontAwesomeModule, NgStyle, FormsModule],
  templateUrl: './snippet-info.component.html',
  styleUrl: './snippet-info.component.css',
})
export class SnippetInfoComponent {
  faEdit = faEdit;
  faAdd = faPlus;
  faDelete = faTrash;
  faEye = faEye;

  loading = false;
  hidden = 'hidden';
  snippetToAdd: SnippetModel = {};
  snippetToUpdate: SnippetModel = {};
  snippetIdToDelete: number = 0;
  snippetIdToView: number = 0;

  searchLanguageId: number = 0;
  searchTopicId: number = 0;
  searchFrameworkId: number = 0;
  searchTitle: String = '';

  displayUpdateModal = 'none';
  displayViewModal = 'none';
  deleteModal = 'none';

  slNo: number = 1;
  response: any = {};
  snippetList: SnippetModel[] = [];
  languageList: LanguageModel[] = [];
  frameworkList: FrameworkModel[] = [];
  topicList: TopicModel[] = [];
  viewSnippet: SnippetModel = {};

  constructor(private snippetService: SnippetService,
    private topicService: TopicService,
    private frameworkService: FrameworkService,
    private languageService: LanguageService) { }

  ngOnInit() {
    this.loadSnippets();
  }

  loadSnippets() {
    this.snippetService.getAllSnippet().subscribe((data) => {
      this.response = data;
      this.snippetList = this.response.requestedBody as SnippetModel[];
    });
    this.languageService.getAllLanguages().subscribe((data) => {
      this.languageList = data.requestedBody as LanguageModel[];
    });

    this.topicService.getAllTopic().subscribe((data) => {
      this.topicList = data.requestedBody as TopicModel[];
    });
    this.frameworkService.getAllFramework().subscribe((data) => {
      this.frameworkList = data.requestedBody as FrameworkModel[];
    })
  }

  addSnippets() {
    this.snippetService.addSnippet(this.snippetToAdd).subscribe((data) => {
      if (data.isSuccess) {
        this.loadSnippets();
      }
    });
  }

  updateSnippet() {
    if (this.snippetToUpdate) {
      this.snippetService
        .updateSnippet(this.snippetToUpdate)
        .subscribe((data) => {
          if (data.isSuccess) {
            this.closeUpdateModal();
            this.loadSnippets();
          }
        });
    }
  }

  loadUpdateData(snippetId: number) {
    this.snippetToUpdate = this.snippetList.find(
      (l) => l.snippetId === snippetId
    )!;
    if (this.snippetToUpdate) {
      this.showUpdateModal();
    }
  }



  deleteSnippet() {
    if (this.snippetIdToDelete) {
      this.snippetService
        .deleteTopic(this.snippetIdToDelete)
        .subscribe((data) => {
          if (data.isSuccess) {
            this.closeDeleteModal();
            this.loadSnippets();
          }
        });
    }
  }

  onDeleteButtonClick(snippetId: number) {
    this.snippetIdToDelete = snippetId;
    this.showDeleteModal();
  }

  onViewButtonClick(snippetId: number) {

    this.viewSnippet = this.snippetList.find(
      (l) => l.snippetId === snippetId
    )!;

    if (this.viewSnippet) {
      // this.snippetIdToView = snippetId;
      this.showViewModal();
    }

  }

  onSearchBtnClick() {
    this.snippetService.searchSnippet(this.searchLanguageId, this.searchTopicId,
      this.searchFrameworkId, this.searchTitle)
      .subscribe((data) => {
        if (data.isSuccess) {
          this.response = data;
          this.snippetList = this.response.requestedBody as SnippetModel[];
        }
      });

  }

  showViewModal() {
    this.displayViewModal = 'block';
  }

  closeViewModal() {
    this.displayViewModal = 'none';
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
