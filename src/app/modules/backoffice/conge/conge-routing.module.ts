import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCongeComponent } from './add-conge/add-conge.component';


const routes: Routes = [
  {
    path: 'add',
    component: AddCongeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CongeRoutingModule { }
