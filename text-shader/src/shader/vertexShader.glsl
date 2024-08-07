uniform float uFrequency;
uniform float uTime;

void main() {
  vec3 p = vec3(position.x, position.y, position.z);

  // Oscillate vertices up/down
  p.y += (sin(p.x * uFrequency + uTime) * 0.5 ) * 10;

  // Oscillate vertices inside/outside
  p.z += (sin(p.x * uFrequency + uTime) * 0.5 ) * 10;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
