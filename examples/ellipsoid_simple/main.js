// Create the visualization and put it in our div.
const viz = new Spacekit.Simulation(document.getElementById('main-container'), {
  basePath: '../../src',
  camera: {
    initialPosition: [0.5, 0.5, [0.5]]
  },
  startDate: Date.now(),
  startPaused: false
});

viz.createStars();

const geometry = { x: 0.1 , y: 0.05 , z: 0.025 };
viz.createEllipsoid('sample', {
  radii : geometry,
  color : 0x00ff00,
  wireframe: true,
  opacity: 0.5,
  levelsOfDetail: [{
    radii: 0,
    segments: 32
  }],
  debug: {
    showAxes: true,
  },
});
