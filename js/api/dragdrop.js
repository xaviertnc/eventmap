/*global PIXI, NM*/

window.NM = window.NM || {};


NM.dragdrop = {
  // The object we're currently dragging.
  dragObject: null,

  // An overlay container covering the entire stage.
  // Used to temporarily house the currently dragged object
  // while dragging it accross container boundries.
  dragOverlay: new PIXI.Container(),

  startDrag: function(event) {
    let drgObj = this;
    // window.console.log('startDrag');
    drgObj.dragData = event.data;
    drgObj.parentBeforeDrag = drgObj.parent;
    drgObj.positionBeforeDrag = new PIXI.Point(drgObj.x, drgObj.y);
    drgObj.pointerStartingPos = event.data.getLocalPosition(drgObj.parent);
    if (drgObj.dragBringtoFront) {
      let newPos = NM.dragdrop.dragOverlay.toLocal(drgObj.position, drgObj.parent);
      NM.dragdrop.dragOverlay.addChild(drgObj);
      drgObj.position.copyFrom(newPos);
    }
    drgObj.alpha = drgObj.dragOpacity;
    NM.dragdrop.dragObject = drgObj;
    NM.app.stage.addChild(NM.dragdrop.dragOverlay);
    event.stopPropagation();
  },

  updateDrag: function() {
    let drgObj = NM.dragdrop.dragObject;
    if ( ! drgObj) { return; }
    let newX = drgObj.positionBeforeDrag.x;
    let newY = drgObj.positionBeforeDrag.y;
    let pointerEndingPos = drgObj.dragData.getLocalPosition(drgObj.parent);
    // window.console.log('updateDrag(), drgObj.dragLock=', drgObj.dragLock);
    if ( ! drgObj.dragLock.x_axis) { newX += pointerEndingPos.x - drgObj.pointerStartingPos.x; }
    if ( ! drgObj.dragLock.y_axis) { newY += pointerEndingPos.y - drgObj.pointerStartingPos.y; }
    if (drgObj.dragLimits) {
      if (newX < drgObj.dragLimits.minX) { newX = drgObj.dragLimits.minX; }
      if (newY < drgObj.dragLimits.minY) { newY = drgObj.dragLimits.minY; }
    }
    drgObj.position.set(newX, newY);
  },

  endDrag: function(event) {
    // window.console.log('endDrag');
    let drgObj = NM.dragdrop.dragObject;
    if ( ! drgObj) { return; }
    if (drgObj.dragBringtoFront) {
      let newPos = drgObj.parentBeforeDrag.toLocal(drgObj.position, drgObj.parent);
      drgObj.parentBeforeDrag.addChild(drgObj);
      drgObj.position.copyFrom(newPos);
    }
    drgObj.alpha = 1;
    drgObj.dragData = null;
    drgObj.posBeforeDrag = null;
    drgObj.parentBeforeDrag = null;
    NM.dragdrop.dragObject = null;
    event.stopPropagation();
  },

  makeDraggable: function(drgObj, options) {
    // window.console.log('makeDraggable', options);
    options = options || {};
    drgObj.interactive = true;
    drgObj.buttonMode = true;
    drgObj.dragOpacity = options.dragOpacity || 1;
    drgObj.dragLock = options.dragLock || {};
    drgObj.dragLimits = options.dragLimits;
    if (typeof options.bringToFront !== 'undefined') {
      drgObj.dragBringtoFront = options.dragBringToFront;
    }
    drgObj
      .on('pointerdown'      , this.startDrag  )
      .on('pointermove'      , this.updateDrag )
      .on('pointerup'        , this.endDrag    )
      .on('pointerupoutside' , this.endDrag    );
  },

  contain: function(drgObj, container, offset) {
    offset = offset || {};
    offset.x = offset.x || 0;
    offset.y = offset.y || 0;
    let dragMinX = offset.x;
    let dragMinY = offset.y;
    if (drgObj.width < container.width) {
      dragMinX = offset.x - (drgObj.width - container.width);
    }
    if (drgObj.height < container.height) {
      dragMinX = offset.y - (drgObj.height - container.height);
    }
    return { minX: dragMinX, minY: dragMinY };
  }
};