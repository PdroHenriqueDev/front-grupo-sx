import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollaboratorRoutingModule } from './collaborator-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CollaboratorComponent } from './collaborator.component';
import { CollaboratorFormDialog } from './collaborator-form/collaborator-form-dialog';

@NgModule({
  declarations: [
    CollaboratorComponent,
    CollaboratorFormDialog
  ],
  imports: [
    CommonModule,
    CollaboratorRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
  ]
})
export class CollaboratorModule { }
