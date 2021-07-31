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
        console.log(this.itemID);
        if (this.itemID === 'coinIcon') {
            this.scene.uiScene.updateMoney(10);
        } else {
            this.scene.physics.add.collider(this, this.scene.player, () => {
                scene.invScene.itemToInventory(this);
                if (this.itemID === "heartIcon") {
                    this.heartItem();
                }
                if (this.itemID === "coinIcon") {
                    this.coinItem();
                }
                this.destroy();
            });
        }

    }

    heartItem() {
        this.scene.uiScene.addHeart();
    }

    coinItem() {
        this.scene.uiScene.updateMoney(10);
    }
}