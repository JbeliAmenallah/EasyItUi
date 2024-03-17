import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Functionality } from '../../../../shared/models/functionality';
import { FunctionalityService } from '../../../../core/http/functionality.service';
import { ProjectService } from '../../../../core/auth/project.service';
import { Project } from '../../../../shared/models/project';
@Component({
  selector: 'app-functionality-form',
  templateUrl: './functionality-form.component.html',
  styleUrls: ['./functionality-form.component.css']
})
export class FunctionalityFormComponent implements OnInit {

  form: FormGroup;
  @Input() currentItemForm: Functionality; // Utilisez l'interface Functionality ici
  selectedProjectId : number | null = null;
  projects : Project [] = [] ;
  projectOptions: any[];
complexityOptions = [
  'Easy',
  'Moderate',
  'Complex',
'Very complex',
];

  constructor(
    private formBuilder: FormBuilder,
    private functionalityService: FunctionalityService,
    private projectService : ProjectService
  ) { }

  ngOnInit(): void {
    if (this.currentItemForm === undefined) {
      this.form = this.createForm();
    } else {
      this.form = this.updateForm();
      this.selectedProjectId = this.currentItemForm.projectId; 

    }

    this.projectService.list().subscribe(
      (data : any [])=>{
        this.projects = data ;
        console.log(data)
        this.projectOptions = data.map(project => ({ label: project.projectName, value: project.id }));

      }
    )

  }

  createForm() {
    return this.formBuilder.group({
      functionalityName: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(255)]),
      ],
      descriptionFunctionality: [
        null,
        Validators.compose([Validators.required]),
      ],
      priority: [
        null,
        Validators.compose([Validators.required]),
      ],
      status: [
        null,
        Validators.compose([Validators.required]),
      ],
      complexityLevel :[
        null,
        Validators.compose([Validators.required]),
      ] , 
      projectId: [
        null,
        Validators.compose([Validators.required]),
      ],
    });
  }

  updateForm() {
    return this.formBuilder.group({
      functionalityName: [
        this.currentItemForm.functionalityName,
        Validators.compose([Validators.required, Validators.maxLength(255)]),
      ],
      descriptionFunctionality: [
        this.currentItemForm.descriptionFunctionality,
        Validators.compose([Validators.required]),
      ],
      priority: [
        this.currentItemForm.priority,
        Validators.compose([Validators.required]),
      ],
      status: [
        this.currentItemForm.status,
        Validators.compose([Validators.required]),
      ],
      complexityLevel :[
        null,
        Validators.compose([Validators.required]),
      ] , 
      projectId : [
        this.currentItemForm.projectId,
        Validators.compose([Validators.required])
      ]
    });
  }
}
