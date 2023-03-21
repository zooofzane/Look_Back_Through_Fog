in vec3 position;
uniform mat4 modelMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
// precision mediump float;
uniform vec3 cameraPos;
out vec3 vOrigin;
out vec3 vDirection;
void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vOrigin = vec3(inverse(modelMatrix) * vec4(cameraPos, 1.0)).xyz;
    vDirection = position - vOrigin;
    gl_Position = projectionMatrix * mvPosition;

    // vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    // vec4 viewPosition = viewMatrix * modelPosition;
    // vec4 projectedPosition = projectionMatrix * viewPosition;


    // gl_Position = projectedPosition;
}

// in vec3 position;
// uniform mat4 modelMatrix;
// uniform mat4 modelViewMatrix;
// uniform mat4 projectionMatrix;
// uniform vec3 cameraPos;
// out vec3 vOrigin;
// out vec3 vDirection;
// void main() {
//     vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
//     vOrigin = vec3(inverse(modelMatrix) * vec4(cameraPos, 1.0)).xyz;
//     vDirection = position - vOrigin;
//     gl_Position = projectionMatrix * mvPosition;
// }