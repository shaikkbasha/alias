import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtLopaComponent } from './art-lopa.component';


describe('LopaComponent', () => {
  let component: ArtLopaComponent;
  let fixture: ComponentFixture<ArtLopaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArtLopaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtLopaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
