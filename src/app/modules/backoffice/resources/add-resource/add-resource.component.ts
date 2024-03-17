import { Component, OnInit, ViewChild } from '@angular/core';
import { ResourceFormComponent } from '../resource-form/resource-form.component';
import { Resource } from '../../../../shared/models/resource';
import { Router } from '@angular/router';
import { ResourceService } from '../../../../core/http/resource.service';
import { Message } from 'primeng/api';
@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.css']
})
export class AddResourceComponent implements OnInit {

  @ViewChild('form') resourceForm: ResourceFormComponent;

  private resource: Resource;
  messages: Message[] = [];
  constructor(
    private service: ResourceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.resource = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      address: '',
      maritalStatus: '',
      numberOfChildren: 0,
      position: '',
      role: '',
      hireDate: null
    };
  }

  save() {
    this.resource.firstName = this.resourceForm.form.get('firstName')?.value;
    this.resource.lastName = this.resourceForm.form.get('lastName')?.value;
    this.resource.email = this.resourceForm.form.get('email')?.value;
    this.resource.phoneNumber = this.resourceForm.form.get('phoneNumber')?.value;
    this.resource.address = this.resourceForm.form.get('address')?.value;
    this.resource.maritalStatus = this.resourceForm.form.get('maritalStatus')?.value;
    this.resource.numberOfChildren = parseInt(this.resourceForm.form.get('numberOfChildren')?.value);
    this.resource.position = this.resourceForm.form.get('position')?.value;
    this.resource.role = this.resourceForm.form.get('role')?.value;
    this.resource.hireDate = this.resourceForm.form.get('hireDate')?.value;

    this.service.create(this.resource).subscribe((data) => {
      this.router.navigate(['/resources']);
    });
  }
}
