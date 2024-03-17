import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Project } from '../../../../shared/models/project';
import { Resource } from '../../../../shared/models/resource';
import { ProjectService } from '../../../../core/auth/project.service';
import { ResourceService } from '../../../../core/auth/Resource.service';
import { ConfirmationService, MessageService , MenuItem  } from 'primeng/api';

@Component({
    selector: 'app-projects-list',
    templateUrl: './projects-list.component.html',
    styleUrls: ['./projects-list.component.css'] ,
})
export class ProjectsListComponent implements OnInit {
    projects: Project[];
    resources: Resource[] = [];
    currentResource : Resource ;
    selectedResource: { id: number, firstName : string , lastName : string} | null = null;
    currentProject: Project ;
    loading: boolean = false;
    visible: boolean = false;
    items: MenuItem[] | undefined;


    constructor(
        private service: ProjectService,
        private router: Router,
        public projectService: ProjectService,
        public resourceService: ResourceService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
    ) { }

    ngOnInit(): void {
        this.getList();

        this.resourceService.list().subscribe(
            (data: any[]) => {
                this.resources = data;
            }
        );
        
    }

    getList() {
        this.service.list().subscribe(
            (items: Project[]) => {
                this.projects = items;
            }
        );
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
                    this.service.delete(id).subscribe(
                        () => {
                            this.getList();
                            this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: 'Projet supprimé avec succès' });
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
    
 
   showDialog( projectId : number) {
        this.visible = true;
        this.projectService.read(projectId).subscribe( (data: Project)=>
        this.currentProject  = data 
        )
    }
    addResourceToProject() {
        console.log(this.resources)
        if (this.selectedResource.id) {
            console.log("ID de la ressource sélectionnée :", this.selectedResource.id);
            console.log("ID de la projet sélectionnée :", this.currentProject.id);
            

            this.projectService.addResource(this.currentProject.id, this.selectedResource.id).subscribe(
                () => {
                    this.resourceService.read(this.selectedResource.id).subscribe(
                        (data)=>{
                            this.currentResource = data ;
                        }
                    )
                    console.log(this.currentResource)
                    this.messageService.clear();
                    this.messageService.add({
                        key:"toastAddResource"  ,severity: 'success', summary: 'Success', detail: this.selectedResource.firstName + " " +  this.selectedResource.lastName+' ajoutée avec succès au projet : '+ this.currentProject.projectName
                    })
                    console.log( this.selectedResource.firstName + " " +  this.selectedResource.lastName+" ajoutée avec succès au projet :", this.currentProject.projectName);
                },
                (error) => {
                    this.messageService.clear();
                    this.messageService.add({
                        key:"toastAddResource"  ,severity: 'error', summary: 'Error', detail: "Ressource déjà assignée à ce projet "
                    })
                }
            );

        } else {
            console.warn("Aucune ressource sélectionnée");
        }
    }


    editItem(item: Project) {
        console.log(item);
        this.router.navigate(['/projects/edit/' + item.id], {
            state: { data: item },
        });
    }

    confirm2Yes() {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
        this.confirmationService.close();
    }

    confirm2No() {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
        this.confirmationService.close();
    }
 
    confirm(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Please confirm to proceed moving forward.',
            icon: 'pi pi-exclamation-circle',
            acceptIcon: 'pi pi-check mr-1',
            rejectIcon: 'pi pi-times mr-1',
            rejectButtonStyleClass: 'p-button-danger p-button-sm',
            acceptButtonStyleClass: 'p-button-outlined p-button-sm',
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
              this.addResourceToProject();
              this.visible = false;

            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
            }
        });
    }
}
