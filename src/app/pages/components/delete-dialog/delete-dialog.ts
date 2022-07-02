import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Company } from "src/app/models/company";

@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.html',
  styleUrls: ['./delete-dialog.scss']
})
export class DeleteDialog {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: Company,
    public dialogRef: MatDialogRef<DeleteDialog>,
    ) {}

}
