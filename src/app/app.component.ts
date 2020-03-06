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

  images: Image[] = [];

  constructor(private imageService: ImageService) {
  }

  loadImage($event) {

    const files: FileList = $event.target.files;

    Promise.all(Array.from(files).map(this.cleanImage))
      .then(images => {
        // filter errors
        const newImages = images.filter(item => !!item);
        this.images.push(...newImages);
      })
      .then(() => $event.target.value = '');
  }

  cleanImage = (file): Promise<Image> =>
    this.imageService.cleanImage(file)
      .then(imageUrl => {
        const randomName = generateRandomName(file.type);
        return new Image(imageUrl, file.type, randomName);
      })
      .catch(error => console.error(error));

  rotate(image) {
    this.imageService.rotate90(image.url, image.type)
      .then(imageUrl => image.url = imageUrl)
  }

  remove(index) {
    this.images.splice(index, 1);
  }

}
