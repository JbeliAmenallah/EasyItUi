import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule)
  },

  {
    path: 'resources',
    loadChildren: () => import('./modules/backoffice/resources/resource.module').then((m) => m.ResourceModule)
  },
  {
    path: 'projects',
    loadChildren: () => import('./modules/backoffice/projects/project.module').then((m) => m.ProjectModule)
  },
  {
    path: 'functionalities',
    loadChildren: () => import('./modules/backoffice/functionalities/functionality.module').then((m) => m.FunctionalityModule)
  },
  
  {
    path: 'tasks',
    loadChildren: () => import('./modules/backoffice/tasks/task.module').then((m) => m.TaskModule)
  },
  {
    path: 'contacts',
    loadChildren: () => import('./modules/backoffice/contact/contact.module').then((m) => m.ContactModule)
  },
  {
    path: 'conge',
    loadChildren: () => import('./modules/backoffice/conge/conge.module').then((m) => m.CongeModule)
  },
  {
    path: 'stopwatchs',
    loadChildren: () => import('./modules/backoffice/stopwatchs/stopwatch.module').then((m) => m.StopwatchModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./modules/backoffice/category/category.module').then((m) => m.CategoryModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
