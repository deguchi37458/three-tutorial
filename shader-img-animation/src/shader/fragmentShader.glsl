varying vec2 vUv;

uniform sampler2D uTexture1;
uniform sampler2D uTexture2;

void main() {
  vec2 uv = vUv;
  if (uv.y < 0.333) {
    gl_FragColor = texture2D(uTexture1, vec2(uv.x, uv.y * 3.0));
  } else if (uv.y < 0.666) {
    gl_FragColor = texture2D(uTexture2, vec2(uv.x, ((uv.y - 0.333 )* 3.0 )));
  } else {
    gl_FragColor = texture2D(uTexture2, vec2(uv.x, ((uv.y - 0.666 )* 3.0 )));
  }
}
