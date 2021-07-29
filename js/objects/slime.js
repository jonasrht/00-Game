import Item from "./item.js";

const UP = 0;
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;

export default class Slime extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.allowGravity = false;
    this.body.immovable = true;
    this.body.setSize(16, 16, true);
    this.setCollideWorldBounds(true);
    this.body.onWorldBounds = true;
    this.create();
    this.health = 3;
    this.direction = Phaser.Math.Between(0, 3);
    this.scene = scene;
    scene.physics.world.on(
      Phaser.Physics.Arcade.Events.TILE_COLLIDE,
      this.handleCollide,
      this
    );
    this.moveEvent = scene.time.addEvent({
      delay: Phaser.Math.Between(1500, 3000),
      callback: () => {
        this.handleCollide();
      },
      loop: true,
    });
  }

  destroy() {
    this.moveEvent.destroy();
    super.destroy();
    const slimeSound = Phaser.Math.Between(0, 1);
    if (slimeSound == 0) {
      this.slime1.play();
    } else {
      this.slime2.play();
    }
  }

  handleCollide() {
    const newDirection = Phaser.Math.Between(0, 3);
    this.direction = newDirection;
  }

  create() {
    this.createAnims();
    this.setPipeline("Light2D");
    this.anims.play("slimeDown");

    this.target = this.scene.player;
    this.slime1 = this.scene.sound.add("slime1");
    this.slime2 = this.scene.sound.add("slime2");
  }

  createAnims() {
    this.anims.create({
      key: "slimeUp",
      frames: this.anims.generateFrameNames("slime", {
        frames: ["slimenachoben2.png", "slimenachoben3.png"],
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "slimeDown",
      frames: this.anims.generateFrameNames("slime", {
        frames: ["slimenachunten2.png", "slimenachunten3.png"],
      }),
      frameRate: 6,
      repeat: -1,
    });
  }

  pushBack() {
    if (this.scene.player.direction === "right") {
      this.body.x = this.body.x + 20;
    }
    if (this.scene.player.direction === "left") {
      this.body.x = this.body.x - 20;
    }
    if (this.scene.player.direction === "up") {
      this.body.y = this.body.y - 20;
    }
    if (this.scene.player.direction === "down") {
      this.body.y = this.body.y + 20;
    }
  }

  itemDrop(slime, scene) {
    this.number = Phaser.Math.Between(0, 100);
    if (this.number > 0 && this.number < 11) {
      this.item = new Item(scene, slime.x, slime.y, "heartIcon");
    }
    if (this.number > 11 && this.number < 18) {
      console.log("Leben");
      this.item = new Item(scene, slime.x, slime.y, "arrow");
    }
    if (this.number > 20 && this.number < 40) {
      console.log("Coin");
      this.item = new Item(scene, slime.x, slime.y, "coinIcon");
    }
  }

  update(slime, scene) {
    const speed = 50;
    if (slime.health > 0) {
      switch (slime.direction) {
        case UP:
          slime.setVelocity(0, -speed);
          break;
        case DOWN:
          slime.setVelocity(0, speed);
          break;
        case RIGHT:
          slime.setVelocity(speed, 0);
          break;
        case LEFT:
          slime.setVelocity(-speed, 0);
          break;
        default:
          break;
      }
    }

    if (slime.health == 0) {
      slime.health = slime.health - 1;
      this.itemDrop(slime, scene);
    }
    this.distance = Phaser.Math.Distance.BetweenPoints(this.target, this);
    if (this.distance < 50 && slime.health > 0) {
      this.rotation = Phaser.Math.Angle.Between(
        this.x,
        this.y,
        this.target.x,
        this.target.y
      );
      scene.physics.velocityFromRotation(this.rotation, 50, this.body.velocity);
    }
  }
}
