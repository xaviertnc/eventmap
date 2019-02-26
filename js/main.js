/*global PIXI, NM*/

PIXI.utils.sayHello(PIXI.utils.isWebGLSupported() ? 'WebGL' : 'canvas');


window.NM = window.NM || {};


NM.lib = {
  randomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};


function onDragStart(event) {
  this.alpha = 0.5;
  this.dragging = 1;
  this.dragData = event.data;
  this.dragPointerStart = event.data.getLocalPosition(this.parent);
  this.dragObjStart = new PIXI.Point();
  this.dragObjStart.copy(this.position);
}

function onDragEnd() {
  this.alpha = 1;
  this.dragging = 0;
  this.dragData = null;
}

function onDragMove() {
  if ( ! this.dragging) { return; }
  let dragPointerEnd = this.dragData.getLocalPosition(this.parent);
  this.position.set(
    this.dragObjStart.x + (dragPointerEnd.x - this.dragPointerStart.x),
    this.dragObjStart.y + (dragPointerEnd.y - this.dragPointerStart.y)
  );
}


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



PIXI.Loader.shared.load(function() {

  let resources = PIXI.Loader.shared.resources;
  let unplaced = NM.mapdata.items.filter(function(item) { return item.group === 1; });
  let placed = NM.mapdata.items.filter(function(item) { return item.group === 2; });
  let shelfContainer = new PIXI.Container();
  let mapContainer = new PIXI.Container();
  let shelfBg = new PIXI.Graphics();
  let mapBg = new PIXI.Sprite(resources.terrein.texture);
  let i;

  NM.app = new PIXI.Application({width: 800, height: 600, antialias: true});

  // Add the canvas that Pixi automatically created for you to
  // the document body.
  document.body.appendChild(NM.app.view);

  // Add SHELF container
  shelfBg.beginFill(0x650A5A);
  shelfBg.drawRect(0, 0, NM.app.screen.width*0.2, NM.app.screen.height);
  shelfBg.endFill();
  shelfContainer.addChild(shelfBg);
  NM.app.stage.addChild(shelfContainer);

  // Add MAP container
  //mapBg.width = NM.app.screen.width*0.8;
  //mapBg.height = NM.app.screen.height;
  mapContainer.x = NM.app.screen.width*0.2;
  mapContainer.addChild(mapBg);
  NM.app.stage.addChild(mapContainer);

  window.console.log('unplaced:', unplaced);
  window.console.log('placed:', placed);

  // Add UNPLACED / SHELF items
  for (i in unplaced) {
    let item = unplaced[i];
    let itemTypeInfo = NM.mapdata.itemtypes[item.type];
    let sprite = new PIXI.Sprite(resources[itemTypeInfo.spr].texture);
    let text = new PIXI.Text(item.id, { fontSize: 16 });
    text.anchor.set(0.5);
    text.x = sprite.width / 2;
    text.y = sprite.height / 2;
    sprite.x = 5;
    sprite.y = i*(sprite.height*itemTypeInfo.scale + 3) + 5;
    sprite.scale.set(itemTypeInfo.scale);
    sprite.interactive = true;
    sprite.buttonMode = true;
    sprite
      .on('pointerdown'      , onDragStart )
      .on('pointerup'        , onDragEnd   )
      .on('pointerupoutside' , onDragEnd   )
      .on('pointermove'      , onDragMove  );
    sprite.addChild(text);
    NM.app.stage.addChild(sprite);
  }

  // Add PLACED / MAP items
  for (i in placed) {
    let item = placed[i];
    let itemTypeInfo = NM.mapdata.itemtypes[item.type];
    let sprite = new PIXI.Sprite(resources[itemTypeInfo.spr].texture);
    let text = new PIXI.Text(item.id);
    text.anchor.set(0.5);
    text.x = sprite.width / 2;
    text.y = sprite.height / 2;
    sprite.x = NM.lib.randomInt(mapContainer.width*0.1, mapContainer.width - mapContainer.width*0.2);
    sprite.y = NM.lib.randomInt(mapContainer.height*0.1, mapContainer.height - mapContainer.height*0.2);
    sprite.rotation = 2 * Math.PI * Math.random(); //radians
    sprite.scale.set(itemTypeInfo.scale);
    sprite.addChild(text);
    mapContainer.addChild(sprite);
  }

  NM.shelfContainer = shelfContainer;
  NM.mapContainer = mapContainer;

});


window.console.log('NM:', NM);