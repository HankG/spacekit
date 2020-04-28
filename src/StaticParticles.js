import * as THREE from 'three';

import {
  STAR_SHADER_VERTEX,
  STAR_SHADER_FRAGMENT,
} from './shaders';

const DEFAULT_PARTICLE_SIZE = 4;

export class StaticParticles {
  constructor(id, points, options, contextOrSimulation) {
    this._options = options;

    this._id = id;

    // TODO(ian): Add to ctx
    if (true) {
      // User passed in Simulation
      this._simulation = contextOrSimulation;
      this._context = contextOrSimulation.getContext();
    } else {
      // User just passed in options
      this._simulation = null;
      this._context = contextOrSimulation;
    }

    // Number of particles in the scene.
    this._particleCount = points.length;

    this._points = points;
    this._geometry = undefined;

    this.init();
  }

  init() {
    const positions = new Float32Array(this._points.length * 3);
    const colors = new Float32Array(this._points.length * 3);
    const sizes = new Float32Array(this._points.length);
    let color = new THREE.Color(0xffffff);

    if (this._options.defaultColor) {
      color = new THREE.Color(this._options.defaultColor);
    }

    let size = DEFAULT_PARTICLE_SIZE;

    if(this._options.size) {
      size = this._options.size;
    }


    for (let i = 0, l = this._points.length; i < l; i++) {
      const vertex = this._points[i];
      positions.set(vertex, i * 3);
      color.toArray(colors, i * 3);
      sizes[i] = size;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.addAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {},
      vertexColors: THREE.VertexColors,
      vertexShader: STAR_SHADER_VERTEX,
      fragmentShader: STAR_SHADER_FRAGMENT,
      alphaTest: 0.2,
      transparent: true,
   });

    this._geometry = new THREE.Points(geometry, material);
  }

  /**
   * A list of THREE.js objects that are used to compose the skybox.
   * @return {THREE.Object} Skybox mesh
   */
  get3jsObjects() {
    return [this._geometry];
  }

  /**
   * Get the unique ID of this object.
   * @return {String} id
   */
  getId() {
    return this._id;
  }
}

StaticParticles.instanceCount = 0;
