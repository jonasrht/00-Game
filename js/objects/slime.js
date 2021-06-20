import Item from "./item.js";

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
        this.create();
        this.health = 3;
    }

    create() {
        
        this.target = this.scene.player;
    }

    itemDrop(slime, scene) {
        this.item = new Item(scene, slime.x, slime.y);
    }

    update(slime, scene) {
        if (slime.health == 0) {
            slime.health = slime.health - 1
            this.itemDrop(slime, scene);
        }
        this.distance = Phaser.Math.Distance.BetweenPoints(this.target, this)
        if (this.distance < 150 && (slime.health > 0)) {
            this.rotation = Phaser.Math.Angle.Between(this.x, this.y, this.target.x, this.target.y);
            scene.physics.velocityFromRotation(this.rotation, 50, this.body.velocity)
        }
    }
}
