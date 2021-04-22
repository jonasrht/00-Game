export default class Menu extends Phaser.Scene {
    constructor() {
        super("mainMenu");
    }

    preload() {

    }


    create() {
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        console.log(windowWidth, windowHeight);
        this.bg = this.add.tileSprite(0, 0, 1280 * 2, 720 * 2, "bg");
        //this.bg.setOrigin(0, 0);
        //this.bg.setDisplaySize(windowWidth, windowHeight)


        this.bg1 = this.add.tileSprite(0, 0, 1280 * 2, 720 * 2, "bg1");
        //this.bg1.setOrigin(0, 0);
        //this.bg1.setDisplaySize(windowWidth, windowHeight)



        this.bg2 = this.add.tileSprite(0, 0, 1280 * 2, 720 * 2, "bg2");
        //this.bg2.setOrigin(0, 0);
        //this.bg2.setDisplaySize(windowWidth, windowHeight)

        this.bg3 = this.add.tileSprite(0, 0, 1280 * 2, 720 * 2, "bg3");
        //this.bg3.setOrigin(0, 0);
        //this.bg3.setDisplaySize(windowWidth, windowHeight)


        console.log("Hallo");
        this.add.text(20, 20, "Menu")
        const startButton = this.add.text(1280 / 2, 360, "Start Game").setOrigin(0.5);
        startButton.setFontSize('50px');
        startButton.setFont('"Press Start 2P"')
        startButton.setInteractive();


        //Audio
        var musicConfig = {
            mute: false,
            volume: 0.1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.bgMusic = this.sound.add("menuMusic");
        this.bgMusic.play(musicConfig);

        startButton.on('pointerdown', () => {
            // this.bgMusic.stop();
            // this.scene.start('villageScene');
            this.startScene()
        });//() => { this.scene.start('villageScene'); });
    }

    startScene() {
        this.bgMusic.pause();
        this.scene.start('villageScene');
    }

    update() {
        this.bg1.tilePositionX += 0.1;
        this.bg2.tilePositionX -= 0.05;
        this.bg3.tilePositionX += 0.1;
    }
}