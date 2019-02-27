/*global NM, NM_Key */

window.NM = window.NM || {};


NM.keyboard = {
  keys: {},
  addKey: function(keyID) {
    this.keys[keyID] = new NM_Key(keyID);
    return this;
  },
  key: function(keyID) {
    return this.keys[keyID];
  }
};