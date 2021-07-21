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
        this.scene = scene;
    }

    create() {
        console.log(this);
        this.target = this.scene.player;
    }

    pushBack() {
        if (this.scene.player.direction === 'right') {
            this.body.x = this.body.x + 20;
        }
        if (this.scene.player.direction === 'left') {
            this.body.x = this.body.x - 20;
        }
        if (this.scene.player.direction === 'up') {
            this.body.y = this.body.y - 20;
        }
        if (this.scene.player.direction === 'down') {
            this.body.y = this.body.y + 20;
        }
    }

    itemDrop(slime, scene) {
        this.number = Phaser.Math.Between(0, 100);
        console.log(this.number);
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
