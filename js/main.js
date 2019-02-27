/*global PIXI, NM*/

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


window.NM = window.NM || {};


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

  dragObject: null,

  dragContainer: new PIXI.Container(),

  startDrag: function(event) {
    window.console.log('startDrag');
    let dragObject = this;
    let parentContainer = dragObject.parent;
    dragObject.dragData = event.data;
    dragObject.parentBeforeDrag = parentContainer;
    dragObject.dragPointerStartPos = event.data.getLocalPosition(parentContainer);
    dragObject.dragObjStartPos = new PIXI.Point(dragObject.x, dragObject.y);
    NM.dragdrop.dragContainer.addChild(dragObject);
    dragObject.position.copyFrom(parentContainer.toGlobal(dragObject.position));
    dragObject.alpha = dragObject.dragOpacity;
    NM.dragdrop.dragObject = dragObject;
    NM.app.stage.addChild(NM.dragdrop.dragContainer);
    event.stopPropagation();
  },

  updateDrag: function() {
    if ( ! NM.dragdrop.dragObject) { return; }
    // window.console.log('updateDrag');
    let dragObject = NM.dragdrop.dragObject;
    let dragPointerEndPos = dragObject.dragData.getLocalPosition(dragObject.parent);
    dragObject.position.set(
      dragObject.dragObjStartPos.x + (dragPointerEndPos.x - dragObject.dragPointerStartPos.x),
      dragObject.dragObjStartPos.y + (dragPointerEndPos.y - dragObject.dragPointerStartPos.y)
    );
  },

  endDrag: function(event) {
    window.console.log('endDrag');
    if ( ! NM.dragdrop.dragObject) { return; }
    let dragObject = NM.dragdrop.dragObject;
    let dragObjectLocalPos = dragObject.parentBeforeDrag.toLocal(dragObject.position, dragObject.parent);
    dragObject.parentBeforeDrag.addChild(dragObject);
    dragObject.position.copyFrom(dragObjectLocalPos);
    dragObject.parentBeforeDrag = null;
    dragObject.dragData = null;
    dragObject.alpha = 1;
    NM.dragdrop.dragObject = null;
    event.stopPropagation();
  },

  makeDraggable: function(sprite, dragOpacity) {
    sprite.interactive = true;
    sprite.buttonMode = true;
    sprite.dragOpacity = dragOpacity || 1;
    sprite
      .on('pointerdown'      , this.startDrag  )
      .on('pointermove'      , this.updateDrag )
      .on('pointerup'        , this.endDrag    )
      .on('pointerupoutside' , this.endDrag    );
  }
};



PIXI.Loader.shared.load(function() {

  let resources = PIXI.Loader.shared.resources;
  let unplaced = NM.mapdata.items.filter(function(item) { return item.group === 1; });
  let placed = NM.mapdata.items.filter(function(item) { return item.group === 2; });
  let mapBgImage = new PIXI.Sprite(resources.terrein.texture);
  let leftPanel = new PIXI.Graphics();
  let scrollPanel = new PIXI.Graphics();
  let i;

  window.console.log('unplaced:', unplaced);
  window.console.log('placed:', placed);

  NM.app = new PIXI.Application({width: 800, height: 600, antialias: true});

  // Add MAP IMAGE to app.stage
  mapBgImage.position.set(NM.app.screen.width*0.2, 0);
  NM.dragdrop.makeDraggable(mapBgImage);
  NM.app.stage.addChild(mapBgImage);

  // scrollPanel.beginFill(0x650A5A);
  // scrollPanel.endFill();

  leftPanel.beginFill(0x650A5A);
  leftPanel.drawRect(0, 0, NM.app.screen.width*0.2, NM.app.screen.height);
  leftPanel.endFill();
  scrollPanel.lineStyle(1, 0xFFFF00, 1);
  scrollPanel.drawRect(0, 0, leftPanel.width, leftPanel.height - 40);
  scrollPanel.hitArea = new PIXI.Rectangle(0, 0, leftPanel.width, leftPanel.height - 40);
  scrollPanel.position.set(0, 40);
  NM.dragdrop.makeDraggable(scrollPanel);
  leftPanel.addChild(scrollPanel);
  NM.app.stage.addChild(leftPanel);

  // Add UNPLACED MAP items
  for (i in unplaced) {
    let item = unplaced[i];
    let itemType = NM.mapdata.itemtypes[item.type];
    let sprite = new PIXI.Sprite(resources[itemType.name].texture);
    let text = new PIXI.Text(item.id, { fontSize: 16 });
    text.anchor.set(0.5);
    text.x = sprite.width / 2;
    text.y = sprite.height / 2;
    sprite.x = 5;
    sprite.y = i*(sprite.height*itemType.scale + 3) + 5;
    sprite.__id = 'item' + item.id;
    sprite.scale.set(itemType.scale);
    NM.dragdrop.makeDraggable(sprite, 0.5);
    sprite.addChild(text);
    scrollPanel.addChild(sprite);
  }

  // Add PLACED MAP items
  let mapBgImageW10 = mapBgImage.width*0.1;
  let mapBgImageW20 = mapBgImage.width*0.2;
  for (i in placed) {
    let item = placed[i];
    let itemType = NM.mapdata.itemtypes[item.type];
    let sprite = new PIXI.Sprite(resources[itemType.name].texture);
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

  // Add the canvas that Pixi automatically created for you to
  // the document body.
  document.body.appendChild(NM.app.view);

});


window.console.log('NM:', NM);