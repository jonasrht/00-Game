export default class schmiedScene extends Phaser.Scene {
    constructor() {
        super({ key: 'schmiedScene', active: false });
    }

    preload() {

    }

    create() {

        this.buttonSound = this.sound.add("buttonSound");
        this.shopSound = this.sound.add('shopsound');

        // Get von anderen Scenen
        var uiScene = this.scene.get('uiScene');
        var invScene = this.scene.get('inventoryScene');
        var homeScene = this.scene.get('homeScene');

        // Exit Button
        this.exitButton = this.add.image(718, 84, 'exitButton').setInteractive({ useHandCursor: true });
        this.exitButton.on('pointerdown', function (pointer) {
            this.buttonSound.play();
            this.scene.stop().resume('homeScene');
        }, this);

        // Shop Text
        this.menuTop = this.add.image(600, 260, 'MenuTop');
        this.shopHeader = this.add.text(599, 90, 'SCHMIED', { fontFamily: 'mainfont', fontSize: '13px', color: '#62232f', stroke: '#62232f', align: 'center' }).setOrigin(0.5, 0.5);
        this.itemsHeader = this.add.text(463, 125, 'Schwerter           Preis', { fontFamily: 'mainfont', fontSize: '13px', color: '#fffbed', stroke: '#62232f', align: 'center' });

        // Schwert upgrade 1
        this.hearts = this.add.image(490, 167, 'schwertSchmied').setScale(1.5);
        this.itemsHeader = this.add.text(463, 160, '      +1 Stärke     30$', { fontFamily: 'mainfont', fontSize: '13px', color: '#fffbed', stroke: '#62232f', align: 'center' });
        this.hearts.setInteractive({ useHandCursor: true });
        this.hearts.on('pointerdown', function (pointer) {
            if (uiScene.money >= 30) {
                uiScene.addHeart();
                uiScene.updateMoney(-30);
                homeScene.player.strength += 1;
                this.shopSound.play();
            } else {
                // TODO: Error für zu wenig Geld
            }

        }, this);

        // Schwert upgrade 1
        this.trankPower = this.add.image(490, 217, 'schwert2Schmied').setScale(1.5);
        this.itemsHeader = this.add.text(463, 210, '      +2 Stärke     30$', { fontFamily: 'mainfont', fontSize: '13px', color: '#fffbed', stroke: '#62232f', align: 'center' });
        this.trankPower.setInteractive({ useHandCursor: true });
        this.trankPower.on('pointerdown', function (pointer) {
            if (uiScene.money >= 1) {
                invScene.itemFromShop('trankPower');
                uiScene.updateMoney(-1);
                this.shopSound.play();
            } else {
                // TODO: Error für zu wenig Geld
            }

        }, this);
    }
}