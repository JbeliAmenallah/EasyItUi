import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesListComponent } from './category-list/category-list.component';
import { AddCategoryComponent } from '../category/add-category/add-category.component';
import { EditCategoryComponent } from '../category/edit-category/edit-category.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesListComponent
  },
  {
    path: 'add',
    component: AddCategoryComponent 
  },
  {
    path: 'edit/:id',
    component: EditCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
