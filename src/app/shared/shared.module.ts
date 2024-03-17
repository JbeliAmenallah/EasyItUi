import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CalendarModule } from 'primeng/calendar'
import { MessagesModule } from 'primeng/messages'
import { DropdownModule } from 'primeng/dropdown'
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TreeSelectModule } from 'primeng/treeselect';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    TableModule,
    MessagesModule,
    DropdownModule,
    ToastModule,
    ConfirmPopupModule,
    DialogModule,
    CardModule,
    KeyFilterModule,
    InputNumberModule,
    RadioButtonModule,
    TreeSelectModule,
    TooltipModule,
    InputTextModule

  ]
})
export class SharedModule {}
