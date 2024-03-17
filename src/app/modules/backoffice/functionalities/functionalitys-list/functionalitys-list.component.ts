import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Functionality } from '../../../../shared/models/functionality';
import { FunctionalityService } from '../../../../core/http/functionality.service';
import { ConfirmationService, MessageService  } from 'primeng/api';
import { Resource } from '../../../../shared/models/resource';
import { ResourceService } from '../../../../core/auth/Resource.service';
import { Project } from '../../../../shared/models/project';
import { ProjectService } from '../../../../core/http/project.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-functionalitys-list',
  templateUrl: './functionalitys-list.component.html',
  styleUrls: ['./functionalitys-list.component.css']
})
export class FunctionalitysListComponent implements OnInit {

  functionalities: Functionality[];
  resources: Resource[] = [];
  currentProject: Project = {} as Project;
  selectedResource: { id: number, firstName : string , lastName : string} | null = null;
  currentFunctionality: Functionality ;
  loading: boolean = false;
  visible: boolean = false;

  constructor(
    private serviceFunctionality: FunctionalityService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    public resourceService: ResourceService,
    public projectService : ProjectService

  ) { }

  ngOnInit(): void {
    this.getList();
  //   this.resourceService.list().subscribe(
  //     (data: any[]) => {
  //         this.resources = data;
  //     }
  // );
  }

  getList() {
    this.serviceFunctionality.list().subscribe(
      (items: Functionality[]) => {
        this.functionalities = items;
      }
    );
  }
  // showDialog(functionalityId: number) {
  //   this.visible = true;
  
  //   this.serviceFunctionality.read(functionalityId).subscribe((data: Functionality) => {
  //     this.currentFunctionality = data;
  
  //     // Assurez-vous que le service retourne un tableau de projets (Project[])
  //     this.projectService.read(this.currentFunctionality.projectId).subscribe((data: Project) => {
  //       this.currentProject = data;
  
  //       // Vérifiez si les ressources existent dans le projet avant de les assigner
  //       this.resources = this.currentProject.resources ? this.currentProject.resources : [];
  //       console.log('voici la liste des ressource de projet ' , this.currentProject.id , ' : ' ,this.resources)

  //     });
  //   });
  // }
  showDialog(functionalityId: number) {
    this.visible = true;
  
    this.serviceFunctionality.read(functionalityId).subscribe(
      (data: Functionality) => {
        this.currentFunctionality = data;
  
        // Assurez-vous que le service retourne un tableau de projets (Project[])
        this.projectService.read(this.currentFunctionality.projectId).subscribe(
          (data: Project) => {
            this.currentProject = data;
  
            // Vérifiez si les ressources existent dans le projet avant de les assigner
            this.resources = this.currentProject.resources ? this.currentProject.resources : [];
          },
          (error) => {
            console.error('Erreur lors de la récupération du projet:', error);
          }
        );
      },
      (error) => {
        console.error('Erreur lors de la récupération de la fonctionnalité:', error);
  
        // Si l'erreur est de type HttpErrorResponse, affichez le message directement
        if (error instanceof HttpErrorResponse) {
          console.error('Message d\'erreur:', error.error.text);
        }
      }
    );
  }
  
  
      
  

  editItem(item: Functionality) {
    console.log(item);
    this.router.navigate(['/functionalities/edit/' + item.id], {
      state: { data: item }
    });
  }

  deleteItem(id: number) {
    this.confirmationService.confirm({
        message: 'Êtes-vous sûr de vouloir supprimer cet élément?',
        header: 'Confirmation de suppression',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: "p-button-danger p-button-text",
        rejectButtonStyleClass: "p-button-text p-button-text",
        acceptIcon: "pi pi-check",
        rejectIcon: "pi pi-times",
        accept: () => {
            if (id !== undefined) {
                this.serviceFunctionality.delete(id).subscribe(
                    () => {
                        this.getList();
                        this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: 'Functionality supprimé avec succès' });
                    },
                    (error) => {
                        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la suppression' });
                    }
                );
            }
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Vous avez rejeté' });
        }
    });
}
assignResourceToFunctionality() {
  console.log(this.resources);

  if (this.selectedResource && this.selectedResource.id !== undefined && this.selectedResource.id !== null) {
    console.log("Selected resource ID:", this.selectedResource.id);
    console.log("Selected functionality ID:", this.currentFunctionality.id);

    this.serviceFunctionality.assignResourceToFunctionality(this.currentFunctionality.id, this.selectedResource.id).subscribe(
      () => {
        this.messageService.clear();
        this.messageService.add({
          key: "toastAddResource", severity: 'success', summary: 'Success',
          detail: this.selectedResource.firstName + " " + this.selectedResource.lastName + ' successfully added to functionality: ' + this.currentFunctionality.functionalityName
        });
        console.log(this.selectedResource.firstName + " " + this.selectedResource.lastName + " successfully added to functionality:", this.currentFunctionality.functionalityName);
      },
      (error) => {
        this.messageService.clear();
        this.messageService.add({
          key: "toastAddResource", severity: 'error', summary: 'Error',
          detail: "Resource already assigned to this functionality"
        });
      }
    );

  } else {
    this.messageService.add({
      key: "toastAddResource", severity: 'error', summary: 'Error',
      detail: "No resource selected"
    });
    // console.warn("No resource selected");
  }
}



}
