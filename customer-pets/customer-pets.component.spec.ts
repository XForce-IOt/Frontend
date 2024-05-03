import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPetsComponent } from './customer-pets.component';

describe('CustomerPetsComponent', () => {
  let component: CustomerPetsComponent;
  let fixture: ComponentFixture<CustomerPetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerPetsComponent]
    });
    fixture = TestBed.createComponent(CustomerPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
