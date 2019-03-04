/*global PIXI, NM, NM_Panel*/

class NM_Panel extends PIXI.Container {

  constructor(props) {
    super();

    props = props || {};

    this.id = props.id;

    // Sprite panel
    if (props.bgTexture) {
      this.bg = new PIXI.Sprite(props.bgTexture);
      if (props.bgTextureFit) {
        this.bg.width  = props.width  || 16;
        this.bg.height = props.height || 16;
      }
      this.addChild(this.bg);
    }

    // Graphics panel
    else if(props.borderWidth || props.borderColor || props.bgColor) {
      this.bg = new PIXI.Graphics();
      this.renderAsRect(
        this.bg,
        props.width  || 16,
        props.height || 16,
        props.borderWidth || 0,
        props.borderColor || 0xFFFFFF,
        props.bgColor
      );
      this.addChild(this.bg);
    }

    this.position.set(
      props.left || 0,
      props.top  || 0
    );

    // window.console.log('NM_Panel:', this);
  }


  renderAsRect(bg, width, height, borderWidth, borderColor, bgColor) {
    // window.console.log('NM_Panel::renderRect(), w =', width, ', h =', height);
    let bdrW2 = borderWidth * 2;
    if (borderWidth || borderColor) {
      bg.lineStyle(borderWidth, borderColor, 1);
    }
    if (bgColor) {
      bg.beginFill(bgColor);
      bg.drawRect(borderWidth, borderWidth, width - bdrW2, height - bdrW2);
      bg.endFill();
    }
    else {
      bg.drawRect(borderWidth, borderWidth, width - bdrW2, height - bdrW2);
    }
  }

}