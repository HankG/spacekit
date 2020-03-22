// Create the visualization and put it in our div.
const viz = new Spacekit.Simulation(document.getElementById('main-container'), {
  basePath: '../../src',
});

viz.createStars();

const refRadius = 282.37;
const geometry = { x: 282.37 / refRadius , y: 268.05 / refRadius , z: 249.25 / refRadius };
viz.createEllipsoid('sample', {
  textureUrl: 'bennu_global_mosaic_reduced_size.png',
  radii : geometry,
  debug: {
    showAxes: true,
  },
});
