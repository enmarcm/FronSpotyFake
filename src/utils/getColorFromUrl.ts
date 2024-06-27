async function getDominantColorHex(imageUrl: string): Promise<string> {
  try {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageUrl;

    await new Promise((resolve) => {
      img.onload = resolve;
      img.onerror = resolve;
    });

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 1;
    canvas.height = 1;

    if (!context) return '';
    context.drawImage(img, 0, 0, 1, 1);

    const imageData = context.getImageData(0, 0, 1, 1).data;
    const rgb = { r: imageData[0], g: imageData[1], b: imageData[2] };

    const color = rgbToHex(rgb.r, rgb.g, rgb.b);

    if (!color) return '';

    return color;
  } catch (error) {
    console.error('Error al obtener el color dominante:', error);
    return '';
  }
}

function rgbToHex(r: any, g: any, b: any) {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

function componentToHex(c: any) {
  const hex = c.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}

export default getDominantColorHex;
