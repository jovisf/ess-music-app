import { Component, OnInit, inject, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css']
})
export class UpdatepopupComponent implements OnInit {

  constructor(private builder: FormBuilder, private service: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService,
    private dialog: MatDialogRef<UpdatepopupComponent>) {

  }

  editdata: any;
  ngOnInit(): void {
    this.service.GetAllRole().subscribe(res => {
      this.rolelist = res;
    })
    if (this.data.usercode != null && this.data.usercode != '') {
      this.service.GetbyCode(this.data.usercode).subscribe(res => {
        this.editdata = res;
        this.registerform.setValue({
          id: this.editdata.id, name: this.editdata.name, email: this.editdata.email,
          password: this.editdata.password, role: this.editdata.role,
          isactive: this.editdata.isactive
        })
      })
    }
  }
  rolelist: any;

  registerform = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    role: this.builder.control('', Validators.required),
    isactive: this.builder.control(false)
  });

  updateuser() {
    if (this.registerform.valid) {
      this.service.Updateuser(this.registerform.value.id, this.registerform.value).subscribe(res => {
        this.toastr.success('Informação alterada com sucesso!');
        this.dialog.close();
      })
    } else {
      this.toastr.warning('Por favor, selecione um cargo!')
    }
  }
}
