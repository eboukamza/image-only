import { ImageService } from './image.service';

describe('resize image', () => {

  let imageService: ImageService;

  beforeEach(() => {
    imageService = new ImageService();
  });

  it('should resize to be max width', () => {
    const maxWidth = 100;

    const size = imageService.calculateOutputSize(400, 200, maxWidth, 42);

    expect(size.width).toBe(100);
  });

  it('should resize to be max height', () => {
    const maxHeight = 200;

    const size = imageService.calculateOutputSize(300, 400, 400, maxHeight);

    expect(size.height).toBe(200);
  });

  it('should not resize if < MAX', () => {
    const maxWidth = 100;
    const maxHeight = 100;

    const size = imageService.calculateOutputSize(50, 60, maxWidth, maxHeight);

    expect(size.width).toBe(50);
    expect(size.height).toBe(60);
  });

  it('should not resize if < MAX', () => {
    const maxWidth = 100;
    const maxHeight = 100;

    const size = imageService.calculateOutputSize(60, 50, maxWidth, maxHeight);

    expect(size.width).toBe(60);
    expect(size.height).toBe(50);
  });

  it('should maintain ratio in landscape', () => {
    const maxWidth = 250;
    const maxHeight = 200;

    const size = imageService.calculateOutputSize(500, 400, maxWidth, maxHeight);

    expect(size.width).toBe(250);
    expect(size.height).toBe(200);
  });

  it('should maintain ratio in portrait', () => {
    const maxWidth = 250;
    const maxHeight = 200;

    const size = imageService.calculateOutputSize(300, 400, maxWidth, maxHeight);

    expect(size.width).toBe(150);
    expect(size.height).toBe(200);
  });
});
