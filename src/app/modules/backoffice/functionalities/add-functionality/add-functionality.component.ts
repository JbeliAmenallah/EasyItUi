import { Component, OnInit, ViewChild } from '@angular/core'
import { FunctionalityFormComponent } from '../functionality-form/functionality-form.component'
import { Router } from '@angular/router'
import { Functionality } from '../../../../shared/models/functionality'
import { FunctionalityService } from '../../../../core/auth/Functionality.service'
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-functionality',
  templateUrl: './add-functionality.component.html',
  styleUrls: ['./add-functionality.component.css'],
})
export class AddFunctionalityComponent implements OnInit {
  @ViewChild('form') functionalityForm: FunctionalityFormComponent

  private functionality: Functionality
  messages: Message[] = []

  constructor(private service: FunctionalityService, private router: Router, 
    private messageService: MessageService
    ) {}

  ngOnInit(): void {
    this.functionality = {
      functionalityName: '',
      descriptionFunctionality: '',
      priority: 0,
      status: '',
      complexityLevel: '',
      startDate: new Date(),
      endDate: new Date(),
      previousTask: 1,
      nextTask: 2,
      parentTask: '',
      projectId: null,
    }
  }

  save() {

    if (this.functionalityForm.form.valid) {

    this.functionality.functionalityName = this.functionalityForm.form.get(
      'functionalityName',
    )?.value
    this.functionality.descriptionFunctionality = this.functionalityForm.form.get(
      'descriptionFunctionality',
    )?.value
    this.functionality.priority = parseInt(
      this.functionalityForm.form.get('priority')?.value,
    )
    this.functionality.status = this.functionalityForm.form.get('status')?.value
    this.functionality.complexityLevel = this.functionalityForm.form.get(
      'complexityLevel',
    )?.value
    this.functionality.projectId = parseInt(
      this.functionalityForm.form.get('projectId')?.value,
    )

    this.service.create(this.functionality).subscribe(
      (data) => {
        setTimeout(() => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The functionality has been successfully added.' });
        }, 100);
        this.router.navigate(['/functionalities']);
      },
      (error) => {

          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message || 'An error occurred while saving the functionality.' });
        
      }
    );
    }else {
      this.messageService.add({ severity: 'error', summary: 'Validation Error', detail: 'Please fill in all required fields.' });
    }

  }
}
