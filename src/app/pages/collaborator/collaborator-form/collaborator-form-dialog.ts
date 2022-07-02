import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Company } from "src/app/models/company";
import { Validators, FormBuilder } from '@angular/forms';
import { CollaboratorService } from "src/app/core/services/collaborator.service";
import { CompanyService } from "src/app/core/services/company.service";

@Component({
  selector: 'collaborator-form-dialog',
  templateUrl: './collaborator-form-dialog.html',
  styleUrls: ['./collaborator-form-dialog.scss']
})

export class CollaboratorFormDialog implements OnInit {
  companies: Company[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Company,
    public dialogRef: MatDialogRef<CollaboratorFormDialog>,
    private fb: FormBuilder,
    private collaboratorService: CollaboratorService,
    private companyService: CompanyService
    ) {}

    collaboratorForm = this.fb.group({
      cpf: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(150)]],
      phone: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      address: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
      company: ['', Validators.required],
    });

    ngOnInit(): void {
      this.getCompanies();
      if(this.data) {
        this.collaboratorService.getCollaborator(this.data.code).subscribe(res => {
          const [data] = res.data;
          this.collaboratorForm.setValue(
            {
              cpf: data.cpf,
              name: data.name,
              email : data.email,
              phone: data.phone,
              address: data.address,
              company: data.company_code.code,
            }
          )
        });
      }
    }

    getCompanies() {
      this.companyService.getCompany().subscribe((res) => this.companies = res.data);
    }

    save() {
      if (this.data && this.collaboratorForm.valid) {
        const code = this.data.code!;
        const updatedData = {
          cpf: Number(this.collaboratorForm.get('cpf')?.value!),
          name: this.collaboratorForm.get('name')?.value!,
          email: this.collaboratorForm.get('email')?.value!,
          phone: Number(this.collaboratorForm.get('phone')?.value!),
          address: this.collaboratorForm.get('address')?.value!,
          company_code: Number(this.collaboratorForm.get('company')?.value!)
        }
        this.collaboratorService.updateCollaborator(code, updatedData).subscribe()
        this.dialogRef.close();
      }

      if (!this.data && this.collaboratorForm.valid) {
        const savedData = {
          cpf: Number(this.collaboratorForm.get('cpf')?.value!),
          name: this.collaboratorForm.get('name')?.value!,
          email: this.collaboratorForm.get('email')?.value!,
          phone: Number(this.collaboratorForm.get('phone')?.value!),
          address: this.collaboratorForm.get('address')?.value!,
          company_code: Number(this.collaboratorForm.get('company')?.value!)
        }
        this.collaboratorService.saveCollaborator(savedData).subscribe();
        this.dialogRef.close();
      }

    }
}
