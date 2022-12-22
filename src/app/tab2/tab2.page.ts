import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AbsenciesService } from '../absencies.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(
    private data: AbsenciesService,
    private alertCtrl: AlertController
  ) {}

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
