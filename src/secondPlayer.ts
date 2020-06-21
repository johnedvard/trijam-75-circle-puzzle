import { Sprite, keyPressed } from 'kontra';
import { IGameObject } from './gameObject';
import { MainPlayer } from './mainPlayer';
import { MyTileEngine } from './tileEngine';

export class SecondPlayer implements IGameObject {
  static ID = 0;
  id = 0;
  sprite: Sprite;
  alpha: number; // radians
  mainPlayer: MainPlayer;
  rotRightKey: string;
  rotLeftKey: string;
  rotSpeed = 0.05;
  tileEngine: MyTileEngine;
  constructor(mainPlayer: MainPlayer, alpha: number, rotLeftKey: string, rotRightKey: string, tileEngine: MyTileEngine) {
    this.tileEngine = tileEngine;
    this.id = SecondPlayer.ID++;
    this.alpha = alpha;
    this.mainPlayer = mainPlayer;
    this.rotLeftKey = rotLeftKey;
    this.rotRightKey = rotRightKey;
    this.sprite = Sprite({
      x: mainPlayer.x  + 20,
      y: mainPlayer.y + 20,
      anchor: {x: 0.5, y: 0.5},
      width: 10,
      height: 10,
      color: this.id === 0 ? '#a8dadc' : "#457b9d",
    });
  }
  
  render = () => {
    this.sprite.render();
  };

  update = () => {
    // todo change position from player1
    // apply any rotation with pivot point from main player x,y
    let alphaCpy = this.alpha;
    if(keyPressed(this.rotLeftKey)) {
      alphaCpy -= this.rotSpeed;
      if(alphaCpy <= 0) {
        alphaCpy = 6.28;
      }
    }
    if(keyPressed(this.rotRightKey)) {
      alphaCpy += this.rotSpeed;
      if(alphaCpy >= 6.28) {
        alphaCpy = 0;
      }
    }
    const newPos = this.getCirclePos(this.mainPlayer.x, this.mainPlayer.y, this.mainPlayer.radius, alphaCpy); 
    let collisionObj = {width: this.sprite.width, height: this.sprite.height, x:newPos.x, y:newPos.y, anchor: this.sprite.anchor}
    if(!this.tileEngine.layerCollidesWith("wall", collisionObj)) {
      this.alpha = alphaCpy;
    }
    this.sprite.x = newPos.x;
    this.sprite.y = newPos.y;
    this.sprite.update();
  };
  trackObject = () => {};
  untrackObject =  () => {};
  getCirclePos = (x, y, radius, alpha) => {
    const newX = x + radius * Math.cos(alpha);
    const newY = y + radius * Math.sin(alpha);
    return {x:newX, y: newY};
  }
  get height() {
    return this.sprite.height;
  }
  get width() {
    return this.sprite.width;
  }
  get anchor(){
    return {...this.sprite.anchor};
  }
}