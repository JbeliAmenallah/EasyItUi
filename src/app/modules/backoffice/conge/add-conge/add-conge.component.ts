import { Component } from '@angular/core';
import { Conge } from '../../../../shared/models/conge'; // Update the path to your Conge model
import { CongeService } from '../../../../core/http/conge.service'; // Update the path to your CongeService

@Component({
  selector: 'app-add-conge',
  templateUrl: './add-conge.component.html',
  styleUrls: ['./add-conge.component.css']
})
export class AddCongeComponent {
  conge: Conge = new Conge();

  constructor(private congeService: CongeService) { }

  onSubmit() {
    this.congeService.addConge(this.conge).subscribe(
      (response) => {
        console.log('Conge added:', response);
        // Reset form after successful submission
        this.conge = new Conge();
      },
      (error) => {
        console.error('Error adding Conge:', error);
      }
    );
  }
}
