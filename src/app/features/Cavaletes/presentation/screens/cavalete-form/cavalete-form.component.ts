import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICavaleteEntity } from '../../../domain/entities/cavalete.entity';

@Component({
  selector: 'cad-rec-app-cavalete-form',
  templateUrl: './cavalete-form.component.html',
  styleUrls: ['./cavalete-form.component.scss']
})
export class CavaleteFormComponent {

  cavalete: ICavaleteEntity;

  cavalete_validation_messages = {
    'tipocavalete': [
      { type: 'required', message: 'Tipo de cavalete é obrigatório!' },
      { type: 'maxlength', message: 'Tipo de cavalete não pode ultrapassar 30 caracteres!' }
    ]
  }

  cavaleteForm!: FormGroup;
  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<CavaleteFormComponent>, @Inject(MAT_DIALOG_DATA) public data: ICavaleteEntity) {
    this.cavalete = data;
    this.createForm();
  }

  createForm() {
    this.cavaleteForm = this.fb.group({
      tipocavalete: new FormControl(this.cavalete.tipocavalete, Validators.compose([
        Validators.maxLength(30),
        Validators.required
      ])),
      id: [this.cavalete.id],
    })
  }

  save() {
    this.dialogRef.close(this.cavaleteForm.value);
    console.log(this.cavaleteForm.value);
  }

  close() {
    this.dialogRef.close();
  }

}
