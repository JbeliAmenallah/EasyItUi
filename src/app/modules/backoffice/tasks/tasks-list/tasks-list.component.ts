import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../../../../shared/models/task';
import { TaskService } from '../../../../core/http/task.service';
import { ConfirmationService, MessageService  } from 'primeng/api';


@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

  tasks: Task[];
  loading: boolean = false;

  constructor(
    private service: TaskService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  )
{ }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.service.list().subscribe(
      (items: Task[]) => {
        this.tasks = items;
      }
    );
  }

  editItem(item: Task) {
    console.log(item);
    this.router.navigate(['/tasks/edit/' + item.id], {
      state: { data: item }
    });
  }

  // deleteItem(item: Task) {
  //   if (confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) {
  //     const id = item.id as number; // Assertion de type pour garantir que l'id est de type number
  //     if (id !== undefined) {
  //       this.service.delete(id).subscribe(() => {
  //         this.getList();
  //       });
  //     }
  //   }
  // }
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
                        this.messageService.add({ severity: 'success', summary: 'Confirmation', detail: 'Task supprimé avec succès' });
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

  moveToDetails(taskId: number) {
    this.router.navigate(['/tasks/details/' + taskId]);
  }
}
