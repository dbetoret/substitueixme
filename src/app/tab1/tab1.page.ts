import { Component, ViewChild } from '@angular/core';
import { ActionSheetController, IonModal, IonDatetime, ModalController, AlertController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
//import { timeStamp } from 'console';
import { format, parseISO } from 'date-fns';

import { Absencia, AbsenciaS } from '../absencia';
import { AbsenciesService, Dates } from '../absencies.service';
import { Absence, AbsenceJSON } from '../model/interfaces'


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  // variables de Tab1
  absencies: Absencia[] = [];
  absenciesS: AbsenciaS[];
  absencia_actual_id: number;
  absencia: Absencia;
  absenciaS: AbsenciaS;
  date: Dates = new Dates();

  // variables de interfície modal
  @ViewChild(IonModal) modal: IonModal;
  canDismiss = true;
  isModalOpen = false;
  isLoginModalOpen = false;
  modalType: string = 'login';
  isTaskModalOpen = false;

  // variables de dades de modal
  usuari: string;
  contrasenya: string;


  abs_index: number;
  nom: string; // useless
  absencia_id: number;
  startDate = '';
  endDate = '';
  data_inici: string;
  data_fi: string;
  hora_inici: string;
  hora_fi: string;
  es_dia_complet: boolean = true;

  // altres variables
  message = 'Hola';
  name: string;

  constructor(
    private actionSheetController: ActionSheetController, 
    private AS: AbsenciesService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {
    if (this.AS.user.is_logged_in == -1){
      this.isLoginModalOpen = true;
      this.canDismiss = false;
    }
  }

  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();
    /**
     * Date will be enabled if it is not
     * Sunday or Saturday
     */
    return utcDay !== 0 && utcDay !== 6;
  };


processaAbsencies(absencies): void {
  this.absenciesS = absencies;
  console.log('processem les ', this.absenciesS.length, ' absenciesS');
  for (var i=0;i<this.absenciesS.length; i++){
    this.absencies.push ({
      id: this.absenciesS[i].id,
      data: this.str2date(this.absenciesS[i].data),
      data_fi: this.str2date(this.absenciesS[i].data_fi),
      hora_ini: this.str2time(this.absenciesS[i].hora_ini),
      hora_fi: this.str2time(this.absenciesS[i].hora_fi),
      dia_complet: this.absenciesS[i].dia_complet,
      extraescolar: this.absenciesS[i].extraescolar,
      justificada: this.absenciesS[i].justificada,
      guardies: this.absenciesS[i].guardies
    })    
  }
}


substitueixme(): void {
  var absencia_nova: AbsenceJSON = {
    id: -1,
    data: this.date.date2str(),
    data_fi:  this.date.date2str(),
    dia_complet: true,
    hora_ini: this.date.time2str(),
    hora_fi: '23:59',
    extraescolar: false,
    justificada: false,
  }
  console.log("al tancar modal, amb id: ", absencia_nova.id);
  this.AS.absences.insert(absencia_nova);
}

// ###############################
// Funcions del Login
// ###############################

showLogin(){
  this.canDismiss = true;
  this.isLoginModalOpen = true;
  this.modalType = 'login';
}

showRecordar(){
  this.canDismiss = true;
  this.isLoginModalOpen = true;
  this.modalType = 'remember';
}

showCrear(){
  this.canDismiss = true;
  this.isLoginModalOpen = true;
  this.modalType = 'create';
}

recordaContrasenya(){

}

createUser(){
  this.AS.user.create(this.usuari, this.contrasenya, this.callbackLogin.bind(this));
  this.isLoginModalOpen = false;
}

doLogin(){
  this.AS.user.login(this.usuari, this.contrasenya, this.callbackLogin.bind(this));
}

doLogout(){
  this.AS.user.logout(this.callbackLogout.bind(this));
}

callbackLogin(success: boolean){
  // funció de callback per a les accions necessàries quan es
  // confirme o rebutge la petició de login.
  this.canDismiss = success;
  this.isLoginModalOpen = !(true);
  //this.modalCtrl.dismiss();
  this.AS.loadDadesMestres();
  this.AS.absences.get();
  this.AS.guards.get()
}

callbackLogout(success: boolean){
  this.callbackLogin(!success);
}



// ###############################
// Funcions del menú d'absències
// ###############################
  async llistaAbsencies() {
    var l_buttons: any[] = [];
    var a: Absence;
    console.log('longitud del menu absencies: ', this.AS.absences.list);
    for (var i =0; i < this.AS.absences.list.length; i++) {
      a = this.AS.absences.list[i];
      //a = this.absencies[i];
      l_buttons.push( {
        text: this.date2str(a.data),
        role: 'edit',
        icon: 'edit',
        data: i,
        handler: () => {
        }
      } )
    }
    l_buttons.push( 
      {
        text: 'Nova',
        role: 'new',
        icon: 'add',
        data: -1,
        handler: () => {
          console.log('Crear absència');
        }
      },{
        text: 'Cancel',
        role: 'cancel',
        icon: 'close',
        handler: () => {
          console.log('Cancel·la menú absència');
        }
      }
    )

    const actionSheet =  await this.actionSheetController.create({
      header: 'Gestionar les absències',
      cssClass: 'my-custom-class',
      buttons: l_buttons ,
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
    this.openModal(data)
  // Obrim el modal d'edició de absències amb el resultat del actionSheet.

  }



// ###############################
// Funcions del modal d'edició d'absències
// ###############################

  async openModal(absindex: number) {
    this.abs_index = absindex;
    var ASA = this.AS.absences.list;
    console.log('asa es: ',ASA, ' i vaig a carregar el index ', absindex);
    if (absindex >= 0) {
      this.absencia_id = ASA[absindex].id;
      this.data_inici = this.AS.absences.dates.date2str(ASA[absindex].data);
      this.data_fi = this.AS.absences.dates.date2str(ASA[absindex].data_fi);
      this.es_dia_complet = ASA[absindex].dia_complet;
      this.hora_inici = this.AS.absences.dates.time2str(ASA[absindex].hora_ini);
      this.hora_fi = this.AS.absences.dates.time2str(ASA[absindex].hora_fi);
      console.log("al abrir modal, id: ",this.absencia_id);
      this.isModalOpen = true;
    }
    if (absindex == -1) {
      this.absencia_id = -1;
      this.data_inici = this.AS.absences.dates.date2str();
      this.data_fi = this.AS.absences.dates.date2str();
      this.es_dia_complet = true;
      this.hora_inici = this.AS.absences.dates.time2str();
      this.hora_fi = '23:59';
      this.isModalOpen = true;
    }
  }


  modal_cancel() {
    this.modal.dismiss(null, 'cancel');
    this.isModalOpen=false;
  }

  modal_confirm() {
    this.modal.dismiss(this.name, 'confirm');
    // en confirmar el canvi, enviar la nova absència al servidor.
    var absencia_modif: AbsenceJSON = {
      id: this.absencia_id,
      data: this.data_inici,
      data_fi:  this.data_fi,
      dia_complet: this.es_dia_complet,
      hora_ini: this.hora_inici,
      hora_fi: this.hora_fi,
      extraescolar: false,
      justificada: false,
    }
    console.log("al tancar modal, amb id: ", absencia_modif.id);
    this.AS.absences.update(absencia_modif);
    // si no dóna error, actualitzar també a la variable local.
    // this.absencies[this.abs_index] = this.absencia;
    this.isModalOpen=false;
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = 'Hello, ${ev.detail.data}';
    }
  }

  onLogin(event: Event) {

  }

  print_nom(event: any, data: any){
    console.log('el valor de nom és: ', this.nom);
  }

  date2str(valor: Date = null): string {
    console.log('vaig a convertir ', valor);
    //return format(valor, 'dd-MM-yyyy');
    if (valor == null){
      valor = new Date();
    }
    return format(valor, 'yyyy-MM-dd');
    console.log('vaig a convertir ', valor);
    return valor.toString();
  }
  str2date(valor: string): Date {
    return parseISO(valor);
  }
  time2str(valor: Date = new Date()): string {
    return '';
  }
  str2time(valor: string): Date{
    return new Date();
  }
  str2str(valor: string): string {
    var a = new Date();
    a = parseISO(valor);
    //return '';
    return this.date2str(a);
  }

  async changeUser(){
    const alert = await this.alertCtrl.create({
      header: "Selecciona l'usuari",
      inputs: [{
        label: 'David',
        type: 'radio',
        value: 'david',
      },
      {
        label: 'Alex',
        type: 'radio',
        value: 'alex'
      }
      ],
      buttons: [{
        text: 'Cancel·lar',
        role: 'cancel'
      },
      {
        text: 'Selecciona',
        role: 'OK',
        handler: data => {
          this.AS.select_user(data);
        }
      }]
    })
    alert.present();
  }

}

