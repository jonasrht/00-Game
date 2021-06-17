import Player from "./objects/Player.js";
import Slime from "./objects/slime.js";

export default class Arrow extends Phaser.GameObjects.Sprite {
  constructor(scene, direction) {
    var x = scene.player.x;
    var y = scene.player.y;

    super(scene, x, y, "arrow");
    scene.projectiles.add(this);
    scene.add.existing(this);

    this.play("arrow_anim");
    scene.physics.world.enableBody(this);
    this.create(scene);
    if (direction) this.direction = direction;
  }

  create(scene) {
    scene.physics.add.collider(this, scene.worldLayer, (arrow, worldLayer) => {
      this.destroy();
      scene.counterArrow += 1;
      scene.projectiles.remove(this);
    });

    scene.physics.add.collider(this, scene.slimeGroup, (arrow, slime) => {
      slime.health = slime.health - 1;
      if (slime.health == 0) {
        slime.destroy();
      }

      this.destroy();

      scene.counterArrow += 1;
    });

    this.cursors = this.scene.input.keyboard.createCursorKeys(); //For the Arrow Keys
  }

  update() {
    if (this.alreadyShooted != true) {
      this.alreadyShooted = true;
      if (this.direction == "left") this.body.velocity.y = 0;
      this.body.velocity.x = -250;
      this.angle = 270;
    }
    if (this.direction == "right") {
      this.body.velocity.y = 0;
      this.body.velocity.x = 250;
      this.angle = 90;
    }
    if (this.direction == "up") {
      this.body.velocity.y = -250;
      this.body.velocity.x = 0;
      this.angle = 0;
    }
    if (this.direction == "down") {
      this.body.velocity.y = 250;
      this.body.velocity.x = 0;
      this.angle = 180;
    }
  }
}
