  varying vec2 vUv;
  uniform sampler2D uTexture1;
  uniform sampler2D uTexture2;
  uniform sampler2D uTexture3;
  void main() {
    vec2 uv = vUv;
    if (uv.x < 0.333) {
      gl_FragColor = texture2D(uTexture1, vec2(uv.x * 3.0, uv.y));
    } else if (uv.x < 0.666) {
      gl_FragColor = texture2D(uTexture2, vec2((uv.x - 0.333) * 3.0, uv.y));
    } else {
      gl_FragColor = texture2D(uTexture3, vec2((uv.x - 0.666) * 3.0, uv.y));
    }
  }
