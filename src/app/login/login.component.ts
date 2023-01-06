import { Component, OnInit, Input } from '@angular/core';
import { ActionSheetController, IonModal, IonDatetime, ModalController, AlertController } from '@ionic/angular';
import { AbsenciesService } from '../absencies.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  @Input() canDismiss: boolean;
  @Input() isModalOpen: boolean;
  
isLoginModalOpen = false;
isRememberModalOpen = false;
isCreateModalOpen = false;
isTaskModalOpen = false;

usuari: string;
contrasenya: string;


  constructor(  
    private actionSheetController: ActionSheetController, 
    private absenciesService: AbsenciesService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) { }


  ngOnInit() {}

// ###############################
// Funcions del Login
// ###############################

showLogin(){
  this.canDismiss = true;
  this.isRememberModalOpen = false;
  this.isCreateModalOpen = false;
  this.isLoginModalOpen = true;
}

showRecordar(){
  this.canDismiss = true;
  this.isLoginModalOpen = false;
  this.isCreateModalOpen = false;
  this.isRememberModalOpen = true;
}

showCrear(){
  this.canDismiss = true;
  this.isLoginModalOpen = false;
  this.isRememberModalOpen = false;
  this.isCreateModalOpen = true;
  //console.log("vull mostrar crear");
}

recordaContrasenya(){

}

createUser(){
  this.absenciesService.user.create(this.usuari, this.contrasenya, this.doLogin);
  this.isLoginModalOpen = false;
}

doLogin(){
  this.absenciesService.user.login(this.usuari, this.contrasenya, this.emptyFn);
  if ( this.absenciesService.user.logged_in() ) {
    this.canDismiss = true;
    this.isLoginModalOpen = false;  
  }
}

emptyFn(){

}

}
