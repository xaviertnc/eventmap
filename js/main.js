/*global PIXI, Scrollbox, NM, NM_Panel, NM_Scrollbox, NM_Scrollpanel */

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

  // MAP
  let map = new PIXI.extras.Scrollbox({
    boxWidth  : NM.app.screen.width*0.8,
    boxHeight : NM.app.screen.height,
    overflowX : 'hidden',
    overflowY : 'hidden'
  });
  map.bgImage = new PIXI.Sprite(NM.resources.terrein.texture);
  map.position.set(NM.app.screen.width*0.2, 0);
  map.content.addChild(map.bgImage);
  map.update();


  // LEFT PANEL
  let leftPanel = new NM_Panel({
    id: 'leftPanel',
    width: NM.app.screen.width*0.2,
    height: NM.app.screen.height,
    bgColor: 0x650A5A
  });


  let i;
  let placed = NM.mapdata.items.filter(function(item) { return item.group === 2; });
  let unplaced = NM.mapdata.items.filter(function(item) { return item.group === 1; });

  for (i=18; i<380; i++) {
    let item = {
      id: i,
      type: 'Maker4x4',
      x: 0,
      y: 0,
      z: 0,
      angle: 0,
      layer: 'base',
      group: 1,
      data: {}
    };
    unplaced.push(item);
  }


  // LEFT LISTBOX
  let listTop = 40;
  let scrollbarWidth = 10;
  let listHeight = Math.min(55, unplaced.length)*(16 + 3) * 1.5;
  let listWidth = NM.app.screen.width*0.2;
  let scrollHeight = leftPanel.height - listTop;
  let needScroll = listHeight > scrollHeight;
  let listbox = new PIXI.extras.Scrollbox({
    boxWidth  : listWidth,
    boxHeight : scrollHeight,
    overflowX : 'hidden',
    overflowY : 'auto'
  });

  listbox.position.set(0, listTop);
  listbox.bgImage = new PIXI.Sprite(PIXI.Texture.WHITE);
  listbox.bgImage.width = listWidth - (needScroll ? scrollbarWidth : 0);
  listbox.bgImage.height = listHeight;
  listbox.bgImage.tint = 0x000000;
  listbox.content.addChild(listbox.bgImage);
  listbox.update();

  // Add PLACED MAP items
  let mapBgImageW10 = map.bgImage.width*0.1;
  let mapBgImageW20 = map.bgImage.width*0.2;
  for (i in placed) {
    let item = placed[i];
    let itemType = NM.mapdata.itemtypes[item.type];
    let sprite = new PIXI.Sprite(NM.resources[itemType.name].texture);
    let text = new PIXI.Text(item.id);
    text.anchor.set(0.5);
    text.x = sprite.width / 2;
    text.y = sprite.height / 2;
    sprite.x = NM.lib.randomInt(mapBgImageW10, map.bgImage.width - mapBgImageW20);
    sprite.y = NM.lib.randomInt(mapBgImageW10, map.bgImage.height - mapBgImageW20);
    sprite.rotation = 2 * Math.PI * Math.random(); //radians
    sprite.scale.set(itemType.scale);
    sprite.addChild(text);
    map.bgImage.addChild(sprite);
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
    sprite.x = (sprite.width * itemType.scale + 3) * Math.floor(i / 55) + 5;
    sprite.y = (i % 55) * (sprite.height * itemType.scale + 3) + 5;
    sprite.__id = 'item' + item.id;
    sprite.scale.set(itemType.scale);
    NM.dragdrop.makeDraggable(sprite, { dragOpacity: 0.5 });
    sprite.addChild(text);
    listbox.content.addChild(sprite);
  }

  document.body.appendChild(NM.app.view);

  NM.app.stage.addChild(map);
  NM.app.stage.addChild(leftPanel);
  NM.app.stage.addChild(listbox);

  window.console.log('map:', map);
  window.console.log('listbox:', listbox);
  window.console.log('leftPanel:', leftPanel);
};


NM.resources = PIXI.Loader.shared.resources;
NM.loader = PIXI.Loader.shared;


NM.loader.load(NM.app.init);


window.console.log('NM:', NM);
