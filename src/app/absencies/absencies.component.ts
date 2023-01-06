import { Component, OnInit } from '@angular/core';

import { Guardia } from '../guardia';
import { Absencia, AbsenciaS } from '../absencia';
import { DadesMestres } from '../dadesmestres';
import { AbsenciesService, Dates  } from '../absencies.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { formatDate } from '@angular/common';
import { LlistaAbsenciesPage } from '../llista-absencies/llista-absencies.page';
import { format, parseISO } from 'date-fns';
import { Guard, Absence } from '../model/interfaces';
//import { timeStamp } from 'console';

// class GuardiesDia {
//   data: string; 
//   dia_setmana: string;
//   ndia_setmana: number;
//   guardies: Guardia[];
//   parts: string[];

//   cds = ['Diumenge', 'Dilluns', 'Dimarts' ,'Dimecres' ,'Dijous' ,'Divendres', 'Dissabte', 'Diumenge']

//   constructor(d: string, gs: Guardia[]){
//     this.data=d; // en format dd-MM-yyyy
//     this.guardies = gs;
//     this.parts = d.split('-');
//     this.ndia_setmana=new Date(parseInt(this.parts[2]), parseInt(this.parts[1])-1, parseInt(this.parts[0])).getDay()
//     this.dia_setmana=this.cds[this.ndia_setmana];
//   }
// }

@Component({
  selector: 'app-absencies',
  templateUrl: './absencies.component.html',
  styleUrls: ['./absencies.component.scss'],
})
export class AbsenciesComponent implements OnInit {
  // absences: Absence[] = [];
  // absenciesS: AbsenciaS[] = [];
  // guards: Map<string, {
  //                   data: string,
  //                   dia_setmana: string,
  //                   guardies: Guard[]
  //               }> = new Map;
  // data;
  // data_fi;
  // hora_ini;
  // hora_fi;
  // dia_complet;
  // extraescolar;
  // justificada;

  //horari
  dates: Dates; // útil per a treballar amb dates.

  constructor(private data: AbsenciesService) {  
    // this.data.absences.get();
    // this.data.guards.get();
    // this.guards = this.data.guards.AbsenceGuards; 
    this.dates = new Dates();
    console.log("les guardies en abs.component son: ", this.data.guards.absenceGuards);
  }

  ngOnInit(): void {
  
  }

  // getAbsencies(): Absencia[]{
  //   this.data.getAbsencies()
  //   .subscribe(absencies => this.processaAbsencies(absencies));

  //   return this.absencies;
  // }




  // processaAbsencies(absencies){
  
  //   this.absenciesS = absencies;
  //   for (var i=0;i<this.absenciesS.length; i++){
  //     this.absencies.push ({
  //       id: this.absenciesS[i].id,
  //       data: this.str2date(this.absenciesS[i].data),
  //       data_fi: this.str2date(this.absenciesS[i].data_fi),
  //       hora_ini: this.str2time(this.absenciesS[i].hora_ini),
  //       hora_fi: this.str2time(this.absenciesS[i].hora_fi),
  //       dia_complet: this.absenciesS[i].dia_complet,
  //       extraescolar: this.absenciesS[i].extraescolar,
  //       justificada: this.absenciesS[i].justificada,
  //       guardies: this.absenciesS[i].guardies
  //     })    
  //   }
  //   // La diferència entre **absències** i **guàrdies** és que 
  //   // una **absència** és multi-dia, i volem editar-la en bloc.
  //   // D'un altra banda, **guardies** conté les guàrdies d'una data
  //   // donada, que està associada a una absència en concret.
  //   var data_g ;
  //   var d_guardies = {};
  //   console.log("carregant absencies. Hi han ", this.absencies.length);
  //   for (var i=0; i < this.absencies.length; i++){
  //     if (this.absencies[i].guardies.length > 0 )
  //       data_g =  this.absencies[i].guardies[0].data.toString();  // en format DD-MM-YYYY
  //     console.log ("carregant guardiesl del ", data_g, '. Hi han ', this.absencies[i].guardies.length);
  //     for (var j=0; j < this.absencies[i].guardies.length; j++){
  //       data_g =  this.absencies[i].guardies[j].data.toString();
  //       if (!(data_g in d_guardies))
  //         d_guardies[data_g] = []
  //       d_guardies[data_g].push(this.absencies[i].guardies[j])
  //     }
  //   }  
  //   for (var d in d_guardies){
  //     this.guardies.push({
  //       data:,
  //       dia:,
  //       hora:
  //       espai:
  //       grup:,
  //       materia:
  //       es_guardia:
  //       professor:,
  //       substitut:;
  //     }
        
  //       new Guard(d, d_guardies[d]))
  //     console.log("el dia ", d, " té " ,d_guardies[d].length, " guàrdies")
  //   } 
  // }

  // date2str(valor: Date = new Date()): string {
  //   console.log('vaig a convertir ', valor);
  //   return format(valor, 'dd-MM-yyyy');
  // }
  // str2date(valor: string): Date {
  //   var a = new Date();
  //   return a;
  // }
  // time2str(valor: Date = new Date()): string {
  //   return '';
  // }
  // str2time(valor: string): Date{
  //   var d = new Date();
  //   var parts = valor.split(':');
  //   d.setHours(parseInt(valor[0]));
  //   d.setMinutes(parseInt(valor[1]));
  //   return d;
  // }

}
