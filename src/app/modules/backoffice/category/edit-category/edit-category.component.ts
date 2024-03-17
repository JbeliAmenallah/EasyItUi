import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { ActivatedRoute, Router } from "@angular/router";
import { Category } from '../../../../shared/models/category';
import { CategoryService } from '../../../../core/http/category.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  @ViewChild('form') categoryForm: CategoryFormComponent;
  @Input() category: Category;

  id: any;
  messages: Message[] = [];

  constructor(
    private service: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    if (this.route.snapshot.paramMap.get('id') != undefined) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.getCategory();
    } else {
      this.route.queryParams.subscribe((params) => {
        if (params['id'] !== undefined) {
          this.id = params['id'];
          this.getCategory();
        } else if (this.router.getCurrentNavigation() != null) {
          const extrasState = this.router.getCurrentNavigation()?.extras.state;
          if (extrasState !== undefined && extrasState['data'] !== undefined) {
            this.categoryForm = extrasState['data'];
          } else {
            this.router.navigate(['/categories']);
          }
        }
      });
    }
  }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    this.service.read(this.id).subscribe({
      next: (item: Category) => {
        this.category = item;
        console.log(item);
      },
      error: (error) => {
        console.error("An error occurred while reading the category:", error);
        this.goToList();
      }
    });
  }

  goToList() {
    this.router.navigate(['/categories']);
  }

  save() {
    
    this.category.categoryName = this.categoryForm.form.get('categoryName')?.value;
    this.category.startDate = this.categoryForm.form.get('startDate')?.value;
    this.category.duration = this.categoryForm.form.get('duration')?.value;
    this.category.endDate = this.categoryForm.form.get('endDate')?.value;
    this.category.projectId = this.categoryForm.form.get('projectId')?.value;
  
    
    if (
      !this.category.categoryName ||
      !this.category.startDate ||
      !this.category.duration ||
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
    this.service.update(this.category).subscribe(
      (data) => {
        this.messages = [{
          severity: 'success',
          summary: 'Success',
          detail: 'The category has been successfully updated.'
        }];
  
        setTimeout(() => {
          this.router.navigate(['/categories']);
        }, 1000);
      },
      (error) => {
        if (error.status === 400) {
          this.messages = [{
            severity: 'error',
            summary: 'Error',
            detail: error.error.message
          }];
        } else {
          console.error('An error occurred:', error);
        }
      }
    );
  }
  
}
