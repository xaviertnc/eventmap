/*global PIXI, NM_Scrollbox, NM_Scrollbar, NM_Draggable */

class NM_Scrollbox {

  constructor(props) {
    window.console.log(props);
    this.box = new PIXI.Graphics();
    this.scrollbar = new NM_Scrollbar();
    this.scrollpanel = new NM_Draggable();
  }

}