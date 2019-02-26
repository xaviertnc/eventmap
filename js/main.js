/*global PIXI, NM, mapdata*/

PIXI.utils.sayHello(PIXI.utils.isWebGLSupported() ? 'WebGL' : 'canvas');

window.NM = window.NM || {};


NM.app = new PIXI.Application({width: 800, height: 600, antialias: true});


NM.lib = {
  randomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};


// Add the canvas that Pixi automatically created for you to
// the document body.
document.body.appendChild(NM.app.view);


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
  let app = NM.app;
  let lib = NM.lib;
  let resources = PIXI.Loader.shared.resources;
  let unplaced = mapdata.items.filter(function(item) { return item.group === 1; });
  let placed = mapdata.items.filter(function(item) { return item.group === 2; });
  let shelfContainer = new PIXI.Container();
  let mapContainer = new PIXI.Container();
  let shelfBg = new PIXI.Graphics();
  let mapBg = new PIXI.Sprite(resources.terrein.texture);
  let i;

  // Config SHELF Container
  shelfBg.beginFill(0x650A5A);
  shelfBg.drawRect(0, 0, app.screen.width*0.2, app.screen.height);
  shelfBg.endFill();
  shelfContainer.addChild(shelfBg);
  app.stage.addChild(shelfContainer);

  // Config MAP Container
  mapBg.width = app.screen.width*0.8;
  mapBg.height = app.screen.height;
  mapContainer.x = app.screen.width*0.2;
  mapContainer.addChild(mapBg);
  app.stage.addChild(mapContainer);

  window.console.log('unplaced:', unplaced);
  window.console.log('placed:', placed);

  //Add unplaced items
  for (i in unplaced) {
    let item = unplaced[i];
    let itemTypeInfo = mapdata.itemtypes[item.type];
    let sprite = new PIXI.Sprite(resources[itemTypeInfo.spr].texture);
    sprite.x = 5;
    sprite.y = i*(sprite.height*itemTypeInfo.scale + 3) + 5;
    sprite.scale.set(itemTypeInfo.scale);
    shelfContainer.addChild(sprite);
  }

  // Add placed items
  for (i in placed) {
    let item = placed[i];
    let itemTypeInfo = mapdata.itemtypes[item.type];
    let sprite = new PIXI.Sprite(resources[itemTypeInfo.spr].texture);
    sprite.x = lib.randomInt(mapContainer.width*0.1, mapContainer.width - mapContainer.width*0.2);
    sprite.y = lib.randomInt(mapContainer.height*0.1, mapContainer.height - mapContainer.height*0.2);
    sprite.rotation = Math.PI * Math.random(); //radians
    sprite.scale.set(itemTypeInfo.scale);
    mapContainer.addChild(sprite);
  }
});

window.console.log('PIXI App:', NM.app);