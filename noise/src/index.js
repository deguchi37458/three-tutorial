const canvas = document.getElementById('noiseBg')

if(canvas) {
  const ctx = canvas.getContext('2d');

  // Canvasのサイズを取得
  const width = canvas.width;
  const height = canvas.height;

  // ImageDataオブジェクトを作成
  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;

  function generateNoise() {
    for (let i = 0; i < data.length; i += 4) {
        const isWhite = Math.random() > 0.5;

        const r = isWhite ? 255 : 204;
        const g = isWhite ? 255 : 204;
        const b = isWhite ? 255 : 204;

        data[i] = r;
        data[i + 1] = g;
        data[i + 2] = b;
        data[i + 3] = 100;
    }

    ctx.putImageData(imageData, 0, 0);
    requestAnimationFrame(generateNoise);
  }

  generateNoise();
}
