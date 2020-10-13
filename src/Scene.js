import * as THREE from "three";
import Menu from "./Menu";

// CONSTANTS
const distance = 15;

export default class Scene {
  constructor() {
    this.$container = document.getElementById("stage");

    this.W = window.innerWidth;
    this.H = window.innerHeight;

    this.setup();
    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener("resize", () => {
      this.onResize();
    });
  }

  // Setups

  setup() {

    // Set Three components
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x202533, 1, 100);

    this.setCamera();
    this.setLights();
    this.setRender();

    this.addObjects();
  }

  setRender() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: this.$container
    });

    this.renderer.setClearColor(0x202533);
    this.renderer.setSize(this.W, this.H);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.renderer.shadowMap.enabled = true;

    this.renderer.setAnimationLoop(() => {
      this.draw();
    });
  }

  setCamera() {
    const aspect = this.W / this.H;

    this.camera = new THREE.OrthographicCamera(
      -distance * aspect,
      distance * aspect,
      distance,
      -distance,
      -1,
      100
    );
    this.camera.position.set(-10, 10, 10);
    this.camera.lookAt(new THREE.Vector3());
  }

  setLights() {
    const ambientLight = new THREE.AmbientLight(0xcccccc);
    this.scene.add(ambientLight);

    const foreLight = new THREE.DirectionalLight(0xffffff, 0.5);
    foreLight.position.set(5, 5, 20);
    this.scene.add(foreLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 1);
    backLight.position.set(-5, -5, -10);
    this.scene.add(backLight);
  }

  // Actions
  addObjects() {
    this.menu = new Menu(this.scene);
  }

  // Loop
  draw() {
    this.renderer.render(this.scene, this.camera);
  }

  // Handlers
  onResize() {
    this.W = window.innerWidth;
    this.H = window.innerHeight;

    this.camera.aspect = this.W / this.H;

    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.W, this.H);
  }
}