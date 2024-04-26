import * as THREE from "three";
// minimum and maximum star sizes
const STAR_MIN = 0.25;
const STAR_MAX = 5.0;
const BLOOM_LAYER = 0;
const starTypes = {
  percentage: [76.45, 12.1, 7.6, 3.0, 0.6, 0.13],
  color: [0xffcc6f, 0xffd2a1, 0xfff4ea, 0xf8f7ff, 0xcad7ff, 0xaabfff],
  size: [0.7, 0.7, 1.15, 1.48, 2.0, 2.5, 3.5],
};
const texture = new THREE.TextureLoader().load(
  "src/assets/images/pseudo_star.png"
);
const materials = starTypes.color.map(
  (color) => new THREE.SpriteMaterial({ map: texture, color: color })
);

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

export class Star {
  position: any;
  starType: number;
  obj: any;
  constructor(position: any) {
    this.position = position;
    this.starType = this.generateStarType();
    this.obj = null;
  }

  generateStarType() {
    let num = Math.random() * 100.0;
    const pct = starTypes.percentage;
    for (let i = 0; i < pct.length; i++) {
      num -= pct[i];
      if (num < 0) {
        return i;
      }
    }
    return 0;
  }

  updateScale(camera: any) {
    const dist = this.position.distanceTo(camera.position) / 250;

    // update star size
    let starSize = dist * starTypes.size[this.starType];
    starSize = clamp(starSize, STAR_MIN, STAR_MAX);
    this.obj?.scale.copy(new THREE.Vector3(starSize, starSize, starSize));
  }

  toThreeObject(scene: any) {
    const sprite = new THREE.Sprite(materials[this.starType]);
    sprite.layers.set(BLOOM_LAYER);

    sprite.scale.multiplyScalar(starTypes.size[this.starType]);
    sprite.position.copy(this.position);

    this.obj = sprite;
    scene.add(sprite);
  }
}
