import { Component } from '@angular/core';

import { Image } from './image.model';
import { ImageService } from './image.service';
import { generateRandomName } from './utils';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: [ 'app.component.sass' ]
})
export class AppComponent {

  image: Image;

  constructor(private imageService: ImageService) {
  }

  loadImage($event) {
    const originalImage = $event.target.files[0];
    const randomName = generateRandomName(originalImage.type);

    this.imageService.cleanImage(originalImage)
      .then(imageUrl => this.image = new Image(imageUrl, originalImage.type, randomName))
      .catch(error => console.error(error))
      // finally reset input
      .then(() => $event.target.value = '');
  }

  rotate() {
    this.imageService.rotate90(this.image.url, this.image.type)
      .then(imageUrl => this.image.url = imageUrl)
  }

}
