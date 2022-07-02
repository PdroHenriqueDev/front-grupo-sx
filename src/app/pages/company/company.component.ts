import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/core/services/company.service';
import { MatDialog } from '@angular/material/dialog';
import { ComapanyFormDialog } from './company-form/company-form-dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteDialog } from '../components/delete-dialog/delete-dialog';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  companies: Company[] = [];
  displayedColumns: string[] = ['code', 'cnpj', 'name', 'email', 'phone', 'address', 'actions'];
  dataSource!: MatTableDataSource<Company>;

  constructor(
    private companyService: CompanyService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies() {
    this.companyService.getCompany().subscribe(res => {this.companies = res.data; console.log(res)});
  }

  form(data?: Company) {
    this.dialog.open(ComapanyFormDialog, { data });
    this.dialog.afterAllClosed.subscribe(() => this.getCompanies())
  }

  openDeleteDialog(data: Company) {
    const dialogRef = this.dialog.open(DeleteDialog, { data });
    dialogRef.afterClosed().subscribe((response) => {
      if(response) {
        const { code } = data;
        this.companyService.deleteCompany(code!).subscribe(() => this.getCompanies());
      }
    })
  }

}
