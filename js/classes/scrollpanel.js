/*global PIXI, NM, NM_Panel, NM_Scrollpanel */

class NM_Scrollpanel extends NM_Panel {

  constructor(props) {

    super(props);

    // Plain panel only
    if ( ! props.viewTexture) {
      this.view.hitArea = new PIXI.Rectangle(0, 0, this.width, this.height);
    }

    NM.dragdrop.makeDraggable(this.view, {
      dragBringtoFront: props.dragBringtoFront,
      dragOpacity: props.dragOpacity,
      dragLimits: props.dragLimits,
      dragLock: props.dragLock
    });

    if ( ! this.parent ) {
      window.console.log('NM_Scrollpanel:', this);
    }
  }

}

