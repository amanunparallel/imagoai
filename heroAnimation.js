// PIXI JS Config FIle

const { Application, Geometry, Mesh, Texture, Shader } = PIXI;
const assets = {
  texture:
    "https://cdn.jsdelivr.net/gh/amanunparallel/imagoai/imagoheroBanner.png",
};
const canvas = document.getElementById("mycanvas");

const app = new Application({
  view: canvas,
  width: window.innerWidth,
  height: window.innerHeight,
});

const geometry = new Geometry();
geometry.addAttribute(
  "aVertexPosition",
  [-100, -100, 100, -100, 100, 100, -100, 100],
  2
);
geometry
  .addAttribute("aUvs", [0, 0, 1, 0, 1, 1, 0, 1], 2)
  .addIndex([0, 1, 2, 0, 2, 3]);

const vertexSrc = `

    precision mediump float;

    attribute vec2 aVertexPosition;
    attribute vec2 aUvs;

    uniform mat3 translationMatrix;
    uniform mat3 projectionMatrix;

    varying vec2 vUvs;

    void main() {

        vUvs = aUvs;
        gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);

    }`;

const fragmentSrc = `

    precision mediump float;

    varying vec2 vUvs;

    uniform sampler2D uSampler2;
    uniform float time;

    void main() {

        gl_FragColor = texture2D(uSampler2, vUvs + sin( (time + (vUvs.x) * 14.) ) * 0.1 );
    }`;

const uniforms = {
  uSampler2: Texture.from(assets.texture),
  time: 0,
};

const shader = Shader.from(vertexSrc, fragmentSrc, uniforms);

const quad = new Mesh(geometry, shader);

quad.position.set(
  document.documentElement.clientWidth / 2,
  window.innerHeight / 2
);
quad.scale.set(10);

app.stage.addChild(quad);

app.ticker.add((delta) => {
  quad.shader.uniforms.time += 0.01;
});
