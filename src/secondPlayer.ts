import { Sprite, keyPressed } from 'kontra';
import { IGameObject } from './gameObject';
import { MainPlayer } from './mainPlayer';

export class SecondPlayer implements IGameObject {
  static ID = 0;
  id = 0;
  sprite: Sprite;
  alpha: number; // radians
  mainPlayer: MainPlayer;
  rotRight: string;
  rotLeft: string;
  rotSpeed = 0.05;
  constructor(mainPlayer: MainPlayer, alpha: number, rotLeft: string, rotRight: string) {
    this.id = SecondPlayer.ID++;
    this.alpha = alpha;
    this.mainPlayer = mainPlayer;
    this.rotLeft = rotLeft;
    this.rotRight = rotRight;
    this.sprite = Sprite({
      x: mainPlayer.x  + 20,
      y: mainPlayer.y + 20,
      anchor: {x: 0.5, y: 0.5},
      radius: 10,
      color: this.id === 0 ? '#a8dadc' : "#457b9d",
      render: function() {
        this.context.fillStyle = this.color;
    
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2  * Math.PI);
        this.context.fill();
      }
    });
  }
  
  render = () => {
    this.sprite.render();
  };

  update = () => {
    // todo change position from player1
    // apply any rotation with pivot point from main player x,y
    if(keyPressed(this.rotLeft)) {
      this.alpha -= this.rotSpeed;
      if(this.alpha <= 0) {
        this.alpha = 6.28;
      }
    }
    if(keyPressed(this.rotRight)) {
      this.alpha += this.rotSpeed;
      if(this.alpha >= 6.28) {
        this.alpha = 0;
      }
    }
    this.sprite.x = this.mainPlayer.x + this.mainPlayer.radius * Math.cos(this.alpha);
    this.sprite.y = this.mainPlayer.y + this.mainPlayer.radius * Math.sin(this.alpha);
    console.log("sprite", this.sprite);
    this.sprite.update();
  };
  trackObject = () => {};
  untrackObject =  () => {};
}