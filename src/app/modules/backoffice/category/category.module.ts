import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar'; 
import { DropdownModule } from 'primeng/dropdown';

import { CategoriesListComponent } from './category-list/category-list.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryRoutingModule } from './category-routing.module';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessagesModule } from 'primeng/messages';
import { SharedModule } from '../../../shared/shared.module';
import { CategoryDetailsComponent } from './category-details/category-details.component';
@NgModule({
  declarations: [
    CategoriesListComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    CategoryFormComponent,
    CategoryDetailsComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    ReactiveFormsModule,
    CalendarModule, 
    DropdownModule, // Importez DropdownModule une seule fois
    ButtonModule,
    SharedModule,
    ConfirmDialogModule,
    ToastModule,
    InputTextModule,
    InputNumberModule,
    TableModule,
    MessagesModule
  ],
  providers: [
    ConfirmationService, 
    MessageService 
  ]
})
export class CategoryModule {}
