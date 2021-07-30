import { config } from "./game.js";
export default class instructionsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'instructionsScene', active: false });
    }
    preload() {
        //this.load.image('controlKeys', 'assets/img/controlKeys.png');
        this.load.image('controlKeys', 'assets/img/anleitung.png');
        //this.load.image('instructionsMenuTop', 'assets/img/menuTop.png');
        this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    }
    create() {
        this.instructionsMenu = this.add.image(config.width / 2, config.height / 2, 'instructionsMenuTop').setOrigin(0.5, 0.5);
        this.introMenuHeader = this.add.text(config.width / 2, this.instructionsMenu.getTopRight().y + 19, 'Anleitung', { fontFamily: 'mainfont', fontSize: '13px', color: '#62232f', stroke: '#62232f', align: 'center' }).setOrigin(0.5, 0.5);
        var introTextStyle = { fontFamily: 'mainfont', fontSize: '13px', color: '#fffbed', stroke: '#62232f', align: 'left', wordWrap: { width: 350 } };

        this.controlsMenuHeader = this.add.text(config.width / 2, this.instructionsMenu.getTopRight().y + 19, 'Game Controls', { fontFamily: 'mainfont', fontSize: '13px', color: '#62232f', stroke: '#62232f', align: 'center' }).setOrigin(0.5, 0.5).setVisible(0);
        this.movementKeysIcon = this.add.image(config.width / 2, config.height / 2 - 63, 'controlKeys').setVisible(1);
        this.movementText = this.add.text(config.width / 2 + 40, config.height / 2 - 55, 'Pfeil schießen').setStyle(introTextStyle).setVisible(1).setOrigin(0.5, 0.5);
        this.movementText = this.add.text(config.width / 2 + 20, config.height / 2 - 15, 'Schwerthieb').setStyle(introTextStyle).setVisible(1).setOrigin(0.5, 0.5);
        this.movementText = this.add.text(config.width / 2, config.height / 2 + 25, 'Ultimate').setStyle(introTextStyle).setVisible(1).setOrigin(0.5, 0.5);
        this.movementText = this.add.text(config.width / 2 + 55, config.height / 2 + 65, 'Interaktionstaste').setStyle(introTextStyle).setVisible(1).setOrigin(0.5, 0.5);
        this.movementText = this.add.text(config.width / 2, config.height / 2 - 200, 'Bewegen:').setStyle(introTextStyle).setVisible(1).setOrigin(0.5, 0.5);
        this.movementText = this.add.text(config.width / 2, config.height / 2 - 255, 'Anleitung').setStyle(introTextStyle).setVisible(1).setOrigin(0.5, 0.5);
        this.movementText = this.add.text(config.width / 2, config.height / 2 + 115, 'Enter um zu starten').setStyle(introTextStyle).setVisible(1).setOrigin(0.5, 0.5);
        this.keyObj = this.input.keyboard.addKey('ENTER');
    }

    addItem(item) {
        // TODO
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keyObj)) {
            this.scene.remove();
        }
    }
}