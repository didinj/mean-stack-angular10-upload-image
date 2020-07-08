import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryDetailsComponent } from './gallery-details.component';

describe('GalleryDetailsComponent', () => {
  let component: GalleryDetailsComponent;
  let fixture: ComponentFixture<GalleryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
