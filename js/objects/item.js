export default class Item extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.itemID = texture;
        this.scene = scene
        this.create(scene);
    }

    create(scene) {
        this.scene.physics.add.collider(this, this.scene.player, () => {
            
            if (this.itemID === "heartIcon") {
                this.heartItem();
            } else if (this.itemID === "coinIcon") {
                this.coinItem();
            } else {
                scene.invScene.itemToInventory(this);
            }
            this.destroy();
        });

    }

    heartItem() {
        this.scene.uiScene.addHeart();
    }

    coinItem() {
        this.scene.uiScene.updateMoney(10);
    }
}