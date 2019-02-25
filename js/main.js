/*global PIXI*/

PIXI.utils.sayHello(PIXI.utils.isWebGLSupported() ? 'WebGL' : 'canvas');


// Create a Pixi Application
let app = new PIXI.Application({width: 800, height: 600, antialias: true});


let lib = {
  randomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};


// Add the canvas that Pixi automatically created for you to
// the HTML document
document.body.appendChild(app.view);


PIXI.Loader.shared
  .add('red'     , 'img/32x32/red32.png')
  .add('green'   , 'img/32x32/green32.png')
  .add('blue'    , 'img/32x32/blue32.png')
  .add('lighblue', 'img/32x32/lighblue32.png')
  .add('cyan'    , 'img/32x32/cyan32.png')
  .add('peach'   , 'img/32x32/peach32.png')
  .add('olive'   , 'img/32x32/olive32.png')
  .add('grey'    , 'img/32x32/grey32.png');


PIXI.Loader.shared.load(function() {
  let resources = PIXI.Loader.shared.resources;
  let sprGreen = new PIXI.Sprite(resources.green.texture);
  sprGreen.x = 100;
  sprGreen.y = 100;
  app.stage.addChild(sprGreen);

  let sprRed = new PIXI.Sprite(resources.red.texture);
  sprRed.x = 100;
  sprRed.y = 100;
  sprRed.rotation = 0.5; //radians
  app.stage.addChild(sprRed);

  let cyanSprites = [];
  for(let i=0; i<10; i++) {
    let spr = new PIXI.Sprite(resources.cyan.texture);
    spr.width = 16;
    spr.height = 16;
    spr.x = lib.randomInt(150, 650);
    spr.y = lib.randomInt(150, 450);
    spr.rotation = Math.PI * Math.random(); //radians
    app.stage.addChild(spr);
    cyanSprites.push(spr);
  }
});

window.console.log('PIXI App:', app);