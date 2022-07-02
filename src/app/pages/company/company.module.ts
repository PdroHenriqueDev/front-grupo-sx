import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ComapanyFormDialog } from './company-form/company-form-dialog';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CompanyRoutingModule } from './company-routing.module';

@NgModule({
  declarations: [
    CompanyComponent,
    ComapanyFormDialog
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
  ]
})
export class CompanyModule { }
