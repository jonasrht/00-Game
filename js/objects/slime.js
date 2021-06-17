export default class Slime extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.allowGravity = false;
        this.body.immovable = true;
        this.body.setSize(18, 18, true);
        this.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }
}