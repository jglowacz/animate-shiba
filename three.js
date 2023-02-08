import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function init() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xdddddd)
  const hlight = new THREE.AmbientLight(0x404040, 10)
  scene.add(hlight)

  const light2 = new THREE.HemisphereLight( 0xffffbb, 0x080820, 10);
  scene.add( light2 );

  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
  camera.rotation.y = 180 * Math.PI
  camera.position.x = 0
  camera.position.y = 110
  camera.position.z = 300

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.addEventListener('change', renderer)

  const loader = new GLTFLoader();

  function animate() {
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
  }

  loader.load('assets/scene.gltf', function (gltf) {
    let shiba = gltf.scene.children[0]
    shiba.scale.set(1.7, 1.7, 1.7)
    scene.add(gltf.scene);
    animate()

  }, undefined, function (error) {

    console.error(error);

  });
}

init()
