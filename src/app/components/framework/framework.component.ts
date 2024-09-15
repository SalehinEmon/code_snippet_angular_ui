import { NgFor, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FrameworkService } from '../../services/framework.service';
import { FrameworkModel } from '../../models/framework_model';

@Component({
  selector: 'app-framework',
  standalone: true,
  imports: [NgFor, FontAwesomeModule, NgStyle, FormsModule],
  templateUrl: './framework.component.html',
  styleUrl: './framework.component.css',
})
export class FrameworkComponent {
  faEdit = faEdit;
  faAdd = faPlus;
  faDelete = faTrash;

  loading = false;
  hidden = 'hidden';
  frameworkToAdd: FrameworkModel = {};
  frameworkToUpdate: FrameworkModel = {};
  frameworkIdToDelete: number = 0;

  displayUpdateModal = 'none';
  deleteModal = 'none';
  slNo: number = 1;
  response: any = {};
  FrameworkList: FrameworkModel[] = [];

  constructor(private framewrokService: FrameworkService) {}
  ngOnInit(){
    this.loadFrameworks();
  }

  loadFrameworks() {
    this.framewrokService.getAllFramework().subscribe((data) => {
      this.response = data;
      this.FrameworkList = this.response.requestedBody as FrameworkModel[];
    });
  }

  addFramworks() {
    this.framewrokService.addFramework(this.frameworkToAdd).subscribe((data) => {
      if (data.isSuccess) {
        this.loadFrameworks();
      }
    }); 
  } 

  updateFramework() {
    if (this.frameworkToUpdate) {
      this.framewrokService.updateFramework(this.frameworkToUpdate).subscribe((data) => {
        if (data.isSuccess) {
          this.closeUpdateModal();
          this.loadFrameworks();
        }
      });
    }
  } 

  loadUpdateData(frameworkId: number) {
    this.frameworkToUpdate = this.FrameworkList.find((l) => l.frameworkId === frameworkId)!;
    if (this.frameworkToUpdate) {
      this.showUpdateModal();
    }
  }
  
  deleteFramework() {
    if (this.frameworkIdToDelete) {
      this.framewrokService.deleteFramework(this.frameworkIdToDelete).subscribe((data) => {
        if (data.isSuccess) {
          this.closeDeleteModal();
          this.loadFrameworks();
        }
      });
    }
  }   







  onDeleteButtonClick(frameworkId: number) {
    this.frameworkIdToDelete = frameworkId;
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
