import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSocieteComponent } from './add-societe.component';

describe('AddSocieteComponent', () => {
  let component: AddSocieteComponent;
  let fixture: ComponentFixture<AddSocieteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSocieteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
