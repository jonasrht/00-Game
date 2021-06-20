export default class Item extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y){
        super(scene, x, y, "arrow");
        scene.add.existing(this);
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.create(scene);
    }

    create(scene) {
        this.scene.physics.add.collider(this, this.scene.player, () => {
            scene.invScene.itemToInventory(this);
            this.destroy();
        });
    }

}