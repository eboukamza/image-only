import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ImageService {
  /** @return a link to cleaned image */
  public cleanImage(file: File, maxWidth = 3000, maxHeight = 3000): Promise<string> {
    if (!file || !file.type.match('image.*')) {
      return Promise.reject('File type is not an image');
    }

    const imageUrl = URL.createObjectURL(file);
    return this.createImageElement(imageUrl).then((image) => {
      const outputSize = this.calculateOutputSize(image.width, image.height, maxWidth, maxHeight);

      const canvas: HTMLCanvasElement = this.redrawImage(image, outputSize);
      return canvas.toDataURL(file.type);
    });
  }

  calculateOutputSize(width: number, height: number, maxWidth: number, maxHeight: number) {
    const scale = (value: number, ratio: number) => Math.floor(value * ratio);
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

  private redrawImage(
    image: HTMLImageElement,
    outputSize: { width: number; height: number }
  ): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.height = outputSize.height;
    canvas.width = outputSize.width;
    const context = canvas.getContext('2d')!;
    context.drawImage(image, 0, 0, outputSize.width, outputSize.height);
    this.drawCleanedWith(context);

    return canvas;
  }

  public rotate90(imageUrl: string, type: string) {
    return this.createImageElement(imageUrl).then((image: HTMLImageElement) => {
      const canvas = document.createElement('canvas');
      canvas.height = image.width;
      canvas.width = image.height;

      const context = canvas.getContext('2d')!;
      context.translate(canvas.width / 2, canvas.height / 2);
      context.rotate((90 * Math.PI) / 180); // 90 degrees.
      context.drawImage(image, -image.width / 2, -image.height / 2);
      this.drawCleanedWith(context);

      return canvas.toDataURL(type);
    });
  }

  private drawCleanedWith(context: CanvasRenderingContext2D) {
    let fontSize = Math.ceil(context.canvas.width * 0.03);
    if (fontSize > 50) {
      fontSize = 50;
    } else if (fontSize < 10) {
      fontSize = 10;
    }
    context.font = `${fontSize}px Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, Helvetica, sans-serif`;
    context.fillStyle = '#939393';
    context.fillText(
      'image-only.web.app',
      context.canvas.width * 0.02,
      context.canvas.height * 0.98
    );
  }

  private createImageElement(url: string): Promise<HTMLImageElement> {
    return new Promise((success) => {
      const image = new Image();
      image.addEventListener('load', () => success(image));
      image.src = url;
    });
  }
}
