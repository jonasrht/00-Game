export default class Menu extends Phaser.Scene {
    constructor() {
        super("mainMenu");
    }
    preload() {
        console.log();
    }


    create() {
        console.log("Hallo");
        this.add.text(20, 20, "Menu")
        const startButton = this.add.text(960 / 2, 320, "Start").setOrigin(0.5);
        startButton.setInteractive();
        startButton.on('pointerdown', () => { this.scene.start('MainScene'); });
    }
}