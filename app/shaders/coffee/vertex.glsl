varying vec2 vUv;
void main()
{
    vec4 modelPosotion = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosotion;
    vec4 projectionPosition =  projectionMatrix * viewPosition;
    gl_Position = projectionPosition;

    vUv = uv;
}