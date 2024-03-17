import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../../../shared/models/category';
import { CategoryService } from '../../../../core/http/category.service';
import { ConfirmationService, MessageService } from 'primeng/api';



@Component({
  selector: 'app-categories-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  categories: Category[];
  loading: boolean = false;
  

  constructor(
    private service: CategoryService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }
 

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    this.service.list().subscribe(
      (items: Category[]) => {
        this.categories = items.reverse();
      }
    );
  }

  editItem(item: Category): void {
    console.log(item);
    this.router.navigate(['/categories/edit/' + item.id], {
      state: { data: item },
    });
  }


  deleteItem(id: number) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete this item?',
        header: 'Delete Confirmation',
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

}
