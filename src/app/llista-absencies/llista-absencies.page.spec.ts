import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LlistaAbsenciesPage } from './llista-absencies.page';

describe('LlistaAbsenciesPage', () => {
  let component: LlistaAbsenciesPage;
  let fixture: ComponentFixture<LlistaAbsenciesPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LlistaAbsenciesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LlistaAbsenciesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
