/*global NM */

window.NM = window.NM || {};

window.NM.lib = {};


(function(lib) {

  lib.noop = function(){};


  lib.noConsole = { log: lib.noop };


  lib.extend = function(obj, extendWith, createNewObj) {
    let result = {};
    if (createNewObj) {
      for (let prop in obj) {
        result[prop] = obj[prop];
      }
    } else {
      result = obj;
    }
    if (extendWith) {
      for (let prop in extendWith) {
        if (extendWith.hasOwnProperty(prop)) {
          result[prop] = extendWith[prop];
        }
      }
    }
    return result;
  };


  lib.deg2rad = function(deg) {
    return (deg * Math.PI) / 180;
  };


  lib.rad2deg = function(rad) {
    return (rad * 180) / Math.PI;
  };


  lib.outOfBounds = function(r1, r2) {
    // r1 == Bounds Rect, r2 = Object Rect
    return r2.x > (r1.x + r1.width - r2.width) || r2.x < r1.x ||
      r2.y > (r1.y + r1.height - r2.height) || r2.y < r1.y;
  };


  lib.intersectRect = function(r1, r2) {
    return !(r2.x > (r1.x + r1.width) || (r2.x + r2.width) < r1.x ||
      r2.y > (r1.y + r1.height) || (r2.y + r2.height) < r1.y);
  };


  lib.randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

}(window.NM.lib));
