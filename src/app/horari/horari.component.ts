import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentFactoryResolver, Input, ReflectiveInjector } from '@angular/core'; 


@Component({
  selector: 'app-horari',
  templateUrl: './horari.component.html',
  styleUrls: ['./horari.component.scss'],
})
export class HorariComponent implements OnInit {

  currentComponent = null;

  @ViewChild('horariComponentContainer', { read: ViewContainerRef }) horariComponentContainer: ViewContainerRef;
  
  @Input() set componentData(data: {component: any, inputs: any}) {
    if (!data) {
      return;
    }
    let inputProviders = [];
    if (data.inputs) {
      inputProviders = Object.keys(data.inputs)
        .map((inputName) => {
          return {
            provide: inputName,
            useValue: data.inputs[inputName]
          }
        })
    }
  }
  //const resolvedInputs = ReflectiveInjector.resolve(inputProviders);

  //const injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.horariComponentContainer.parentInjector);

  //const factoy

  constructor() { }

  ngOnInit() {}

}
