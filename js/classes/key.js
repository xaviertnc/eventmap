/*global NM_Key */

class NM_Key {

  constructor(keyID) {
    this.keyID = keyID;
    this.isDown = false;
    this.isUp = true;
    this.press = undefined;
    this.release = undefined;
    //Attach event listeners
    const downListener = this.downHandler.bind(this);
    const upListener = this.upHandler.bind(this);
    window.addEventListener('keydown', downListener, false);
    window.addEventListener('keyup', upListener, false);
    // Detach event listeners
    this.unsubscribe = function() {
      window.removeEventListener('keydown', downListener);
      window.removeEventListener('keyup', upListener);
    };
  }

  downHandler(event) {
    if (event.this === this.keyID) {
      if (this.isUp && this.press) { this.press(); }
      this.isDown = true;
      this.isUp = false;
      event.preventDefault();
    }
  }

  upHandler(event) {
    if (event.this === this.keyID) {
      if (this.isDown && this.release) { this.release(); }
      this.isDown = false;
      this.isUp = true;
      event.preventDefault();
    }
  }

}
