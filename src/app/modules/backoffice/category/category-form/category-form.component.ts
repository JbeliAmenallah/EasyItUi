import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Category } from '../../../../shared/models/category';
import { CategoryService } from '../../../../core/http/category.service';
import { ProjectService } from '../../../../core/http/project.service';
import { InputTextModule } from 'primeng/inputtext';



@Component({
  selector: 'app-category-form', 
  templateUrl: './Category-form.component.html',
  styleUrls: ['./Category-form.component.css'] 
})
export class CategoryFormComponent implements OnInit {

  form: FormGroup;
  @Input() currentItemForm: Category;
    project: any;

    constructor(
      private formBuilder: FormBuilder,
      private service: CategoryService ,
      private projectService : ProjectService
  ) { }

  ngOnInit(): void {
    if (this.currentItemForm == undefined)
      this.form = this.createForm()
    else {
      this.form = this.updateForm();
    }
    
    this.loadProject();
}

loadProject() {
    this.projectService.list().subscribe(
      
    (data) => (this.project= data) )
    
}

  

  createForm() {
    console.log("create form");
    return this.formBuilder.group({
      categoryName: [ 
        null,
        Validators.compose([Validators.required]),
      ],
      duration: [ 
        null,
        Validators.compose([Validators.required]),
      ],
      startDate: [ 
        null,
        Validators.compose([Validators.required]),
      ],
      endDate: [ 
        null,
        Validators.compose([Validators.required]),
      ],
      projectId: [ 
        null,
        Validators.compose([Validators.required]),
      ]
    });
  }

  updateForm() {
    console.log("update form")
    return this.formBuilder.group({
      categoryName: [ 
        this.currentItemForm.categoryName,
        Validators.compose([Validators.required]),
      ],
      duration: [ 
        this.currentItemForm.duration,
        Validators.compose([Validators.required]),
      ],
      startDate: [ 
        this.currentItemForm.startDate,
        Validators.compose([Validators.required]),
      ],
      endDate: [ 
        this.currentItemForm.endDate,
        Validators.compose([Validators.required]),
      ],
      projectId: [ 
        this.currentItemForm.projectId,
        Validators.compose([Validators.required]),
      ]
    });
  }
}