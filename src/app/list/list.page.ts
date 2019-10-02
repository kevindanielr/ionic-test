import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { MenuController } from '@ionic/angular'; //para controlar el menu
import { HttpClient } from '@angular/common/http' //para peticiones HTTP
import { LoadingController } from '@ionic/angular' //para peticiones HTTP


//CORS bloquea peticiones HTTP, se configura en e htaccess


@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  films:any;
  usuarios: any;
  dui:any;
  loading:any;
  mensaje:string;

  constructor(private router:Router, public menu: MenuController, public http:HttpClient, public loadingController: LoadingController) {
    
  }

  ngOnInit() {
    //this.cargarDatos();
  }

  //Para que no se despliegue el menu
  ionViewWillEnter(){
    this.menu.enable(true);
  }

  async cargarDatos() {
    
    this.films = this.http.get('http://www.visitas.vip/visitas/index.php/api/Registro/'+this.dui);
    this.films.subscribe(data => {
   
        this.loading.dismiss();//al bobtener respuesta cerrar el loading
        if (data.status == "success") {
          console.log(data.data)
          this.usuarios = data.data;
          this.mensaje = "Se encontraron "+ data.total + " registros para "+ this.dui+".";
          // this.storage.set("usuario", data.data.usuario);
          // this.storage.set("idusuario", data.data.id_usuario);
          // this.storage.set("empresa", data.data.empresa);
          // this.storage.set("idempresa", data.data.id_empresa);
          // this.storage.set("nombre", data.data.nombre);
          
          // console.log(this.storage.get("usuario"));
          // console.log(this.storage.get("empresa"));
         //this.router.navigate(['/buscar'])
     
        }else{
        //  this.presentNoAlert();
        this.mensaje = "No se encontro el DUI.";
            console.log(data.data)
        }
     },err=>{
       this.loading.dismiss();
      //  this.presentAlertError();
      this.mensaje = "El error es: "+err.mensaje;
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
  
}
