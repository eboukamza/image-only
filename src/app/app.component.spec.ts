import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { ImageService } from './image.service';
import { Image } from './image.model';

const createImage = () => new Image('test-url', 'test-type', 'test-name');

describe('AppComponent tests', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      providers: [ ImageService ]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should show images', () => {
    component.images = [ createImage(), createImage(), createImage() ];
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.card')).toHaveLength(3);

  });

});
