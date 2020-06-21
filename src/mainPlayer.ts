import { Sprite, keyPressed } from 'kontra';
import { IGameObject } from './gameObject';
import { SecondPlayer } from './secondPlayer';
import { MyTileEngine } from './tileEngine';

export class MainPlayer implements IGameObject {
  sprite: Sprite;
  speed = 3;
  secondP1: SecondPlayer;
  secondP2: SecondPlayer;
  outerCircle: Sprite;
  maxRadius = 200;
  minRadius = 25;
  currentRadius = 130;
  tileEngine: MyTileEngine;
  sprites: Sprite[]; // all payers
  constructor(tileEngine: MyTileEngine) {
    this.tileEngine = tileEngine;
    this.sprite = Sprite({
      x: 230,
      y: 355,
      anchor: {x: 0.5, y: 0.5},
      width: 20,
      height: 20,
      color: '#f1faee'
    });
    this.createOuterCircle();
    this.secondP1 = new SecondPlayer(this, 0, "j", "i", this.tileEngine);
    this.secondP2 = new SecondPlayer(this, 3.14, "o", "p", this.tileEngine);
    this.sprites = [this.sprite, this.secondP1.sprite, this.secondP2.sprite];
  }
  render = () => {
    this.outerCircle.render();
    this.sprite.render();
    this.secondP1.render();
    this.secondP2.render();
  };

  update = (dt?: number) => {

    if(keyPressed("w") && this.tileEngine.canGo("UP", this.sprites, this.speed)) { // up
      this.sprite.y -= this.speed;
    }
    if(keyPressed("s") && this.tileEngine.canGo("DOWN", this.sprites, this.speed)) { // down
      this.sprite.y += this.speed;
    }
    if(keyPressed("a") && this.tileEngine.canGo("LEFT", this.sprites, this.speed)) { // left
      this.sprite.x -= this.speed;
    }
    if(keyPressed("d") && this.tileEngine.canGo("RIGHT", this.sprites, this.speed)) { // right
      this.sprite.x += this.speed;
    }
    let tmpRadius = this.currentRadius;
    if(keyPressed("q")) {
      tmpRadius -= 1;
      if(tmpRadius <= this.minRadius) {
        tmpRadius = this.minRadius;
      }
    }
    if(keyPressed("e")) {
      tmpRadius += 1;
      if(tmpRadius >= this.maxRadius) {
        tmpRadius = this.maxRadius;
      }
    }

    this.sprite.update();
    const featurePosP1 = this.secondP1.getCirclePos(this.sprite.x, this.sprite.y, tmpRadius, this.secondP1.alpha);
    const featurePosP2 = this.secondP1.getCirclePos(this.sprite.x, this.sprite.y, tmpRadius, this.secondP2.alpha);
    let canUpdateCircle1 = false;
    let canUpdateCircle2 = false;
    if(!this.tileEngine.layerCollidesWith("wall", {x: featurePosP1.x, y: featurePosP1.y, width: this.secondP1.width, height: this.secondP1.height, anchor: this.secondP1.anchor})){
      canUpdateCircle1 = true;
      this.secondP1.update();
    }
    if(!this.tileEngine.layerCollidesWith("wall", {x: featurePosP2.x, y: featurePosP2.y, width: this.secondP2.width, height: this.secondP2.height, anchor: this.secondP2.anchor})){
      canUpdateCircle2 = true;
      this.secondP2.update();
    }
    if(canUpdateCircle1 && canUpdateCircle2) {
      this.currentRadius = tmpRadius
      this.updateOuterCircle();
    }
    if(this.checkWinCondition()) {
      console.log("you win");
    }
  };
  trackObject = () => {
  };
  untrackObject = () => {
  };
  createOuterCircle = () => {
    this.outerCircle = Sprite({
      x: this.x,
      y: this.y,
      anchor: {x: 0.5, y: 0.5},
      radius: this.currentRadius,
      color: '#f1faee',
      render: function() {
        this.context.strokeStyle = '#f1faee';
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        this.context.stroke();
      }
    });
  }
  updateOuterCircle = () => {
    this.outerCircle.x = this.x;
    this.outerCircle.y = this.y;
    this.outerCircle.radius = this.currentRadius;
    this.outerCircle.update();
  }
  checkWinCondition = () => {
    return (this.tileEngine.layerCollidesWith("goal", this.sprite) 
    && this.tileEngine.layerCollidesWith("goal", this.secondP1.sprite)
    && this.tileEngine.layerCollidesWith("goal", this.secondP2.sprite))
  }
  get x () {
    return this.sprite.x;
  }
  get y () {
    return this.sprite.y;
  }

  get radius() {
    return this.currentRadius;
  }
  
}