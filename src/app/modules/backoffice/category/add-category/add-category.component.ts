import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { Category } from '../../../../shared/models/category';
import { CategoryService } from '../../../../core/http/category.service';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  @ViewChild('form') categoryForm: CategoryFormComponent;
  private category: Category;
  messages: Message[] = [];

  constructor(
    private service: CategoryService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.category = {
      categoryName: '',
      duration: null,
      startDate: null,
      endDate: null,
      projectId: null
    };
  }

  save() {
  
    this.category.categoryName = this.categoryForm.form.get('categoryName')?.value;
    this.category.duration = this.categoryForm.form.get('duration')?.value;
    this.category.startDate = this.categoryForm.form.get('startDate')?.value;
    this.category.endDate = this.categoryForm.form.get('endDate')?.value;
    this.category.projectId = this.categoryForm.form.get('projectId')?.value;
    if (
      !this.category.categoryName ||
      !this.category.duration ||
      !this.category.startDate ||
      !this.category.endDate ||
      !this.category.projectId
    ) {
      this.messages = [{
        severity: 'error',
        summary: 'Error',
        detail: 'All fields are mandatory.'
      }];
      return; 
    }

    this.service.create(this.category).subscribe(
      (data) => {
   
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The category has been successfully added.' });
        
        setTimeout(() => {
          this.router.navigate(['/categories']);
        }, 100);
      },
      (error) => {
        
        console.error('An error occurred:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
      }
    );
  }
}
