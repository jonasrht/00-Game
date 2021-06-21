export default class Menu extends Phaser.Scene {
    constructor() {
        super("mainMenu");
    }

    preload() {

    }


    create() {
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;

        this.bg = this.add.tileSprite(0, 0, 1280 * 2, 720 * 2, "bg");
        this.bg1 = this.add.tileSprite(0, 0, 1280 * 2, 720 * 2, "bg1");
        this.bg2 = this.add.tileSprite(0, 0, 1280 * 2, 720 * 2, "bg2");
        this.bg3 = this.add.tileSprite(0, 0, 1280 * 2, 720 * 2, "bg3");

        this.add.text(20, 20, "Menu")
        const startButton = this.add.text(1280 / 2, 360, "Start Game").setFontFamily('mainfont');
        startButton.setOrigin(0.5);
        startButton.setFontSize(50);
        startButton.setInteractive();

        //Audio
        var musicConfig = {
            mute: false,
            volume: 0,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }

        this.bgMusic = this.sound.add("menuMusic");
        this.startGameSound = this.sound.add("startGame");
        this.bgMusic.play(musicConfig);

        startButton.on('pointerover', () => { });

        startButton.on('pointerdown', () => {
            this.startScene()
        });
    }

    startScene() {
        this.bgMusic.pause();
        this.startGameSound.play({ volume: 0.1 });
        this.scene.start('selectPlayerScene');

    }

    update() {
        this.bg1.tilePositionX += 0.05;
        this.bg2.tilePositionX += 0.1;
        this.bg3.tilePositionX += 0.13;
    }
}