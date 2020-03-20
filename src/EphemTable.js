import * as Units from './Units';

/**
 * A class representing an ephemeris look-up table for defining a space object.
 * @example
 */

//Default Values
const DEFAULT_UNITS = {
  distance: "au",
  time: "day"
};

const DEFAULT_EPHEM_TYPE = 'cartesianposvel';

//Allowable unit types
const DISTANCE_UNITS = new Set(['km','au']);
const EPHEM_TYPE = new Set(['cartesianposvel']);
const TIME_UNITS = new Set(['day','sec']);

export class EphemTable {

  constructor(table, units = DEFAULT_UNITS, ephemType = DEFAULT_EPHEM_TYPE) {
    this.table = table;
    this.units = units;
    this.ephemType = ephemType;

    if (units.distance !== DEFAULT_UNITS.distance || units.time !== DEFAULT_UNITS.time) {
      let distanceMultiplier = this.calcDistanceMultiplier(units.distance);
      let timeMultiplier = this.calcTimeMultiplier(units.time);
      this.table.forEach(line => {
        line[1] *= distanceMultiplier;
        line[2] *= distanceMultiplier;
        line[3] *= distanceMultiplier;
        line[4] *= distanceMultiplier * timeMultiplier;
        line[5] *= distanceMultiplier * timeMultiplier;
        line[6] *= distanceMultiplier * timeMultiplier;
      })
    }
  }

  getPositionAtTime(jd, debug) {
    if (jd <= this.table[0][0]) {
      return [this.table[0][1], this.table[0][2], this.table[0][3]];
    }

    const last = this.table[this.table.length - 1];
    if (jd >= last[0]) {
      return [last[1], last[2], last[3]];
    }

    let closestTime = 1e20;
    let bestLineIndex = 0;
    this.table.forEach((line,i) => {
      const delta = Math.abs(jd - line[0]);
      if (delta < closestTime) {
        closestTime = delta;
        bestLineIndex = i;
      }
    });

    let index0 = bestLineIndex;
    let index1 = index0 + 1;
    if (index0 === this.table.length) {
      index1 = bestLineIndex;
      index0 = index0 - 1;
    }

    const x = this.interpolateValue(jd, this.table[index0][0], this.table[index1][0], this.table[index0][1], this.table[index1][1]);
    const y = this.interpolateValue(jd, this.table[index0][0], this.table[index1][0], this.table[index0][2], this.table[index1][2]);
    const z = this.interpolateValue(jd, this.table[index0][0], this.table[index1][0], this.table[index0][3], this.table[index1][3]);

    return [x, y, z];
  }

  calcDistanceMultiplier(unitType) {
    switch(unitType) {
      case "au":
        return 1.0;
      case "km":
        return Units.kmToAu(1);
      default:
        throw new Error("Unknown distance unit type: " + unitType)
    }
  }

  calcTimeMultiplier(unitType) {
    switch(unitType) {
      case "day":
        return 1.0;
      case "sec":
        return 1/86400.0;
      default:
        throw new Error("Unknown time unit type: " + unitType)
    }
  }

  interpolateValue(t, t0, t1, v0, v1) {
    return (v0 *(t1-t) + v1*(t - t0))/(t1-t0);
  }
}