import { Sprite } from './sprite';

export class Combatant extends Sprite {
  constructor(
    public canvas: HTMLCanvasElement,
    public ctx: CanvasRenderingContext2D,
    public position: Coordinates,
    public velocity: Coordinates,
    public source: string,
    public scale: number = 1,
    public maxFrames: number = 1,
    public offset: Coordinates = {
      x: 0,
      y: 0,
    },
    public sprites: SpriteT,
    public attackBox: AttackBox = {
      offset: {
        x: 0,
        y: 0,
      },
      height: 0,
      width: 0,
    },
    public color: string = 'red',
  ) {
    super(ctx, position, source, scale, maxFrames, offset);

    this.source = this.sprites.idle.source;

    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset: this.attackBox.offset,
      width: this.attackBox.width,
      height: this.attackBox.height,
    };
    this.color = color;

    // for (const sprite in this.sprites) {
    //   this.sprites[sprite].image = new Image();
    //   this.sprites[sprite].image.id = sprite;
    //   this.sprites[sprite].image.src = this.sprites[sprite].source;
    // }
  }

  lastKey: string;
  isAttacking: boolean;
  health: number = 100;
  currentFrames: number = 0;
  elapsedFrames: number = 0;
  holdFrames: number = 5;
  dead: boolean = false;

  update() {
    this.render();
    if (!this.dead) this.animate();

    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

    // this.ctx.fillRect(
    //   this.attackBox.position.x,
    //   this.attackBox.position.y,
    //   this.attackBox.width,
    //   this.attackBox.height,
    // );

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (
      this.position.y + this.height + this.velocity.y >=
      this.canvas.height - 96
    ) {
      this.velocity.y = 0;
      this.position.y = 330;
    } else this.velocity.y += 0.7;
  }

  attack() {
    this.setSprite('attack');
    this.isAttacking = true;
  }

  takeHit() {
    this.health -= 20;

    if (this.health <= 0) {
      this.setSprite('death');
    } else this.setSprite('takeHit');
  }

  setSprite(sprite: string) {
    if (this.image === this.sprites.death.image) {
      if (this.currentFrames === this.sprites.death.maxFrames - 1)
        this.dead = true;
      return;
    }

    if (
      this.image === this.sprites.attack.image &&
      this.currentFrames < this.sprites.attack.maxFrames - 1
    )
      return;

    if (
      this.image === this.sprites.takeHit.image &&
      this.currentFrames < this.sprites.takeHit.maxFrames - 1
    )
      return;

    if (sprite !== 'idle') {
      console.log(
        `[${sprite}]: ${this.image.src} >> ${this.sprites[sprite].image.src}`,
      );
      console.log(this.sprites[sprite]);
    }
    if (this.image !== this.sprites[sprite].image) {
      this.image = this.sprites[sprite].image;
      this.maxFrames = this.sprites[sprite].maxFrames;
      this.currentFrames = 0;
    }
  }
}

interface SpriteT {
  idle: SpriteData;
  run: SpriteData;
  jump: SpriteData;
  fall: SpriteData;
  attack: SpriteData;
  takeHit: SpriteData;
  death: SpriteData;
}

interface SpriteData {
  source: string;
  maxFrames: number;
  image?: any;
}

interface Coordinates {
  x: number;
  y: number;
}

interface AttackBox {
  offset: Coordinates;
  width: number;
  height: number;
  position?: Coordinates;
}
