export class Sprite {
  constructor(
    public ctx: CanvasRenderingContext2D,
    public position: Coordinates,
    public source: string,
    public scale: number = 1,
    public maxFrames: number = 1,
    public offset: Coordinates = {
      x: 0,
      y: 0,
    },
  ) {
    // this.position = position;
    // this.scale = scale;
    // this.maxFrames = maxFrames;
    // this.offset = offset;
  }

  width = 50;
  height = 150;
  image = new Image();
  currentFrames = 0;
  elapsedFrames = 0;
  holdFrames = 5;

  private loadImage() {
    // console.log(new URL(this.source, import.meta.url).toString());
    this.image.src = new URL(this.source, import.meta.url).toString();
  }

  render() {
    this.loadImage();
    this.ctx.drawImage(
      this.image,
      this.currentFrames * (this.image.width / this.maxFrames),
      0,
      this.image.width / this.maxFrames,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.image.width / this.maxFrames) * this.scale,
      this.image.height * this.scale,
    );
  }

  animate() {
    this.elapsedFrames++;

    if (this.elapsedFrames % this.holdFrames === 0) {
      if (this.currentFrames < this.maxFrames - 1) this.currentFrames++;
      else this.currentFrames = 0;
    }
  }

  update() {
    this.render();
    this.animate();
  }
}

interface Coordinates {
  x: number;
  y: number;
}
