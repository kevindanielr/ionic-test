import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular'; //para controlar el menu
import { FormGroup, Validators, FormBuilder } from '@angular/forms'; //para validar los controles
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  myForm: FormGroup;
  password:string;
  mensaje: string;

  constructor(public menu: MenuController, private formBuilder: FormBuilder, private router:Router ) { 
    this.myForm = this.formBuilder.group({
    usuario: ['', Validators.required],
    password: ['', Validators.compose([Validators.maxLength(9), Validators.pattern('[0-9]*'), Validators.required])]
  });
  }
  
  ngOnInit() {
  }

  //Para que no se despliegue el menu
  ionViewWillEnter(){
    this.menu.enable(false);
  }

  //validar
  validar(){
    if (this.myForm.value.usuario == "admin" && this.myForm.value.password=="123456") {
      this.router.navigate(['/home']);
    } else {
      this.mensaje="Usuario/Contraseña invalidos";
    }
  }



}
