export class Player {
  constructor(game) {
    this.game = game;
    this.height = 100;
    this.width = 91.3;
    this.x = 0;
    // game object position game height - canvas height
    this.y = this.game.height - this.height;
    //images
    this.image = player; //html image id
    this.speed = 0;
    this.maxSpeed = 2;
    this.vy = 0;
    this.weight = 2;
    this.inputRef = null;
  }

  update(input) {
    //horizontal movement
    this.inputRef = input;
    this.x += this.speed;
    if (input.includes('ArrowRight')) this.speed = this.maxSpeed;
    else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
    else {
      this.speed = 0;
    }

    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;

    // vertical movement
    if (input.includes('ArrowUp') && this.onGround()) this.vy -= 20; //jump height
    this.y += this.vy;
    if (!this.onGround()) this.vy += this.weight;
    else this.vy = 0;
  }

  draw(context) {
    if (
      this.inputRef !== null &&
      (this.inputRef.includes('ArrowLeft') ||
        this.inputRef.includes('ArrowRight'))
    )
      this.image.src = `../images/run/rr_${this.pad(this.x / 10)}.png`;
    else {
      this.image.src = `../images/jump/l_${this.pad(this.y / 10)}.png`;
    }
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  onGround() {
    return this.y >= this.game.height - this.height;
  }

  pad(num) {
    num = parseInt(num);

    if (num > 20) num = parseInt(num % 20);
    num = num.toString();

    while (num.length < 3) num = '0' + num;

    return num;
  }
}
