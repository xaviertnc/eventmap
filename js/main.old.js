/*global PIXI, NM, NM_Panel, NM_Scrollbox, NM_Scrollpanel */

// Includes
// ========
//
// <script src='js/vendor/pixi.min.js'></script>

// <script src='js/classes/key.js'></script>
// <script src='js/classes/scrollpanel.js'></script>
// <script src='js/classes/scrollbar.js'></script>
// <script src='js/classes/scrollbox.js'></script>
// <script src='js/classes/listbox.js'></script>

// <script src='js/api/lib.js'></script>
// <script src='js/api/dragdrop.js'></script>
// <script src='js/api/keyboard.js'></script>

// <script src="js/resources/mapdata.js"></script>


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


NM.app = new PIXI.Application({
  width: 800,
  height: 600,
  antialias: true
});


NM.app.init = function () {

  let i;
  let screen = NM.app.screen;
  let mapBgImage = new PIXI.Sprite(NM.resources.terrein.texture);
  let placed = NM.mapdata.items.filter(function(item) { return item.group === 2; });
  let unplaced = NM.mapdata.items.filter(function(item) { return item.group === 1; });

  // Add MAP IMAGE to stage
  mapBgImage.offset = { x: NM.app.screen.width*0.2, y: 0 };
  mapBgImage.position.set(mapBgImage.offset.x, mapBgImage.offset.y);
  let dragLimits = NM.dragdrop.contain(mapBgImage, NM.app.screen, mapBgImage.offset);
  NM.dragdrop.makeDraggable(mapBgImage, { bringToFront: false, dragLimits: dragLimits });
  NM.app.stage.addChild(mapBgImage);

  // LEFT PANEL
  let leftPanel = new NM_Panel({
    id: 'leftPanel',
    width: screen.width*0.2,
    height: screen.height,
    bgColor: 0x650A5A,
  });

  // LEFT SCROLLPANEL
  let scrollbox = new NM_Scrollbox({
    id: 'leftPanel_scrollbox',
    top: 40,
    left: 0,
    parent: leftPanel,
    width: leftPanel.width,
    height: leftPanel.height - 40,
    dragLock: { x_axis: true, y_axis: false },
    borderColor: 0xFFFF00,
    borderWidth: 1
  });

  leftPanel.addToStage(NM.app.stage);

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
    NM.dragdrop.makeDraggable(sprite, { dragOpacity: 0.5 });
    sprite.addChild(text);
    scrollbox.add(sprite);
  }

  // Add the canvas that Pixi automatically created for you to
  // the document body.
  document.body.appendChild(NM.app.view);

};


NM.resources = PIXI.Loader.shared.resources;
NM.loader = PIXI.Loader.shared;


NM.loader.load(NM.app.init);


window.console.log('NM:', NM);
