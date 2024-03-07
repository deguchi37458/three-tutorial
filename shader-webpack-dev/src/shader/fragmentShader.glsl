precision mediump float;

varying float vRandom;

void main() {
    gl_FragColor = vec4(1.0, vRandom, 0.5, 0.5);
}
