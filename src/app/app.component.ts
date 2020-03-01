import { Component } from '@angular/core';

import { Image } from './image.model';
import { ImageService } from './image.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.sass' ]
})
export class AppComponent {

  image: Image = new Image();

  constructor(private imageService: ImageService) {
  }

  loadImage($event) {
    const originalImage = $event.target.files[0];

    this.imageService.cleanImage(originalImage)
      .then(imageFile => this.imageService.convertToUrl(imageFile))
      .then(imageUrl => this.image = new Image(imageUrl))
      .catch(error => console.error(error))
      .then(() => {
        $event.target.value = ''; // reset input
      });
  }
}
