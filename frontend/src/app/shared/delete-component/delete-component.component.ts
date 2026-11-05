import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-component',
  templateUrl: './delete-component.component.html',
  styleUrls: ['./delete-component.component.scss']
})
export class DeleteComponentComponent implements OnInit {
  confirmation: boolean = true
  constructor(public dialogRef: MatDialogRef<DeleteComponentComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string,
      description: string
    }) { }

  ngOnInit(): void {
  }

}
