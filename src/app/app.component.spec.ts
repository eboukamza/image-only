import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { Image } from './image.model';

const createImage = () => new Image('test-url', 'test-type', 'test-name');

describe('AppComponent tests', () => {

  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should show images', () => {
    app.images = [ createImage(), createImage(), createImage() ];
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.card')).toHaveLength(3);

  });

});
