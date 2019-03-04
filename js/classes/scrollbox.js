/*global PIXI, NM, NM_Panel, NM_Scrollbox, NM_Scrollpanel */

class NM_Scrollbox extends NM_Panel {

  constructor(props) {

    super(props);

    // Scrollpanel = Draggable panel inside a static bounding scrollbox panel!
    this.scrollpanel = new NM_Scrollpanel({
      id: this.id + '_scrollpanel',
      top: 0,
      left: 0,
      parent: this,
      width: this.width,
      height: this.height,
      dragBringtoFront: props.dragBringtoFront,
      dragOpacity: props.dragOpacity,
      dragLimits: props.dragLimits,
      dragLock: props.dragLock,
      borderWidth: 1,
      borderColor: 0xFFFFFF
    });

    if ( ! this.parent ) {
      window.console.log('NM_Scrollbox:', this);
    }

  }


  add(displayObject) {
    this.scrollpanel.view.addChild(displayObject);
    let bounds = this.scrollpanel.view.getBounds();
    window.console.log('NM_Scrollbox::add(), scrollpanel.view.bounds=', bounds);
    this.height = bounds.height;
  }

}

