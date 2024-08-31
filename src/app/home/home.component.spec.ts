import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

document.querySelector('a[href="#inscribete"]').addEventListener('click', function(e) {
  e.preventDefault();
  document.querySelector('#inscribete').scrollIntoView({
      behavior: 'smooth'
  });
});

document.getElementById('inscribete').scrollIntoView({ behavior: 'smooth' });


