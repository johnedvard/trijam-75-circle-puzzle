import { TileEngine, Sprite } from 'kontra';
import tileset from "../assets/tileset.png";
export class MyTileEngine {
  tileEngine: TileEngine;
  constructor() {
    let img = new Image();
    img.src = tileset;
    img.onload = () => {
      this.tileEngine = TileEngine({
        // tile size
        tilewidth: 64,
        tileheight: 64,
    
        // map size in tiles
        width: 9,
        height: 9,
    
        // tileset object
        tilesets: [{
          firstgid: 1,
          image: img
        }],
    
        // layer object
        layers: [{
          name: 'wall',
          data: [ 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 1, 1, 1, 1, 1, 1, 0,
                  0, 0, 1, 0, 0, 0, 0, 1, 0,
                  0, 0, 1, 0, 1, 1, 1, 1, 0,
                  0, 0, 1, 0, 1, 0, 0, 0, 0,
                  0, 0, 1, 0, 1, 0, 0, 0, 0,
                  0, 0, 1, 1, 1, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0 ]
        },
        {
          name: 'goal',
          data: [ 0, 0, 0, 0, 0, 0, 2, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 2, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 2, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0 ]
        }]
      });
    }
  }
  render () {
    if(this.tileEngine) {
      this.tileEngine.render();
    }
  }
  layerCollidesWith (...params) {
    if(this.tileEngine) {
      return this.tileEngine.layerCollidesWith(...params);
    }
  }
  canGo(dir: string, sprites: Sprite[], speed: number) { // UP, DOWN, LEFT, RIGHT
    let canGo = true;
    sprites.forEach( (sprite) => {
      let copySprite = Sprite({
        x: sprite.x,
        y: sprite.y,
        anchor: {x: 0.5, y: 0.5},
        height: sprite.height,
        width: sprite.width
      });
      if(dir === "UP") {
        copySprite.y -= speed;
      }
      if(dir === "DOWN") {
        copySprite.y += speed;
      }
      if(dir === "LEFT") {
        copySprite.x -= speed;
      }
      if(dir === "RIGHT") {
        copySprite.x += speed;
      }
      if(canGo) {
        canGo = !this.tileEngine.layerCollidesWith("wall", copySprite);
      }
    });
    return canGo;
  }
}