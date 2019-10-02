import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http'; 
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { MenuController } from '@ionic/angular'; //para controlar el menu


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  myForm: any;
  films: any;
  loading: any;

  constructor(public menu:MenuController, private formBuilder: FormBuilder,public http: HttpClient, public loadingController: LoadingController) { 
   

    //this.presentLoading2();
    this.myForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      ndocumento: ['', Validators.compose([Validators.maxLength(9), Validators.pattern('[0-9]*'), Validators.required])],
      fecha: ['', Validators.required],
      // idempleado: ['', Validators.required],
      // idinstitucion: ['', Validators.required]
      
    });

  }

  ngOnInit() {
  }

  async cargarDatos() {
    // console.log(this.storage.get("usuario"));
     //console.log(this.storage.get("empresa"));
     //console.log(this.myForm.value);
     var parametros = {
                       //id_usuario:this.storage.get("idusuario"),
                       id_usuario:1,
                       id_empleado:4,
                       id_empresa:1,
                       //id_empresa:this.storage.get("idempresa"),
                       f_correlativo:this.myForm.get("fecha").value,
                       fecha:this.myForm.get("fecha").value,
                       nombre:this.myForm.get("nombre").value,
                       id_institucion:1,
                       n_documento: this.myForm.get("ndocumento").value,
                       ingreso:1,
                       f_ingreso:this.myForm.get("fecha").value,
                       area:""
                     };
       let httpHeaders = new HttpHeaders({
                'Content-Type' : 'application/json'
                 });  
 
       let options = {
         headers: httpHeaders
         };               
 
     
     this.films = this.http.post('http://www.visitas.vip/visitas/index.php/api/Registro', parametros,options);
     this.films.subscribe(data => {
       
         this.loading.dismiss();
        if (data.status=="success") {
         //this.presentNoAlert();
         
         }else{
           //this.presentAlertError();
         }
      },err=>{
        this.loading.dismiss();
        //this.presentAlertError();
        console.log("El error es :"+err.message);
      });
    }


    //funcion loading
   async presentLoading() {

    this.loading = await this.loadingController.create({
      message: 'Cargando datos'
    });
    await this.loading.present();
    this.cargarDatos();
    const { role, data } = await this.loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  ionViewWillEnter(){
    this.menu.enable(true);
  }

}
