import { Player } from './player.js'
import { InputHandler } from './input.js'
window.addEventListener('load', function () {
  //select canvas from html
  const canvas = document.getElementById('canvas1')
  //get 2D view
  const ctx = canvas.getContext('2d')
  //set canvas height and width
  canvas.width = 500
  canvas.height = 500

  class Game {
    constructor(height, width) {
      this.height = height
      this.width = width
      this.player = new Player(this) //passed game object
      this.input = new InputHandler()
    }

    // to make calculation
    update() {
      this.player.update(this.input.keys)
    }

    //to draw images on canvas
    draw(context) {
      this.player.draw(context)
    }
  }
  const game = new Game(canvas.width, canvas.height)
  console.log(game)

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    game.update()
    game.draw(ctx)
    requestAnimationFrame(animate)
  }

  animate()
})
