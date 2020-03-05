import { Injectable } from '@angular/core';

@Injectable()
export class ImageService {

  public convertToUrl(file): Promise<string> {
    return new Promise((success, fail) => {
      if (!file) {
        fail('No image');
        return;
      }

      const reader = new FileReader();
      reader.addEventListener('load', () => success(reader.result as string), false);
      reader.onerror = fail;

      reader.readAsDataURL(file);
    });
  }

  /** @return File a new File with the image cleaned */
  public cleanImage(file, maxWidth = 3000, maxHeight = 3000): Promise<File> {
    if (!file || !file.type.match('image.*')) {
      return Promise.reject('File type is not an image');
    }

    return this.getImage(file)
      .then(image => {
        const outputSize = this.calculateOutputSize(image.width, image.height, maxWidth, maxHeight);

        const canvas: HTMLCanvasElement = this.redrawImage(image, outputSize);
        return new Promise(success => canvas.toBlob(success, file.type));
      })
      .then((blob: Blob) => new File([ blob ], file.name, { type: file.type }));
  }

  private getImage(blob): Promise<HTMLImageElement> {
    return new Promise(success => {
      const image = new Image();
      image.addEventListener('load', () => success(image));
      image.src = URL.createObjectURL(blob);
    });
  }

  private redrawImage(image, outputSize): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.height = outputSize.height;
    canvas.width = outputSize.width;
    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0, outputSize.width, outputSize.height);

    return canvas;
  }

  public rotate90(imageUrl, type) {
    return new Promise(success => {
        const image = new Image();
        image.addEventListener('load', () => success(image));
        image.src = imageUrl;
      }
    ).then((image: HTMLImageElement) => {
        const canvas = document.createElement('canvas');
        canvas.height = image.width;
        canvas.width = image.height;

        const context = canvas.getContext('2d');
        context.translate(canvas.width / 2, canvas.height / 2);
        context.rotate(90 * Math.PI / 180); // 90 degrees.
        context.drawImage(image, -image.width / 2, -image.height / 2);

        return canvas.toDataURL(type);
      }
    );
  }

  calculateOutputSize(width, height, maxWidth, maxHeight) {
    const scale = (value, ratio) => Math.floor(value * ratio);
    let newWidth;
    let newHeight;
    if (width > height) {
      newWidth = Math.min(maxWidth, width);
      const ratio = newWidth / width;
      newHeight = scale(height, ratio);
    } else {
      newHeight = Math.min(maxHeight, height);
      const ratio = newHeight / height;
      newWidth = scale(width, ratio);
    }
    return { width: newWidth, height: newHeight };
  }


}
