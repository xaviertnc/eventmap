/*global PIXI, NM, NM_Panel*/

class NM_Panel {

  constructor(props) {

    props = props || {};

    this.id = props.id;
    this.top = props.top || 0;
    this.left = props.left || 0;
    this.width = props.width || 16;
    this.height = props.height || 16;
    this.bgColor = props.bgColor;
    this.borderColor = props.borderColor;
    this.borderWidth = props.borderWidth;
    this.parent = props.parent;
    this.children = [];

    // Sprite panel
    if (props.bgTexture) {
      this.view = new PIXI.Sprite(props.bgTexture);
      this.view.position.set(this.left, this.top);
      this.view.width = this.width;
      this.view.height = this.height;
    }
    // Graphics panel
    else if(this.borderWidth || this.borderColor || this.bgColor) {
      this.view = new PIXI.Graphics();
      this.view.position.set(this.left, this.top);
      this.render();
    }
    // Plain container
    else {
      this.view = new PIXI.Container();
      this.view.position.set(this.left, this.top);
    }

    if (this.parent) {
      this.parent.children.push(this);
      this.parent.view.addChild(this.view);
    } else {
      window.console.log('NM_Panel:', this);
    }

  }


  addToStage(stage) {
    stage.addChild(this.view);
  }


  render() {
    this.view.clear();
    if (this.borderWidth || this.borderColor) {
      this.view.lineStyle(this.borderWidth || 1, this.borderColor || 0xFFFFFF, 1);
    }
    if (this.bgColor) {
      this.view.beginFill(this.bgColor).drawRect(1, 1, this.width-2, this.height-2).endFill();
    } else {
      this.view.drawRect(1, 1, this.width-2, this.height-2);
    }
  }

}