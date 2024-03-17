import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CongeRoutingModule } from './conge-routing.module';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AddCongeComponent } from './add-conge/add-conge.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule


@NgModule({
  declarations: [
    AddCongeComponent
  ],
  imports: [
    CommonModule,
    CongeRoutingModule,
    FormsModule, // Add FormsModule here
    HttpClientModule 
  ]
})
export class CongeModule { }
