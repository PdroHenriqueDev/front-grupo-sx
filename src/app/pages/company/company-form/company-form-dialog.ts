import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Company } from "src/app/models/company";
import { Validators, FormBuilder } from '@angular/forms';
import { CompanyService } from "src/app/core/services/company.service";

@Component({
  selector: 'company-form-dialog',
  templateUrl: './company-form-dialog.html',
  styleUrls: ['./company-form-dialog.scss']
})

export class ComapanyFormDialog implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Company,
    public dialogRef: MatDialogRef<ComapanyFormDialog>,
    private fb: FormBuilder,
    private companyService: CompanyService,
    ) {}

    companyForm = this.fb.group({
      cnpj: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(150)]],
      phone: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      address: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
    })

    save() {
      if (this.data && this.companyForm.valid) {
        const code = this.data.code!;
        const updatedData = {
          cnpj: Number(this.companyForm.get('cnpj')?.value!),
          name: this.companyForm.get('name')?.value!,
          email: this.companyForm.get('email')?.value!,
          phone: Number(this.companyForm.get('phone')?.value!),
          address: this.companyForm.get('address')?.value!,
        }
        this.companyService.updateCompany(code, updatedData).subscribe()
        this.dialogRef.close();
      }

      if (!this.data && this.companyForm.valid) {
        const savedData = {
          cnpj: Number(this.companyForm.get('cnpj')?.value!),
          name: this.companyForm.get('name')?.value!,
          email: this.companyForm.get('email')?.value!,
          phone: Number(this.companyForm.get('phone')?.value!),
          address: this.companyForm.get('address')?.value!,
        }
        this.companyService.saveCompany(savedData).subscribe();
        this.dialogRef.close();
      }

    }

    ngOnInit(): void {
      if(this.data) {
        this.companyService.getCompany(this.data.code).subscribe(res => {
          const [data] = res.data;
          this.companyForm.setValue(
            {
              cnpj: data.cnpj,
              name: data.name,
              email : data.email,
              phone: data.phone,
              address: data.address,
            }
          )
        });
      }
    }
}
