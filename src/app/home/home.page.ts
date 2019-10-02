import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular'; //para controlar el menu

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public menu: MenuController) {}

  
  ionViewWillEnter(){
    this.menu.enable(true);
  }
}


