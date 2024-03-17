import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
const routes: Routes = [
  {
    path: "",
    component: ProjectsListComponent
  },
  {
    path: "add",
    component: AddProjectComponent
  },
  {
    path: 'edit/:id',
    component: EditProjectComponent

  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
