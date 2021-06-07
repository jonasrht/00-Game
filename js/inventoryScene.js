export default class inventoryScene extends Phaser.Scene {
    constructor() {
        super({ key: 'inventoryScene', active: false });
    }

    preload() {
        this.load.image("mapIcon", "assets/img/mapIcon.png");
    }

    create() {
        this.buttonSound = this.sound.add("buttonSound");
        // Exit Button
        this.exitButton = this.add.image(718, 84, 'exitButton').setInteractive({ useHandCursor: true });
        this.exitButton.on('pointerdown', function (pointer) {
            this.buttonSound.play();
            this.scene.stop().resume('uiScene');
        }, this);

        // Map Button
        this.mapButton = this.add.image(830, 120, 'mapIcon').setInteractive({ useHandCursor: true }).setScale(2.5);
        this.mapButton.on('pointerdown', function (pointer) {
            this.mapMenu = this.add.image(600, 260, 'MenuMapTop');
            this.mapHeader = this.add.text(599, 90, 'KARTE', { fontFamily: 'mainfont', fontSize: '13px', color: '#62232f', stroke: '#62232f', align: 'center' }).setOrigin(0.5, 0.5);
            this.mapButton.alpha = 0;
        }, this);

        // Menu Bg
        this.menuTop = this.add.image(600, 260, 'MenuTop');
        this.invHeader = this.add.text(599, 90, 'INVENTAR', { fontFamily: 'mainfont', fontSize: '13px', color: '#62232f', stroke: '#62232f', align: 'center' }).setOrigin(0.5, 0.5);
    }

    update() {

    }
}