// Create the visualization and put it in our div.
const viz = new Spacekit.Simulation(document.getElementById('main-container'), {
  basePath: '../../src',
  //startDate: new Date('2019-10-31T14:45:00.000Z'),
  startDate: new Date('2019-10-31'),
  jdPerSecond: 0.01,
  startPaused: true,
  unitsPerAu: 1,
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

//
// // Then add some planets
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

const ephemTable = new Spacekit.EphemTable([
    [2458757.5,1.123446604,0.2641612133,0.0123957406,-0.0075404349,0.0125022686,-0.0003780146],
    [2458758.5,1.1157978642,0.2766375493,0.0120165397,-0.0077572225,0.012449898,-0.0003803795],
    [2458759.5,1.1079318046,0.2890599881,0.0116349969,-0.0079750733,0.0123944634,-0.0003826982],
    [2458760.5,1.0998473655,0.3014254328,0.0112511591,-0.0081939803,0.0123358988,-0.0003849692],
    [2458761.5,1.0915434946,0.3137307198,0.0108650749,-0.0084139354,0.0122741365,-0.000387191],
    [2458762.5,1.0830191483,0.3259726166,0.0104767941,-0.0086349294,0.0122091066,-0.000389362],
    [2458763.5,1.074273293,0.3381478197,0.0100863683,-0.0088569517,0.0121407369,-0.0003914806],
    [2458764.5,1.0653049062,0.3502529525,0.0096938509,-0.0090799903,0.0120689532,-0.0003935451],
    [2458765.5,1.0561129781,0.3622845627,0.0092992968,-0.0093040318,0.0119936789,-0.0003955537],
    [2458766.5,1.0466965132,0.3742391205,0.0089027627,-0.0095290613,0.011914835,-0.0003975047],
    [2458767.5,1.0370545317,0.3861130158,0.0085043073,-0.0097550622,0.0118323403,-0.0003993961],
    [2458768.5,1.0271860712,0.3979025561,0.0081039911,-0.0099820162,0.0117461107,-0.0004012259],
    [2458769.5,1.0170901884,0.4096039635,0.0077018766,-0.0102099032,0.0116560599,-0.0004029922],
    [2458770.5,1.0067659612,0.4212133725,0.0072980286,-0.0104387011,0.0115620988,-0.0004046928],
    [2458771.5,0.9962124906,0.432726827,0.0068925137,-0.0106683858,0.0114641353,-0.0004063255],
    [2458772.5,0.9854289028,0.4441402775,0.0064854009,-0.0108989311,0.0113620748,-0.0004078882],
    [2458773.5,0.9744143509,0.4554495783,0.0060767614,-0.0111303088,0.0112558192,-0.0004093785],
    [2458774.5,0.963168018,0.4666504839,0.0056666687,-0.0113624881,0.0111452674,-0.0004107941],
    [2458775.5,0.9516891184,0.4777386462,0.0052551988,-0.0115954364,0.0110303148,-0.0004121327],
    [2458776.5,0.9399769005,0.4887096104,0.0048424298,-0.0118291187,0.0109108527,-0.0004133917],
    [2458777.5,0.9280306485,0.4995588108,0.0044284426,-0.0120634983,0.0107867681,-0.000414569],
    [2458778.5,0.9158496841,0.5102815664,0.0040133199,-0.012298537,0.0106579427,-0.0004156622],
    [2458779.5,0.9034333677,0.5208730745,0.0035971469,-0.0125341962,0.0105242518,-0.0004166693],
    [2458780.5,0.8907810974,0.5313284035,0.0031800104,-0.0127704386,0.0103855611,-0.0004175888],
    [2458781.5,0.8778923068,0.5416424811,0.0027619986,-0.0130072324,0.0102417231,-0.0004184201],
    [2458782.5,0.8647664556,0.5518100773,0.0023431994,-0.0132445585,0.0100925668,-0.0004191642],
    [2458783.5,0.8514030088,0.561825771,0.0019236978,-0.01348243,0.0099378765,-0.0004198261],
    [2458784.5,0.8378013845,0.5716838825,0.0015035701,-0.0137209414,0.0097773347,-0.0004204202],
    [2458785.5,0.8239608073,0.5813782969,0.001082867,-0.0139604335,0.0096103342,-0.0004209884],
    [2458786.5,0.8098797828,0.59090186,0.0006615555,-0.0142022679,0.0094351059,-0.0004216851],
    [2458787.5,0.7955527321,0.6002426201,0.0002391502,-0.0144571218,0.0092396157,-0.0004236826],
    [2458788.5,0.7802251464,0.6101686667,-0.0002269461,-0.0163282004,0.0113100438,-0.0005017876],
    [2458789.5,0.7638085091,0.6213976609,-0.0007258565,-0.0165220941,0.0111392975,-0.0004976121],
    [2458790.5,0.7471724625,0.632441253,-0.0012229364,-0.0167511102,0.0109462058,-0.00049664],
    [2458791.5,0.7303053631,0.6432872187,-0.0017192031,-0.0169832223,0.0107444192,-0.0004958974],
    [2458792.5,0.713206041,0.6539275674,-0.0022147152,-0.0172153136,0.0105350408,-0.000495111],
    [2458793.5,0.6958750733,0.6643548446,-0.0027093851,-0.0174464052,0.0103182903,-0.0004942058],
    [2458794.5,0.6783137378,0.6745617023,-0.0032030767,-0.0176759793,0.0100942013,-0.0004931506],
    [2458795.5,0.660523746,0.6845407942,-0.0036956303,-0.0179036612,0.0098627531,-0.0004919277],
    [2458796.5,0.6425071537,0.6942847431,-0.0041868724,-0.0181291287,0.0096239085,-0.0004905257],
    [2458797.5,0.6242663275,0.7037861326,-0.0046766191,-0.0183520795,0.0093776279,-0.0004889356],
    [2458798.5,0.6058039324,0.7130375083,-0.0051646783,-0.0185722174,0.0091238756,-0.0004871498],
    [2458799.5,0.5871229292,0.7220313839,-0.0056508512,-0.018789246,0.008862624,-0.0004851617],
    [2458800.5,0.5682265767,0.7307602504,-0.0061349323,-0.0190028657,0.0085938551,-0.0004829653],
    [2458801.5,0.5491184355,0.7392165861,-0.0066167105,-0.0192127721,0.0083175625,-0.0004805549],
    [2458802.5,0.5298023733,0.7473928695,-0.0070959691,-0.0194186558,0.0080337526,-0.0004779254],
    [2458803.5,0.5102825698,0.7552815922,-0.0075724865,-0.0196202017,0.0077424457,-0.0004750716],
    [2458804.5,0.4905635224,0.7628752735,-0.008046036,-0.0198170897,0.0074436771,-0.0004719891],
    [2458805.5,0.4706500511,0.770166476,-0.0085163869,-0.0200089951,0.0071374978,-0.0004686734],
    [2458806.5,0.4505473026,0.7771478212,-0.0089833038,-0.020195589,0.0068239755,-0.0004651206],
    [2458807.5,0.4302607542,0.7838120075,-0.0094465478,-0.0203765395,0.0065031956,-0.000461327],
    [2458808.5,0.4097962162,0.7901518274,-0.0099058764,-0.0205515121,0.0061752614,-0.0004572894],
    [2458809.5,0.3891598345,0.7961601862,-0.0103610442,-0.0207201712,0.0058402954,-0.0004530048],
    [2458810.5,0.3683580903,0.8018301213,-0.0108118028,-0.020882181,0.0054984392,-0.0004484707],
    [2458811.5,0.3473978006,0.8071548217,-0.0112579018,-0.0210372065,0.0051498547,-0.0004436852],
    [2458812.5,0.3262861162,0.8121276484,-0.0116990888,-0.0211849153,0.0047947239,-0.0004386466],
    [2458813.5,0.3050305185,0.8167421548,-0.0121351103,-0.0213249787,0.0044332496,-0.0004333539],
    [2458814.5,0.2836388153,0.8209921073,-0.0125657117,-0.0214570728,0.0040656553,-0.0004278065],
    [2458815.5,0.2621191351,0.8248715067,-0.0129906384,-0.0215808806,0.0036921857,-0.0004220044],
    [2458816.5,0.2404799193,0.8283746086,-0.0134096358,-0.0216960932,0.0033131062,-0.0004159483],
    [2458817.5,0.2187299137,0.8314959444,-0.0138224506,-0.0218024113,0.002928703,-0.0004096391]
  ],
  units= {
          distance: "au",
          time: "day"
  }
);


const asteroid = viz.createObject('2019 UN13', {
  ephemTable: ephemTable,
  orbitPathSettings: {
    leadDurationYears: 3,
    trailDurationYears:3,
  },
  textureUrl: 'round_white_18p.png',
  scale: [0.0001, 0.0001, 0.0001],
  labelText: '2019 UN13',
});
asteroid.getOrbit().setHexColor(0x00ff00);


// Set up viewport
viz.getViewer().followObject(earthSphere, [0, 0, 0]);


// Set up event listeners

document.getElementById('btn-forward').onclick = function() {
  viz.setJdPerSecond(Math.abs(viz.getJdPerSecond()))
  viz.start();
};

document.getElementById('btn-backward').onclick = function() {
  viz.setJdPerSecond(-Math.abs(viz.getJdPerSecond()))
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

const dateElt = document.getElementById('current-date');
viz.onTick = function() {
  const d = viz.getDate();
  dateElt.innerHTML = d.toISOString();
};