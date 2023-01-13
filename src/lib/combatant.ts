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
    public attackBox: AttackBox = {
      offset: {
        x: 0,
        y: 0,
      },
      height: 0,
      width: 0,
    },
    public attackSource: string,
    public maxAttackFrames: number,
    public color: string = 'red',
    public victories: number = 0,
  ) {
    super(ctx, position, source, scale, maxFrames, offset);

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

    this.ctx.fillRect(
      this.attackBox.position.x,
      this.attackBox.position.y,
      this.attackBox.width,
      this.attackBox.height,
    );

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
    this.isAttacking = true;
  }

  takeHit(p: string) {
    this.health -= 10;

    this.setHealthBar(p, `${500 * (this.health / 100)}px`);

    if (this.health === 0) this.dead = true;
  }

  setHealthBar(p: string, width: string) {
    const bar = document.getElementById(`p${p}h`);
    bar.style.width = width;
  }
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
