// Create the visualization and put it in our div.

const viz = new Spacekit.Simulation(document.getElementById('main-container'), {
  basePath: '../../src',
});

viz.createStars();

const hitParticles = new Array();
const nearMissParticles = new Array();
const missParticles = new Array();
const hitsCount = 1e3;
const nearMissCount = hitsCount * 10;
const missCount = 1e6;
fillParticles(hitsCount, 1, 1, hitParticles);
fillParticles(nearMissCount, 1.5, 2.5, nearMissParticles);
fillParticles(missCount, 2.5, 1000, missParticles);
const hitObjects = new Spacekit.StaticParticles("testp1", hitParticles, {defaultColor:'red', size:6}, viz);
const nearMissObjects = new Spacekit.StaticParticles("testp1", nearMissParticles, {defaultColor:'orange', size:6}, viz);
const missObjects = new Spacekit.StaticParticles("testp1", missParticles, {defaultColor:'green', size:6}, viz);
viz.addObject(hitObjects, true);
viz.addObject(nearMissObjects, true);
viz.addObject(missObjects, true);

viz.createSphere('earth', {
  textureUrl: './earth.jpg',
  debug: {
    showAxes: true,
  },
});

function fillParticles(count, minRange, maxRange, particles) {
  for(let i = 0; i < count; i++) {
    const newParticle = randomPosition(minRange, maxRange);
    particles.push(newParticle);
  }
}

function randomPosition(minRange, maxRange) {
  const delta = maxRange - minRange;
  let mag = 1;

  if (delta > 0) {
    mag = delta * Math.random() + minRange;
  }

  const ra = randomAngle(0, 2 * Math.PI);
  const dec = randomAngle(-Math.PI / 2, Math.PI / 2);
  const z = mag * Math.sin(dec);
  const x = mag * Math.cos(dec) * Math.cos(ra);
  const y = mag * Math.cos(dec) * Math.sin(ra);

  return [x, y, z]
}

function randomAngle(min, max) {
  const delta = max - min;
  return min + (Math.random() * delta);
}