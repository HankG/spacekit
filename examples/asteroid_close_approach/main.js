// Create the visualization and put it in our div.
const viz = new Spacekit.Simulation(document.getElementById('main-container'), {
  basePath: '../../src',
  //startDate: new Date('2019-10-31T14:45:00.000Z'),
  startDate: new Date('2019-10-31'),
  jdPerSecond: 0.01,
  startPaused: true,
  unitsPerAu: 100,
  camera: {
    enableDrift: false,
  },
  debug: {
    // showAxesHelper: true,
    showStats: false,
  }
});

// Create a skybox using NASA TYCHO artwork.
viz.createSkybox(Spacekit.SkyboxPresets.NASA_TYCHO);

// Create our first object - the sun - using a preset space object.
viz.createObject('Sun', Spacekit.SpaceObjectPresets.SUN);
viz.createAmbientLight();
viz.createLight([0, 0, 0]);

viz.createObject('Mercury', Object.assign(Spacekit.SpaceObjectPresets.MERCURY, {
      labelText: 'Mercury',
}));
viz.createObject('Venus', Object.assign(Spacekit.SpaceObjectPresets.VENUS, {
      labelText: 'Venus',
}));
const earth = viz.createObject('Earth', Object.assign(Spacekit.SpaceObjectPresets.EARTH, {
      labelText: 'Earth',
}));
const earthRadius = Spacekit.kmToAu(6378.0);
const earthSphere = viz.createSphere('earth', {
  textureUrl: './earth.jpg',
  radius: earthRadius,
  ephem: Spacekit.EphemPresets.EARTH,
  atmosphere: {
    enable: false
  }
});

const moon = viz.createObject('moon', Object.assign(Spacekit.SpaceObjectPresets.MOON, {
  labelText: 'Moon',
}));
moon.orbitAround(earth);

viz.createObject('Mars', Object.assign(Spacekit.SpaceObjectPresets.MARS, {
      labelText: 'Mars',
}));
viz.createObject('Jupiter', Object.assign(Spacekit.SpaceObjectPresets.JUPITER, {
      labelText: 'Jupiter',
}));
viz.createObject('Saturn', Object.assign(Spacekit.SpaceObjectPresets.SATURN, {
      labelText: 'Saturn',
}));
viz.createObject('Uranus', Object.assign(Spacekit.SpaceObjectPresets.URANUS, {
      labelText: 'Uranus',
}));
viz.createObject('Neptune', Object.assign(Spacekit.SpaceObjectPresets.NEPTUNE, {
      labelText: 'Neptune',
}));
viz.createObject('Pluto', Object.assign(Spacekit.SpaceObjectPresets.PLUTO, {
      labelText: 'Pluto',
}));



// Set up viewport
viz.getViewer().followObject(earthSphere, [0, 0, 0]);


// Set up event listeners

document.getElementById('btn-forward').onclick = function() {
  viz.setJdPerSecond(Math.abs(viz.getJdPerSecond()));
  viz.start();
};

document.getElementById('btn-backward').onclick = function() {
  viz.setJdPerSecond(-Math.abs(viz.getJdPerSecond()));
  viz.start();
};

document.getElementById('btn-stop').onclick = function() {
  viz.stop();
};
document.getElementById('btn-set-time').onclick = function() {
  viz.setDate(new Date(prompt('Enter a date (YYYY-mm-dd or YYYY-mm-ddTHH:mm:ss.sssZ)')));
};

document.getElementById('btn-set-jd-per-second').onclick = function() {
  viz.setJdPerSecond(parseInt(prompt('Enter jd per second'), 10));
};

document.getElementById('btn-faster').onclick = function() {
  viz.setJdPerSecond(viz.getJdPerSecond() * 1.5);
};

document.getElementById('btn-slower').onclick = function() {
    viz.setJdPerSecond(viz.getJdPerSecond() * 0.5);
};

document.getElementById('btn-load-asteroid').onclick = function() {
    const jsonPath = "asteroid_data.json";
    loadAsteroidJson(jsonPath);
};

function loadAsteroidJson(jsonPath) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            processAsteroidJson(this.responseText);
        }
    };


    xmlhttp.open("GET", jsonPath, true);
    xmlhttp.send();
}

function processAsteroidJson(json) {
    const asteroidJson = JSON.parse(json);
    const ephemTable = new Spacekit.EphemTable(asteroidJson.ephemTable, units = asteroidJson.ephemSettings.units);
    const objectSettings = asteroidJson.spacekitSettings;
    objectSettings.ephemTable = ephemTable;

    const asteroid = viz.createObject(asteroidJson.id, objectSettings);
    asteroid.getOrbit().setHexColor(Number(objectSettings.orbitPathSettings.color))

}

const dateElt = document.getElementById('current-date');
viz.onTick = function() {
  const d = viz.getDate();
  dateElt.innerHTML = d.toISOString();
};