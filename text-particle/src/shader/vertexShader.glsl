attribute vec3 position;
attribute vec3 secondPosition;
attribute vec3 thirdPosition;
attribute vec3 fourthPosition;
attribute vec3 fifthPosition;
uniform float uSec1;
uniform float uSec2;
uniform float uSec3;
uniform float uSec4;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

void main() {
 vec3 toTorus = mix(position, secondPosition, uSec1);
 vec3 toTorusKnot = mix(toTorus, thirdPosition, uSec2);
 vec3 toCylinder = mix(toTorusKnot, fourthPosition, uSec3);
 vec3 finalPos = mix(toCylinder, fifthPosition, uSec4);

 gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPos, 1.0 );
 gl_PointSize = 3.0;
}

