import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Collaborator } from 'src/app/models/collaborator';
import { DeleteDialog } from '../components/delete-dialog/delete-dialog';
import { CollaboratorService } from './../../core/services/collaborator.service';
import { CollaboratorFormDialog } from './collaborator-form/collaborator-form-dialog';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {
  collaborators: Collaborator[] = [];
  displayedColumns: string[] = ['code', 'cpf', 'name', 'email', 'phone', 'address', 'actions'];
  dataSource!: MatTableDataSource<Collaborator>;

  constructor(
    private collaboratorService: CollaboratorService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getCollaborators();
  }

  getCollaborators() {
    this.collaboratorService.getCollaborator().subscribe((res) => this.collaborators = res.data);
  }

  form(data?: Collaborator) {
    this.dialog.open(CollaboratorFormDialog, { data });
    this.dialog.afterAllClosed.subscribe(() => this.getCollaborators());
  }

  openDeleteDialog(data: Collaborator) {
    const dialogRef = this.dialog.open(DeleteDialog, { data });
    dialogRef.afterClosed().subscribe((response) => {
      if(response) {
        const { code } = data;
        this.collaboratorService.deleteCollaborator(code!).subscribe(() => this.getCollaborators());
      }
    })
  }

}
