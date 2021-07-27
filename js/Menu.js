export default class Menu extends Phaser.Scene {
    constructor() {
        super("mainMenu");
    }

    preload() {
        // Menu bg
        this.load.image('menubg', 'assets/img/menubg.jpg');

        // Regen
        this.load.image('rain1', 'assets/tilesets/rain/regen-frame1.png');
        this.load.image('rain2', 'assets/tilesets/rain/regen-frame2.png');
        this.load.image('rain3', 'assets/tilesets/rain/regen-frame3.png');
        this.load.image('rain4', 'assets/tilesets/rain/regen-frame4.png');
        this.load.image('rain5', 'assets/tilesets/rain/regen-frame5.png');
        this.load.image('rain6', 'assets/tilesets/rain/regen-frame6.png');
        this.load.image('rain7', 'assets/tilesets/rain/regen-frame7.png');
        this.load.image('rain8', 'assets/tilesets/rain/regen-frame8.png');
        this.load.image('rain9', 'assets/tilesets/rain/regen-frame9.png');
        this.load.image('rain10', 'assets/tilesets/rain/regen-frame10.png');
        this.load.image('rain11', 'assets/tilesets/rain/regen-frame11.png');
        this.load.image('rain12', 'assets/tilesets/rain/regen-frame12.png');
        this.load.image('rain13', 'assets/tilesets/rain/regen-frame13.png');
        this.load.image('rain14', 'assets/tilesets/rain/regen-frame14.png');
        this.load.image('rain15', 'assets/tilesets/rain/regen-frame15.png');
        this.load.image('rain16', 'assets/tilesets/rain/regen-frame16.png');
        this.load.image('rain17', 'assets/tilesets/rain/regen-frame17.png');
        this.load.image('rain18', 'assets/tilesets/rain/regen-frame18.png');
        this.load.image('rain19', 'assets/tilesets/rain/regen-frame19.png');
        this.load.image('rain20', 'assets/tilesets/rain/regen-frame20.png');
        this.load.image('rain21', 'assets/tilesets/rain/regen-frame21.png');

        // Lichter
        this.load.image('light1', 'assets/tilesets/light/lichter-frame1.png');
        this.load.image('light2', 'assets/tilesets/light/lichter-frame2.png');
        this.load.image('light3', 'assets/tilesets/light/lichter-frame3.png');
        this.load.image('light4', 'assets/tilesets/light/lichter-frame4.png');
        this.load.image('light5', 'assets/tilesets/light/lichter-frame5.png');
        this.load.image('light6', 'assets/tilesets/light/lichter-frame6.png');
        this.load.image('light7', 'assets/tilesets/light/lichter-frame7.png');
        this.load.image('light8', 'assets/tilesets/light/lichter-frame8.png');
        this.load.image('light9', 'assets/tilesets/light/lichter-frame9.png');
        this.load.image('light10', 'assets/tilesets/light/lichter-frame10.png');
        this.load.image('light11', 'assets/tilesets/light/lichter-frame11.png');
        this.load.image('light12', 'assets/tilesets/light/lichter-frame12.png');
        this.load.image('light13', 'assets/tilesets/light/lichter-frame13.png');
        this.load.image('light14', 'assets/tilesets/light/lichter-frame14.png');
        this.load.image('light15', 'assets/tilesets/light/lichter-frame15.png');
        this.load.image('light16', 'assets/tilesets/light/lichter-frame16.png');
        this.load.image('light17', 'assets/tilesets/light/lichter-frame17.png');
        this.load.image('light18', 'assets/tilesets/light/lichter-frame18.png');
        this.load.image('light19', 'assets/tilesets/light/lichter-frame19.png');
        this.load.image('light20', 'assets/tilesets/light/lichter-frame20.png');
        this.load.image('light21', 'assets/tilesets/light/lichter-frame21.png');
        this.load.image('light22', 'assets/tilesets/light/lichter-frame22.png');

        // Logo
        this.load.image('logo1', 'assets/tilesets/logo/tnq-frame1.png');
        this.load.image('logo2', 'assets/tilesets/logo/tnq-frame2.png');
        this.load.image('logo3', 'assets/tilesets/logo/tnq-frame3.png');
        this.load.image('logo4', 'assets/tilesets/logo/tnq-frame4.png');
        this.load.image('logo5', 'assets/tilesets/logo/tnq-frame5.png');
        this.load.image('logo6', 'assets/tilesets/logo/tnq-frame6.png');
        this.load.image('logo7', 'assets/tilesets/logo/tnq-frame7.png');
        this.load.image('logo8', 'assets/tilesets/logo/tnq-frame8.png');
        this.load.image('logo9', 'assets/tilesets/logo/tnq-frame9.png');
        this.load.image('logo10', 'assets/tilesets/logo/tnq-frame10.png');
        this.load.image('logo11', 'assets/tilesets/logo/tnq-frame11.png');

        // Slime

        this.load.image('slime1', 'assets/tilesets/slimebg/schleim-frame1.png');
        this.load.image('slime2', 'assets/tilesets/slimebg/schleim-frame2.png');
        this.load.image('slime3', 'assets/tilesets/slimebg/schleim-frame3.png');
        this.load.image('slime4', 'assets/tilesets/slimebg/schleim-frame4.png');
        this.load.image('slime5', 'assets/tilesets/slimebg/schleim-frame5.png');
        this.load.image('slime6', 'assets/tilesets/slimebg/schleim-frame6.png');
        this.load.image('slime7', 'assets/tilesets/slimebg/schleim-frame7.png');
        this.load.image('slime8', 'assets/tilesets/slimebg/schleim-frame8.png');
        this.load.image('slime9', 'assets/tilesets/slimebg/schleim-frame9.png');
        this.load.image('slime10', 'assets/tilesets/slimebg/schleim-frame10.png');
        this.load.image('slime11', 'assets/tilesets/slimebg/schleim-frame11.png');
        this.load.image('slime12', 'assets/tilesets/slimebg/schleim-frame12.png');
    }


    create() {
        this.audioManager = this.scene.get('audioManager');
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;

        this.anims.create({
            key: 'rain',
            frames: [
                { key: 'rain1' },
                { key: 'rain2' },
                { key: 'rain3' },
                { key: 'rain4' },
                { key: 'rain5' },
                { key: 'rain6' },
                { key: 'rain7' },
                { key: 'rain8' },
                { key: 'rain9' },
                { key: 'rain10' },
                { key: 'rain11' },
                { key: 'rain12' },
                { key: 'rain13' },
                { key: 'rain14' },
                { key: 'rain15' },
                { key: 'rain16' },
                { key: 'rain17' },
                { key: 'rain18' },
                { key: 'rain19' },
                { key: 'rain20' },
                { key: 'rain21' }
            ],
            frameRate: 21,
            repeat: -1
        });

        this.anims.create({
            key: 'light',
            frames: [
                { key: 'light1' },
                { key: 'light2' },
                { key: 'light3' },
                { key: 'light4' },
                { key: 'light5' },
                { key: 'light6' },
                { key: 'light7' },
                { key: 'light8' },
                { key: 'light9' },
                { key: 'light10' },
                { key: 'light11' },
                { key: 'light12' },
                { key: 'light13' },
                { key: 'light14' },
                { key: 'light15' },
                { key: 'light16' },
                { key: 'light17' },
                { key: 'light18' },
                { key: 'light19' },
                { key: 'light20' },
                { key: 'light21' },
                { key: 'light22' }
            ],
            frameRate: 22,
            repeat: -1
        });

        this.anims.create({
            key: 'logo',
            frames: [
                { key: 'logo1' },
                { key: 'logo2' },
                { key: 'logo3' },
                { key: 'logo4' },
                { key: 'logo5' },
                { key: 'logo6' },
                { key: 'logo7' },
                { key: 'logo8' },
                { key: 'logo9' },
                { key: 'logo10' },
                { key: 'logo11' }
            ],
            frameRate: 11,
            repeatDelay: 3000,
            repeat: -1
        });

        this.anims.create({
            key: 'slime',
            frames: [
                { key: 'slime1' },
                { key: 'slime2' },
                { key: 'slime3' },
                { key: 'slime4' },
                { key: 'slime5' },
                { key: 'slime6' },
                { key: 'slime7' },
                { key: 'slime8' },
                { key: 'slime9' },
                { key: 'slime10' },
                { key: 'slime11' },
                { key: 'slime12' }
            ],
            frameRate: 8,
            repeat: 0
        });

        this.menuBg = this.add.sprite(640, 360, 'menubg');
        this.slime = this.add.sprite(640, 360, 'slime1').play('slime');
        this.light = this.add.sprite(640, 360, 'light1').play('light');
        this.rain = this.add.sprite(640, 360, 'rain1').play('rain');
        this.rain.setAlpha(0.2);
        this.logo = this.add.sprite(640, 360, 'logo1').play('logo');
        //this.slime.setScale(2)

        const startButton = this.add.text(1280 / 2, 360, "Start Game", { color: '#664879' }).setFontFamily('mainfont');
        startButton.setOrigin(0.5);
        startButton.setFontSize(25);
        startButton.setInteractive({ useHandCursor: true });

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

        console.log(this.audioManager.musicConfig);

        
        this.startGameSound = this.sound.add("startGame");

        // Einmal in der Scene
        this.audioManager = this.scene.get('audioManager');
        // Für jeden Sound
        this.bgMusic = this.sound.add("menuMusic");
        this.bgMusic.play(this.audioManager.musicConfig);

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
    }
}
