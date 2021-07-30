export default class bewohner extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setImmovable(true);
    this.setScale(0.5);
    this.setBounce(1, 1);
    this.body.setSize(30, 40, true);
    this.setScale(0.5); // Skalierung des Sprites
    this.setOffset(0, 24);
    this.setCollideWorldBounds(true);
    this.create(texture);
    this.scene = scene;
    this.texture = texture;
  }

  create(texture) {
    if (texture != "buergermeister") {
      const anims = this.anims;
      anims.create({
        key: "misa-left-walk",
        frames: anims.generateFrameNames(texture, {
          prefix: "misa-left-walk.",
          start: 0,
          end: 3,
          zeroPad: 3,
        }),
        frameRate: 10,
        repeat: -1,
      });
      anims.create({
        key: "misa-right-walk",
        frames: anims.generateFrameNames(texture, {
          prefix: "misa-right-walk.",
          start: 0,
          end: 3,
          zeroPad: 3,
        }),
        frameRate: 10,
        repeat: -1,
      });
      anims.create({
        key: "misa-front-walk",
        frames: anims.generateFrameNames(texture, {
          prefix: "misa-front-walk.",
          start: 0,
          end: 3,
          zeroPad: 3,
        }),
        frameRate: 10,
        repeat: -1,
      });
      anims.create({
        key: "misa-back-walk",
        frames: anims.generateFrameNames(texture, {
          prefix: "misa-back-walk.",
          start: 0,
          end: 3,
          zeroPad: 3,
        }),
        frameRate: 10,
        repeat: -1,
      });

      this.anims.play("misa-front-walk");
      this.anims.stop();
    }

    if (this.texture.key == "bewohner1") {
      this.zumStrand = this.scene.tweens.add({
        targets: this,
        onStart: function (tween, targets) {
          targets[0].anims.play("misa-front-walk");
        },
        onYoyo: function (tween, target) {
          target.anims.play("misa-back-walk");
        },
        onRepeat: (tween, target) => {
          target.anims.play("misa-front-walk");
        },
        delay: 900,
        duration: 4500,
        repeat: -1,
        yoyo: true,
        y: 470,
      });
    }
    if (this.texture.key == "bewohner2") {
      this.zumStrand = this.scene.tweens.add({
        targets: this,
        onStart: function (tween, targets) {
          targets[0].anims.play("misa-right-walk");
        },
        onYoyo: function (tween, target) {
          target.anims.play("misa-left-walk");
        },
        onRepeat: (tween, target) => {
          target.anims.play("misa-right-walk");
        },
        delay: 1600,
        duration: 3500,
        repeat: -1,
        yoyo: true,
        x: 365,
      });
    }
    if (this.texture.key == "bewohner3") {
      this.zumStrand = this.scene.tweens.add({
        targets: this,
        onStart: function (tween, targets) {
          targets[0].anims.play("misa-right-walk");
        },
        onYoyo: function (tween, target) {
          target.anims.play("misa-left-walk");
        },
        onRepeat: (tween, target) => {
          target.anims.play("misa-right-walk");
        },
        delay: 1600,
        duration: 3500,
        repeat: -1,
        yoyo: true,
        x: 780,
      });
    }
  }
}
