import { Component, inject } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

import { Image } from './image.model';
import { ImageService } from './image.service';
import { generateRandomName } from './utils';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.sass'],
    imports: [NgIf, NgFor],
    standalone: true
})
export class AppComponent {
  private imageService = inject(ImageService);

  images: Image[] = [];

  loadImage($event: Event) {
    const eventTarget = $event.target as HTMLInputElement;
    const files: FileList = eventTarget.files!;

    Promise.all(Array.from(files).map(this.cleanImage))
      .then((images: Image[]) => {
        // filter errors
        const newImages = images.filter(item => !!item);
        this.images.push(...newImages);
      })
      .then(() => eventTarget.value = '');
  }

  cleanImage = (file: File): Promise<Image> =>
    this.imageService.cleanImage(file)
      .then(imageUrl => {
        const randomName = generateRandomName(file.type);
        return new Image(imageUrl, file.type, randomName);
      })

  rotate(image: Image): void {
    this.imageService.rotate90(image.url, image.type)
      .then(imageUrl => image.url = imageUrl);
  }

  remove(index: number): void {
    this.images.splice(index, 1);
  }

  removeAll(): void {
    this.images = [];
  }

  imageName(_index: number, image: Image): string {
    return image.name;
  }
}
