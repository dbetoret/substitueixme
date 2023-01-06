import { Component, ViewChild } from '@angular/core';
import { ActionSheetController, IonModal, IonDatetime, ModalController, AlertController } from '@ionic/angular';
import { AbsenciesService } from '../absencies.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  // paràmetres de les pantalles modals
  @ViewChild(IonModal) modal: IonModal;
  canDismiss: boolean;
  isModalOpen: boolean;


  constructor(
    private data: AbsenciesService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {}
  
  showModal() {
    console.log('vull mostrar modal');
    this.canDismiss = true;
    this.isModalOpen = true;
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
        role: 'confirm',
        handler: data => {
          this.data.select_user(data);
        }
      }]
    })
    alert.present();
  }

}
