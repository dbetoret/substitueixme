import { Component, ViewChild } from '@angular/core';
import { ActionSheetController, IonModal, IonDatetime, ModalController, AlertController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { format, parseISO } from 'date-fns';
import { materialize } from 'rxjs/operators';

import { AbsenciesService } from '../absencies.service';
import { Horari } from '../dadesmestres';
import { HorariPage } from '../configuracio/horari/horari.page';
import { th } from 'date-fns/locale';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
// import { cachedDataVersionTag } from 'v8';

interface sessio {
  grup_id: number;
  espai_id: number;
  materia_id: number;
  id_horari:  Horari;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  

  private canDismiss: boolean = true;
  
  // variables de modal horari mh
  private mhIsOpen: boolean = false;
  mhDia: string;
  mhHora: string;
  mhMateria: string;
  mhGrup: string;
  mhEspai: string;
  mhIsGuardia: boolean = false;

  // variables de modal grup mg
  mgIsOpen: boolean = false;

  // variables de modal espais me
  meIsOpen: boolean = false;

  // variables de modal matèries mm
  mmIsOpen: boolean = false;

  // horari: { [hora: string]: {[dia: string]: string}}= {};
  private horari: {
      [key: string]: string
  };


  constructor(
    private actionSheetController: ActionSheetController,
    private aS: AbsenciesService,
    public alertCtrl: AlertController
  ) {
    var text: string;
    var h: string;
    var d: string;
    var idh: string;
    this.horari = {};
    //this.horari.fields = {};
    if (! this.aS.userLogged()){
      // Anar a la Tab 1 a loguejar.
    }
    //this.aS.t3_horari = this.horari;
  }



  refresca_horari (){

  }

  async menuConfiguracio(){
    const actionSheet =  await this.actionSheetController.create({
      header: 'Configuració',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Edita Horari',
        icon: 'edit',
        id: 'horari-button',
        data: {
          type: 'edit'
        },
        handler: () => {
          this.mhIsOpen = true;
          //console.log('Edit clicked');
        }
      },{
        text: 'Edita Grups',
        icon: 'edit',
        data: 'Data value',
        handler: () => {
          this.mgIsOpen = true;
          //console.log('Play clicked');
        }
      },{
        text: 'Edita Espais',
        icon: 'edit',
        data: 'Data value',
        handler: () => {
          this.meIsOpen = true;
          //console.log('Play clicked');
        }
      },{
        text: 'Edita Matèries',
        icon: 'edit',
        data: 'Data value',
        handler: () => {
          this.mmIsOpen = true;
          //console.log('Play clicked');
        }
      }]
    });
    await actionSheet.present();

    const {role, data} = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);  
    //this.openModal(data);
  }

  openModal(data: any){
    this.mhIsOpen = true;
  }

  acceptModal(data: any){
    this.mhIsOpen = false;
    var idh = this.aS.llista_horesdies.get(this.mhHora.trim()).get(this.mhDia.trim()).toString();
    //console.log("els valors de inserció son: ",this.mhHora, ' <', this.mhDia.trim(),'> ' ,this.aS.llista_horesdies.get(this.mhHora).get(this.mhDia.trim())); 
    // this.mhDia,' ',this.mhHora,' ',this.mhEspai,' ',this.mhGrup,' ',
    // this.mhMateria,' ', this.mhIsGuardia);
    if (!(this.aS.horari.has(idh))){
      if (this.mhIsGuardia) {
        this.mhEspai = '';
        this.mhGrup = '';
        this.mhMateria = '';
      } 
      this.aS.horari.set(idh, {
        id_franja: parseInt(idh), 
        dia_setmana: this.mhDia,
        hora: this.mhHora,
        espai_id: parseInt(this.mhEspai),
        grup_id: parseInt(this.mhGrup),
        materia_id: parseInt(this.mhMateria),
        es_guardia: this.mhIsGuardia
      });
      this.aS.t3_horari.set(idh,  this.aS.carrega_text(idh));
    } else {
      this.aS.horari.get(idh).espai_id = parseInt(this.mhEspai);
      this.aS.horari.get(idh).grup_id = parseInt(this.mhGrup);
      this.aS.horari.get(idh).materia_id = parseInt(this.mhMateria);
      this.aS.horari.get(idh).es_guardia = this.mhIsGuardia;
      this.aS.t3_horari.set(idh, this.aS.carrega_text(idh));
    }
    this.aS.actualitza_horari(idh);
    console.log("actualitzat a: ", this.aS.horari.get(idh)); 
  }

  onWillDismiss(event, modal: string) {
    this.mgIsOpen = false;
    this.meIsOpen = false;
    this.mmIsOpen = false;
    // actualitzem els valors a la base de dades.
    if (modal === 'grup'){
      this.aS.actualitza('grup');
    }
    if (modal === 'espai'){
      this.aS.actualitza('espai');
    }
    if (modal === 'matèria'){
      this.aS.actualitza('matèria');
    }
  }

  get_llista_dies(){
    console.log('llista de dies: ',JSON.stringify(this.aS.llista_dies));
    return this.aS.llista_dies;
  }

  mhCanviaGuardia(){
    if (this.mhIsGuardia) {
      this.mhGrup = null;
      this.mhEspai = null;
      this.mhMateria = null;
    }
  }

  mhOnChangeHoraDia(){
    console.log("canvia dia i hora", this.mhDia, this.mhHora);
    console.log (this.mhGrup);
    if (this.mhDia != null && this.mhHora != null){
      this.mhIsGuardia = false;
      this.mhEspai = null;
      this.mhGrup = null;
      this.mhMateria = null;  
      let idh = this.aS.llista_horesdies.get(this.mhHora.trim()).get(this.mhDia.trim()).toString();
      if (this.aS.horari.has(idh)) {
        this.mhIsGuardia = this.aS.horari.get(idh).es_guardia;
        if (! this.aS.horari.get(idh).es_guardia){
          this.mhEspai = this.aS.horari.get(idh).espai_id.toString();
          this.mhGrup = this.aS.horari.get(idh).grup_id.toString();
          this.mhMateria = this.aS.horari.get(idh).materia_id.toString();
        }
      }
    }
  }

  mgCanviaGrup(grup, i){
    this.mCreaModificaNom('Modifica','grup', grup, i);
  }

  meCanviaEspai(espai, i){

  }

  async mCreaModificaNom(accio: string, tipus: string, nom: any, index: number){
    var nnom: any = nom;
    let i = index;
    console.log (" i i index: ", i, ' ', index);
    if (index === -1){
      if (tipus === 'grup') {  i =  -1*this.aS.grups.size; }
      if (tipus === 'espai') { i =  -1*this.aS.espais.size; }
      if (tipus === 'matèria') { i =  -1*this.aS.materies.size; }
      // console.log("el nou index és: ", i, ' de la llista ', this.aS.grups);
    }
    const alert = await this.alertCtrl.create({
      header: accio+' '+tipus,
      inputs: [{
        label: tipus+': ',
        value: nom
      }],
      buttons: [{
        text: 'Cancel·lar',
        role: 'cancel'
      }, {
        text: accio,
        handler: data => {
          if (data[0].length > 0) {nnom = data[0];}
          if (tipus === 'grup') { this.aS.grups.set(i.toString(), nnom); }
          if (tipus === 'espai') { this.aS.espais.set(i.toString(), nnom); }
          if (tipus === 'matèria') { this.aS.materies.set(i.toString(), nnom); }
        }
      }]
    });
    alert.present();
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
        role: 'accept',
        handler: data => {
          this.aS.select_user(data);
        }
      }]
    })
    alert.present();
  }


}
