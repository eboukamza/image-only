// ex: image-only-3dz8.jpeg
const generateRandomName = (type) =>
  'image-only_' + Math.random().toString(36).substring(8) + type.replace('image/', '.');

export { generateRandomName };

