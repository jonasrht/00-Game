//init activeItem in global namespace
var activeItem = '';
var activeBuyOrSell = '';
var activeBuyOrSellSign = '';

export default class shopScene extends Phaser.Scene {
    constructor() {
        super({ key: 'shopScene', active: false });
    }

    preload() {

    }

    create() {
        console.log("Willkommen im Shop");

        this.buttonSound = this.sound.add("buttonSound");

        // Get von anderen Scenen
        var uiScene = this.scene.get('uiScene');
        var invScene = this.scene.get('inventoryScene');


        // Exit Button
        this.exitButton = this.add.image(718, 84, 'exitButton').setInteractive({ useHandCursor: true });
        this.exitButton.on('pointerdown', function (pointer) {
            this.buttonSound.play();
            uiScene.removeHeart();
            this.scene.stop().resume('homeScene');
        }, this);

        var buyButtons = []

        // Shop Text
        this.menuTop = this.add.image(600, 260, 'MenuTop');
        this.shopHeader = this.add.text(599, 90, 'SHOP', { fontFamily: 'mainfont', fontSize: '13px', color: '#62232f', stroke: '#62232f', align: 'center' }).setOrigin(0.5, 0.5);
        this.itemsHeader = this.add.text(463, 125, 'Item           Wt. Preis', { fontFamily: 'mainfont', fontSize: '13px', color: '#fffbed', stroke: '#62232f', align: 'center' });

        // Herzen
        this.hearts = this.add.image(490, 167, 'heartIcon').setScale(1.5);
        this.itemsHeader = this.add.text(463, 160, '               1    10$', { fontFamily: 'mainfont', fontSize: '13px', color: '#fffbed', stroke: '#62232f', align: 'center' });
        this.hearts.setInteractive({ useHandCursor: true });
        this.hearts.on('pointerdown', function (pointer) {
            uiScene.addHeart();
            //uiScene.money = uiScene.money - 10;
            uiScene.updateMoney(-10);
        }, this);
    }

    update() {

    }
}