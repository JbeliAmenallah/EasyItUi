import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { Contact } from '../../../../shared/models/contact';
import { ContactService } from '../../../../core/http/contact.service';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  @ViewChild('form') contactForm: ContactFormComponent;
  private contact: Contact;
  messages: Message[] = [];

  constructor(
    private service: ContactService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.contact = {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      phone: '',
      projectId: null
    };
  }

  save() {
    this.contact.firstName = this.contactForm.form.get('firstName')?.value;
    this.contact.lastName = this.contactForm.form.get('lastName')?.value;
    this.contact.email = this.contactForm.form.get('email')?.value;
    this.contact.address = this.contactForm.form.get('address')?.value;
    this.contact.phone = this.contactForm.form.get('phone')?.value;
    this.contact.projectId = this.contactForm.form.get('projectId')?.value;

    this.service.create(this.contact).subscribe(
      (data) => {
        this.messages = [{
          severity: 'success',
          summary: 'Success',
          detail: 'The contact has been successfully added.'
        }];

        setTimeout(() => {
          this.router.navigate(['/contacts']);
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
