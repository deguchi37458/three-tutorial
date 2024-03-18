  varying vec2 vUv;
  uniform sampler2D uTexture1;
  uniform sampler2D uTexture2;
  uniform sampler2D uTexture3;
  uniform sampler2D uTexture4;
  uniform sampler2D uTexture5;
  uniform sampler2D uTexture6;
  uniform sampler2D uTexture7;
  uniform sampler2D uTexture8;
  uniform sampler2D uTexture9;
  uniform sampler2D uTexture10;
  void main() {
    vec2 uv = vUv;
    if (uv.x < 0.1) {
      gl_FragColor = texture2D(uTexture1, vec2(uv.x * 10.0, uv.y));
    } else if (uv.x < 0.2) {
      gl_FragColor = texture2D(uTexture2, vec2((uv.x - 0.1) * 10.0, uv.y));
    } else if (uv.x < 0.3) {
      gl_FragColor = texture2D(uTexture2, vec2((uv.x - 0.2) * 10.0, uv.y));
    } else if (uv.x < 0.4) {
      gl_FragColor = texture2D(uTexture2, vec2((uv.x - 0.3) * 10.0, uv.y));
    } else if (uv.x < 0.5) {
      gl_FragColor = texture2D(uTexture2, vec2((uv.x - 0.4) * 10.0, uv.y));
    } else if (uv.x < 0.6) {
      gl_FragColor = texture2D(uTexture2, vec2((uv.x - 0.5) * 10.0, uv.y));
    } else if (uv.x < 0.7) {
      gl_FragColor = texture2D(uTexture2, vec2((uv.x - 0.6) * 10.0, uv.y));
    } else if (uv.x < 0.8) {
      gl_FragColor = texture2D(uTexture2, vec2((uv.x - 0.7) * 10.0, uv.y));
    } else if (uv.x < 0.9) {
      gl_FragColor = texture2D(uTexture2, vec2((uv.x - 0.8) * 10.0, uv.y));
    } else {
      gl_FragColor = texture2D(uTexture3, vec2((uv.x - 0.9) * 10.0, uv.y));
    }
  }
