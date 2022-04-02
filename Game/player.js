export class Player {
  constructor(game) {
    this.game = game
    this.height = 100
    this.width = 91.3
    this.x = 0
    // game object position game height - canvas height
    this.y = this.game.height - this.height
    //images
    this.image = player //html image id
    this.speed = 0
    this.maxSpeed = 10
    this.vy = 0
    this.weight = 1
  }

  update(input) {
    //horizontal movement
    this.x += this.speed
    if (input.includes('ArrowRight')) this.speed = this.maxSpeed
    else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed
    else {
      this.speed = 0
    }

    if (this.x < 0) this.x = 0
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width

    // vertical movement
    if (input.includes('ArrowUp') && this.onGround()) this.vy -= 20 //jump height
    this.y += this.vy
    if (!this.onGround()) this.vy += this.weight
    else this.vy = 0
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height)
  }

  onGround() {
    return this.y >= this.game.height - this.height
  }
}
