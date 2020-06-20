import { Sprite, keyPressed } from 'kontra';
import { IGameObject } from './gameObject';
import { SecondPlayer } from './secondPlayer';

export class MainPlayer implements IGameObject {
  sprite: Sprite;
  speed = 3;
  secondP1: SecondPlayer;
  secondP2: SecondPlayer;
  outerCircle: Sprite;
  maxRadius = 150;
  minRadius = 25;
  currentRadius = 100;
  constructor() {
    this.sprite = Sprite({
      x: 300,
      y: 100,
      anchor: {x: 0.5, y: 0.5},
      width: 20,
      height: 20,
      color: '#f1faee'
    });
    this.createOuterCircle();
    this.secondP1 = new SecondPlayer(this, 0, "j", "i");
    this.secondP2 = new SecondPlayer(this, 3.14, "o", "p");
  }
  render = () => {
    this.outerCircle.render();
    this.sprite.render();
    this.secondP1.render();
    this.secondP2.render();
  };

  update = (dt?: number) => {

    if(keyPressed("w")) { // up
      this.sprite.y -= this.speed;
    }
    if(keyPressed("s")) { // down
      this.sprite.y += this.speed;
    }
    if(keyPressed("a")) { // left
      this.sprite.x -= this.speed;
    }
    if(keyPressed("d")) { // right
      this.sprite.x += this.speed;
    }
    if(keyPressed("q")) {
      this.currentRadius -= 1;
      if(this.currentRadius <= this.minRadius) {
        this.currentRadius = this.minRadius;
      }
    }
    if(keyPressed("e")) {
      this.currentRadius += 1;
      if(this.currentRadius >= this.maxRadius) {
        this.currentRadius = this.maxRadius;
      }
    }
    this.sprite.update();
    this.secondP1.update();
    this.secondP2.update();
    this.updateOuterCircle();
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