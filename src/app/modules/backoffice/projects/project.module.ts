import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ProjectRoutingModule } from './project-routing.module';
import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ProjectDetailsComponent } from './project-details/project-details.component';


@NgModule({
  declarations: [
    AddProjectComponent,
    EditProjectComponent,
    ProjectFormComponent,
    ProjectsListComponent,
    ProjectDetailsComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    SharedModule  ,
    ConfirmDialogModule,
    ToastModule,
    KeyFilterModule,
    InputTextModule

  ],
  providers: [
    ConfirmationService, 
    MessageService 
    
  ]
})
export class ProjectModule {}
