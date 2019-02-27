/*global PIXI, NM*/

window.NM = window.NM || {};

PIXI.utils.sayHello(PIXI.utils.isWebGLSupported() ? 'WebGL' : 'canvas');

PIXI.Loader.shared
  .add('terrein'   , 'img/terrein-skoon.jpg')
  .add('red'       , 'img/32x32/red32.png')
  .add('green'     , 'img/32x32/green32.png')
  .add('blue'      , 'img/32x32/blue32.png')
  .add('lightblue' , 'img/32x32/lightblue32.png')
  .add('yellow'    , 'img/32x32/yellow32.png')
  .add('purple'    , 'img/32x32/purple32.png')
  .add('cyan'      , 'img/32x32/cyan32.png')
  .add('peach'     , 'img/32x32/peach32.png')
  .add('olive'     , 'img/32x32/olive32.png')
  .add('grey'      , 'img/32x32/grey32.png');


NM.lib = {
  randomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};


NM.keyboard = {
  KEY: function(value) {
    this.value = value;
    this.isDown = false;
    this.isUp = true;
    this.press = undefined;
    this.release = undefined;
    //Attach event listeners
    const downListener = this.downHandler.bind(this);
    const upListener = this.upHandler.bind(this);
    window.addEventListener(
      'thisdown', downListener, false
    );
    window.addEventListener(
      'thisup', upListener, false
    );
    // Detach event listeners
    this.unsubscribe = function() {
      window.removeEventListener('thisdown', downListener);
      window.removeEventListener('thisup', upListener);
    };
  }
};

NM.keyboard.KEY.prototype.downHandler = function(event) {
  if (event.this === this.value) {
    if (this.isUp && this.press) { this.press(); }
    this.isDown = true;
    this.isUp = false;
    event.preventDefault();
  }
};

NM.keyboard.KEY.prototype.upHandler = function(event) {
  if (event.this === this.value) {
    if (this.isDown && this.release) { this.release(); }
    this.isDown = false;
    this.isUp = true;
    event.preventDefault();
  }
};


NM.dragdrop = {
  // The object we're currently dragging.
  dragObject: null,

  // An overlay container covering the entire stage.
  // Used to temporarily house the currently dragged object
  // while dragging it accross container boundries.
  dragOverlay: new PIXI.Container(),

  startDrag: function(event) {
    let newPos, drgObj = this;
    // window.console.log('startDrag');
    drgObj.dragData = event.data;
    drgObj.parentBeforeDrag = drgObj.parent;
    drgObj.positionBeforeDrag = new PIXI.Point(drgObj.x, drgObj.y);
    drgObj.pointerStartingPos = event.data.getLocalPosition(drgObj.parent);
    if (drgObj.dragBringtoFront) {
      newPos = NM.dragdrop.dragOverlay.toLocal(drgObj.position, drgObj.parent);
      NM.dragdrop.dragOverlay.addChild(drgObj);
      drgObj.position.copyFrom(newPos);
    }
    drgObj.alpha = drgObj.dragOpacity;
    NM.dragdrop.dragObject = drgObj;
    NM.app.stage.addChild(NM.dragdrop.dragOverlay);
    event.stopPropagation();
  },

  updateDrag: function() {
    let pointerEndingPos, drgObj = NM.dragdrop.dragObject;
    if ( ! drgObj) { return; }
    pointerEndingPos = drgObj.dragData.getLocalPosition(drgObj.parent);
    let newX = drgObj.positionBeforeDrag.x;
    let newY = drgObj.positionBeforeDrag.y;
    if ( ! drgObj.dragLock.x) { newX += pointerEndingPos.x - drgObj.pointerStartingPos.x; }
    if ( ! drgObj.dragLock.y) { newY += pointerEndingPos.y - drgObj.pointerStartingPos.y; }
    drgObj.position.set(newX, newY);
  },

  endDrag: function(event) {
    // window.console.log('endDrag');
    let newPos, drgObj = NM.dragdrop.dragObject;
    if ( ! drgObj) { return; }
    drgObj.alpha = 1;
    drgObj.dragData = null;
    drgObj.posBeforeDrag = null;
    if (drgObj.dragBringtoFront) {
      newPos = drgObj.parentBeforeDrag.toLocal(drgObj.position, drgObj.parent);
      drgObj.parentBeforeDrag.addChild(drgObj);
      drgObj.position.copyFrom(newPos);
    }
    drgObj.parentBeforeDrag = null;
    NM.dragdrop.dragObject = null;
    event.stopPropagation();
  },

  makeDraggable: function(sprite, options) {
    options = options || {};
    sprite.interactive = true;
    sprite.buttonMode = true;
    sprite.dragOpacity = options.alpha || 1;
    sprite.dragLock = options.lock || {};
    if (typeof options.bringToFront !== 'undefined') {
      sprite.dragBringtoFront = options.bringToFront;
    }
    sprite
      .on('pointerdown'      , this.startDrag  )
      .on('pointermove'      , this.updateDrag )
      .on('pointerup'        , this.endDrag    )
      .on('pointerupoutside' , this.endDrag    );
  }
};


NM.runAfterLoadingResources = function() {
  let i;
  let leftPanel = new PIXI.Graphics();
  let scrollPanel = new PIXI.Graphics();
  let mapBgImage = new PIXI.Sprite(NM.resources.terrein.texture);
  let placed = NM.mapdata.items.filter(function(item) { return item.group === 2; });
  let unplaced = NM.mapdata.items.filter(function(item) { return item.group === 1; });

  // Add MAP IMAGE to stage
  mapBgImage.position.set(NM.app.screen.width*0.2, 0);
  NM.dragdrop.makeDraggable(mapBgImage, { bringToFront: false });
  NM.app.stage.addChild(mapBgImage);

  // Add LEFT PANEL to stage
  leftPanel.beginFill(0x650A5A);
  leftPanel.drawRect(0, 0, NM.app.screen.width*0.2, NM.app.screen.height);
  leftPanel.endFill();
  scrollPanel.lineStyle(1, 0xFFFF00, 1);
  scrollPanel.drawRect(0, 0, leftPanel.width, leftPanel.height - 40);
  scrollPanel.hitArea = new PIXI.Rectangle(0, 0, leftPanel.width, leftPanel.height - 40);
  scrollPanel.position.set(0, 40);
  NM.dragdrop.makeDraggable(scrollPanel, { lock: { x: true, y: false } });
  leftPanel.addChild(scrollPanel);
  NM.app.stage.addChild(leftPanel);

  // Add PLACED MAP items
  let mapBgImageW10 = mapBgImage.width*0.1;
  let mapBgImageW20 = mapBgImage.width*0.2;
  for (i in placed) {
    let item = placed[i];
    let itemType = NM.mapdata.itemtypes[item.type];
    let sprite = new PIXI.Sprite(NM.resources[itemType.name].texture);
    let text = new PIXI.Text(item.id);
    text.anchor.set(0.5);
    text.x = sprite.width / 2;
    text.y = sprite.height / 2;
    sprite.x = NM.lib.randomInt(mapBgImageW10, mapBgImage.width - mapBgImageW20);
    sprite.y = NM.lib.randomInt(mapBgImageW10, mapBgImage.height - mapBgImageW20);
    sprite.rotation = 2 * Math.PI * Math.random(); //radians
    sprite.scale.set(itemType.scale);
    sprite.addChild(text);
    mapBgImage.addChild(sprite);
  }

  // Add UNPLACED MAP items
  for (i in unplaced) {
    let item = unplaced[i];
    let itemType = NM.mapdata.itemtypes[item.type];
    let sprite = new PIXI.Sprite(NM.resources[itemType.name].texture);
    let text = new PIXI.Text(item.id, { fontSize: 16 });
    text.anchor.set(0.5);
    text.x = sprite.width / 2;
    text.y = sprite.height / 2;
    sprite.x = 5;
    sprite.y = i*(sprite.height*itemType.scale + 3) + 5;
    sprite.__id = 'item' + item.id;
    sprite.scale.set(itemType.scale);
    NM.dragdrop.makeDraggable(sprite, { alpha: 0.5 });
    sprite.addChild(text);
    scrollPanel.addChild(sprite);
  }

  // Add the canvas that Pixi automatically created for you to
  // the document body.
  document.body.appendChild(NM.app.view);

};


NM.resources = PIXI.Loader.shared.resources;

NM.app = new PIXI.Application({width: 800, height: 600, antialias: true});

PIXI.Loader.shared.load(NM.runAfterLoadingResources);

window.console.log('NM:', NM);