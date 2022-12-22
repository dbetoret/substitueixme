import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-modal-editabsencia',
  templateUrl: './modal-editabsencia.component.html',
  styleUrls: ['./modal-editabsencia.component.scss'],
})
export class ModalEditabsenciaComponent {
  @Input() nom_i: string;
  @Input() data_i: string;

  nom: string;
  data_f: Date;
  dia_complet: boolean;
  hora_i: Date;
  hora_f: Date;
  

  constructor( private modalCtrl: ModalController) { 
    //this.nom = 'inicial';
    //nom = 'inicial';
  }


  modal_cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  modal_confirm() {
    return this.modalCtrl.dismiss(this.nom, 'confirm')
  }
  modal_load(role: string, data: string) {
  
  }
    ngAfterComponentInit(){
      this.nom = this.nom_i;

  }
  print_nom(event: any, value: any) {
    console.log('el nom canviant és: ', value);
  }

}
