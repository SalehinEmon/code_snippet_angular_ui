import { Component } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { LanguageModel } from '../../models/language_model';
import { ResponseModel } from '../../models/response.model';
import { NgFor, NgStyle } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCoffee,
  faEdit,
  faPlus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-language',
  standalone: true,
  imports: [NgFor, FontAwesomeModule, NgStyle, FormsModule],
  templateUrl: './language.component.html',
  styleUrl: './language.component.css',
})
export class LanguageComponent {
  faEdit = faEdit;
  faAdd = faPlus;
  faDelete = faTrash;

  loading = false;
  hidden = 'hidden';

  languageToAdd: LanguageModel = {};
  languageToUpdate: LanguageModel = {};
  languageIdToDelete: number = 0;

  display = 'none';

  displayUpdateModal = 'none';
  deleteModal = 'none';

  slNo: number = 1;
  response: ResponseModel = {};
  languageList: LanguageModel[] = [];
  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.slNo = 1;
    this.loadLanguages();
  }

  openModal() {
    this.display = 'block';
  }

  onCloseHandled() {
    this.display = 'none';
  }

  loadLanguages() {
    this.languageService.getAllLanguages().subscribe((data) => {
      this.response = data;
      this.languageList = this.response.requestedBody as LanguageModel[];
    });
  }

  addLanguge() {
    this.languageService.addLanguage(this.languageToAdd).subscribe((data) => {
      if (data.isSuccess) {
        this.loadLanguages();
      }
    });
  }

  loadUpdateData(languageId: number) {
    this.languageToUpdate = this.languageList.find(
      (l) => l.languageId === languageId
    )!;
    if (this.languageToUpdate) {
      this.showUpdateModal();
    }
  }

  updateLanguage() {
    if (this.languageToUpdate) {
      this.languageService
        .updteLanguage(this.languageToUpdate)
        .subscribe((data) => {
          if (data.isSuccess) {
            this.closeUpdateModal();
            this.loadLanguages();
          }
        });
    }
  }
  onDeleteButtonClick(languageId: number) {
    this.languageIdToDelete = languageId;
    this.showDeleteModal();
  }
  deleteLanguage() {
    this.languageService.deleteLanguage(this.languageIdToDelete).subscribe((data) => {
      if (data.isSuccess) {
        this.closeDeleteModal();
        this.loadLanguages();
      }
    });
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
