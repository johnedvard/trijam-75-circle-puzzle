import { init, GameLoop, initKeys, initPointer, on, Sprite, setStoreItem, getStoreItem, emit, track} from 'kontra';
import { IGameObject } from './gameObject';
import { GameEvent, GameEventData } from './gameEvent';
import { MainPlayer } from './mainPlayer';
import { MyTileEngine } from './tileEngine';
export class Game {
    gameObjects: IGameObject[] = [];
    gameCanvas;
    canvasSprite;
    modalEl: HTMLElement;
    isSubscriber = false;
    mainPlayer: MainPlayer;
    loop: GameLoop;
    tileEngine: MyTileEngine;
    constructor() {
        initKeys();
        const { canvas, context } = init('game');
        this.checkForSubscriber();
        this.tileEngine = new MyTileEngine();
        this.modalEl = document.getElementById('modal');
        this.gameCanvas = canvas;
        this.mainPlayer = new MainPlayer(this.tileEngine);
        this.gameObjects = [this.mainPlayer];
        initPointer();
        this.loop = GameLoop({ 
            update: this.update,
            render: this.render,
        });
        this.createCanvasSprite();
        this.loop.start();
    }
    render = () => {
        this.canvasSprite.render();
        this.tileEngine.render();
        this.gameObjects.forEach(go => {
            if(go) {
                go.render();
            }
        });
    }
    update = (dt: number) => {
        this.canvasSprite.update();
        this.gameObjects.forEach(go => {
            go.update();
        });
    }
    onGameObjectKill() {
        on(GameEvent.KILL, (event: GameEventData) => {
        });
    }
    createLevel(level: number){
        
    }
    createCanvasSprite(){
        this.canvasSprite = Sprite({
            x: 0,
            y: 0,
            width: this.gameCanvas.width,
            height: this.gameCanvas.height,
            color: "rgba(0,0,0,0.7)",
            onDown: this.onCanvasDown,
        });
        track(this.canvasSprite);
    }
    onCanvasDown = (pointer) => {
    }
    
    createMessage(msg: string){
        const modalChild = this.modalEl.childNodes[0];
        this.modalEl.classList.add('open');
        this.modalEl.classList.remove('close');
        this.modalEl.replaceChild(document.createTextNode(msg), modalChild);
        setTimeout(() => {
            this.modalEl.classList.remove('open');
            this.modalEl.classList.add('close');
        }, 3000);
    }
    
    checkForSubscriber(){
        const monetization: any = (<any>document).monetization;
        setTimeout(()=> {
            if (monetization && monetization.state === 'started') { 
                this.createMessage('Hello Subscriber!');
                document.getElementById('game').classList.add('subscriber');
            }
        });
    }
}