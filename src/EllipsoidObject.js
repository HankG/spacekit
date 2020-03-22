import * as THREE from 'three';

import { RotatingObject } from './RotatingObject';
import { rescaleNumber } from './Scale';
import {
  SPHERE_SHADER_VERTEX,
  SPHERE_SHADER_FRAGMENT,
} from './shaders';

/**
 * Simulates an Ellipsoid object for use for non-spherical space objects or error ellipsoids
 */
export class EllipsoidObject extends RotatingObject {
  /**
   * @param {String} options.textureUrl Path to basic texture (optional)
   * @param {String} options.bumpMapUrl Path to bump map (optional)
   * @param {String} options.specularMapUrl Path to specular map (optional)
   * @param {Number} options.color Hex color of the sphere
   * @param {Boolean} options.wireframe Should the shape be drawn as a wireframe (default false)
   * @param {Boolean} options.opacity the level of transparency of the shape, defaults to 1 (totally opaque)
   * @param {Number} options.axialTilt Axial tilt in degrees
   * @param {Object} options.radii {x, y, z} Three dimensions of the ellipsoid
   * @param {Object} options.levelsOfDetail List of {threshold: x, segments:
   * y}, where `threshold` is radii distance and `segments` is the number
   * number of sphere faces to render.
   * @param {Object} options.debug Debug options
   * @param {boolean} options.debug.showAxes Show axes
   * @see EllipsoidObject
   * @see RotatingObject
   */
  constructor(id, options, contextOrSimulation) {
    super(id, options, contextOrSimulation, false /* autoInit */);

    this.init();
  }

  init() {
    let map;
    if (this._options.textureUrl) {
      map = new THREE.TextureLoader().load(this._options.textureUrl);
    }

    const detailedObj = new THREE.LOD();
    const levelsOfDetail = this._options.levelsOfDetail || [
      { radii: 0, segments: 64 },
    ];
    const refRadius = this.getScaledRadius();

    for (let i = 0; i < levelsOfDetail.length; i += 1) {
      const level = levelsOfDetail[i];
      const sphereGeometry = new THREE.SphereGeometry(
        refRadius,
        level.segments,
        level.segments,
      );

      const scale = this.getFlatteningScale();
      sphereGeometry.scale(scale[0], scale[1], scale[2]);
      const color = this._options.color || 0xbbbbbb;

      const transparent = this._options.opacity !== undefined;
      const opacity = this._options.opacity || 1.0;
      const wireframe = this._options.wireframe || false;
      let material;
      if (this._simulation.isUsingLightSources()) {
        const uniforms = {
          sphereTexture: { value: null },
          lightPos: { value: new THREE.Vector3() },
        };
        // TODO(ian): Handle if no map
        uniforms.sphereTexture.value = map;
        uniforms.lightPos.value.copy(this._simulation.getLightPosition());
        material = new THREE.ShaderMaterial({
          uniforms,
          vertexShader: SPHERE_SHADER_VERTEX,
          fragmentShader: SPHERE_SHADER_FRAGMENT,
          transparent: transparent,
          opacity: opacity
        });
      } else {
        material = new THREE.MeshBasicMaterial({
          map,
          color,
          transparent: transparent,
          opacity: opacity,
          wireframe: wireframe
        });
      }

      const mesh = new THREE.Mesh(sphereGeometry, material);
      mesh.receiveShadow = true;
      mesh.castShadow = true;

      // Change the coordinate system to have Z-axis pointed up.
      mesh.rotation.x = Math.PI / 2;

      // Show this number of segments at distance >= radii * level.radii.
      detailedObj.addLevel(mesh, refRadius * level.radii);
    }

    // Add to the parent base object.
    this._obj.add(detailedObj);

    if (this._options.axialTilt) {
      this._obj.rotation.y += rad(this._options.axialTilt);
    }

    this._renderMethod = 'SPHERE';

    if (this._simulation) {
      // Add it all to visualization.
      this._simulation.addObject(this, false /* noUpdate */);
    }

    super.init();
  }

  /**
   * @private
   */
  getFlatteningScale() {
    const radii = this._options.radii;
    return [1.0, radii.y/radii.x, radii.z/radii.x];
  }

  /**
   * @private
   */
  getScaledRadius() {
    return rescaleNumber(this._options.radii.x || 1);
  }

  /**
   * Update the location of this object at a given time. Note that this is
   * computed on CPU.
   */
  update(jd) {
    const newpos = this.getPosition(jd);
    this._obj.position.set(newpos[0], newpos[1], newpos[2]);
    super.update(jd);
  }
}
