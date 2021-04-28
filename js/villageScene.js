import Npc from "./objects/npc.js";

let controls;
let cursors;

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

var content = 'Hi';


export default class villageScene extends Phaser.Scene {
    constructor() {
        super("villageScene");
    }
    init(data) {
        this.selectedCharacter = data.character;

        console.log("Data: ->" + data);
        if (data.name == "doorHomeBack") {
            this.spawnX = 105;
            this.spawnY = 280;
        } else if (data.name == "doorShopBack") {
            this.spawnX = 290;
            this.spawnY = 160;
        }
        else {
            this.spawnX = 10;
            this.spawnY = 10;
        }
    }

    preload() {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
        this.load.image('nextPage', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down-left.png');
    }

    create() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.coinEmitter = new Phaser.Events.EventEmitter();
        var spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        spaceBar.on('up', () => {
            console.log("space");
            this.coinEmitter.emit('coinCount');
        });

        this.scene.run('uiScene', { eventEmitter: this.coinEmitter });
        const map = this.make.tilemap({ key: "map" });
        // Tileset
        const tileset = map.addTilesetImage("Serene_Village_16x16", "tiles");
        const sTileset = map.addTilesetImage("tileset", "sTiles");

        // Tileset Ebenen
        const belowLayer = map.createLayer("bottom", [tileset, sTileset], 0, 0);
        const worldLayer = map.createLayer("world", [tileset, sTileset], 0, 0);
        //this.sys.AnimatedTiles.init(this.map);
        //this.sys.animatedTiles.init(map);
        worldLayer.setCollisionByProperty({ colides: true });
        this.createPlayer(this.spawnX, this.spawnY);
        const aboveLayer = map.createLayer("top", [tileset, sTileset], 0, 0);

        this.physics.add.collider(this.player, worldLayer);


        //Kamera
        const camera = this.cameras.main;
        camera.startFollow(this.player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        camera.setZoom(3.1);

        // NPC
        const npcs = this.physics.add.group({
            classType: Npc
        });

        npcs.get(20, 250, "npc");

        cursors = this.input.keyboard.createCursorKeys();

        this.door = map.createFromObjects('doors', 1);
        this.doors = this.add.group()
        this.door.forEach((door) => {
            this.physics.world.enable(door);
            door.body.allowGravity = false;
            door.body.immovable = true;
            this.doors.add(door);
        });


        // Tür nach Hause
        this.doorHome = map.createFromObjects('doors', { name: 'doorHome' });
        this.physics.world.enable(this.doorHome);

        this.physics.add.collider(this.player, this.doorHome, () => {
            this.switchScene('homeScene', this.doorHome[0].name)
        });

        // Tür zum Shop
        this.doorShop = map.createFromObjects('doors', { name: 'doorShop' });
        this.physics.world.enable(this.doorShop);

        this.physics.add.collider(this.player, this.doorShop, () => {
            this.switchScene('homeScene', this.doorShop[0].name)
        });

        this.wasd = this.input.keyboard.addKeys({
            esc: Phaser.Input.Keyboard.KeyCodes.ESC,
        })

        // createTextBox(this, 50, 50, {
        //     wrapWidth: 250,
        // })
        //     .start(content, 100);

        // createTextBox(this, 100, 400, {
        //     wrapWidth: 500,
        //     fixedWidth: 500,
        //     fixedHeight: 65,
        // })
        //     .start(content, 50);

    }
    switchScene(scene, name) {
        this.cameras.main.fadeOut(1000, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start(scene, { name, char: this.selectedCharacter })
        });
    }
    createPlayer(x, y) {
        // Erzeugt den Player
        this.player = this.physics.add.sprite(x, y, this.selectedCharacter, "misa-front");
        this.player.body.setSize(30, 50, true);
        this.player.body.velocity.x = -100;
        this.player.setScale(0.5); // Skalierung des Sprites
        //this.player.setSize(20, 40); // Hitbox

        // Animation
        const anims = this.anims;
        anims.create({
            key: "misa-left-walk",
            frames: anims.generateFrameNames(this.selectedCharacter, { prefix: "misa-left-walk.", start: 0, end: 3, zeroPad: 3 }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: "misa-right-walk",
            frames: anims.generateFrameNames(this.selectedCharacter, { prefix: "misa-right-walk.", start: 0, end: 3, zeroPad: 3 }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: "misa-front-walk",
            frames: anims.generateFrameNames(this.selectedCharacter, { prefix: "misa-front-walk.", start: 0, end: 3, zeroPad: 3 }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: "misa-back-walk",
            frames: anims.generateFrameNames(this.selectedCharacter, { prefix: "misa-back-walk.", start: 0, end: 3, zeroPad: 3 }),
            frameRate: 10,
            repeat: -1
        });
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(this.wasd.esc)) {
            console.log("esc");
            this.scene.start('mainMenu');
        }
        const speed = 175;
        this.player.body.setVelocity(0);
        const prevVelocity = this.player.body.velocity.clone();

        // Horizontal movement
        if (cursors.left.isDown) {
            this.player.body.setVelocityX(-100);
        } else if (cursors.right.isDown) {
            this.player.body.setVelocityX(100);
        }

        // Vertical movement
        if (cursors.up.isDown) {
            this.player.body.setVelocityY(-100);
        } else if (cursors.down.isDown) {
            this.player.body.setVelocityY(100);
        }

        // Normalize and scale the velocity so that player can't move faster along a diagonal
        this.player.body.velocity.normalize().scale(speed);

        if (cursors.left.isDown) {
            this.player.anims.play("misa-left-walk", true);
        } else if (cursors.right.isDown) {
            this.player.anims.play("misa-right-walk", true);
        } else if (cursors.up.isDown) {
            this.player.anims.play("misa-back-walk", true);
        } else if (cursors.down.isDown) {
            this.player.anims.play("misa-front-walk", true);
        } else {
            this.player.anims.stop();

            // If we were moving, pick and idle frame to use
            if (prevVelocity.x < 0) this.player.setTexture(this.selectedCharacter, "misa-left");
            else if (prevVelocity.x > 0) this.player.setTexture(this.selectedCharacter, "misa-right");
            else if (prevVelocity.y < 0) this.player.setTexture(this.selectedCharacter, "misa-back");
            else if (prevVelocity.y > 0) this.player.setTexture(this.selectedCharacter, "misa-front");
        }
    }


}

const GetValue = Phaser.Utils.Objects.GetValue;
var createTextBox = function (scene, x, y, config) {
    var wrapWidth = GetValue(config, 'wrapWidth', 0);
    var fixedWidth = GetValue(config, 'fixedWidth', 0);
    var fixedHeight = GetValue(config, 'fixedHeight', 0);
    var textBox = scene.rexUI.add.textBox({
        x: x,
        y: y,

        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY)
            .setStrokeStyle(2, COLOR_LIGHT),

        icon: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_DARK),

        // text: getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight),
        text: getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight),

        action: scene.add.image(0, 0, 'nextPage').setTint(COLOR_LIGHT).setVisible(false),

        space: {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20,
            icon: 10,
            text: 10,
        }
    })
        .setOrigin(0)
        .layout();

    textBox
        .setInteractive()
        .on('pointerdown', function () {
            var icon = this.getElement('action').setVisible(false);
            this.resetChildVisibleState(icon);
            if (this.isTyping) {
                this.stop(true);
            } else {
                this.typeNextPage();
            }
        }, textBox)
        .on('pageend', function () {
            if (this.isLastPage) {
                return;
            }

            var icon = this.getElement('action').setVisible(true);
            this.resetChildVisibleState(icon);
            icon.y -= 30;
            var tween = scene.tweens.add({
                targets: icon,
                y: '+=30', // '+=100'
                ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 500,
                repeat: 0, // -1: infinity
                yoyo: false
            });
        }, textBox)
    //.on('type', function () {
    //})

    return textBox;
}

var getBuiltInText = function (scene, wrapWidth, fixedWidth, fixedHeight) {
    return scene.add.text(0, 0, '', {
        fontSize: '20px',
        wordWrap: {
            width: wrapWidth
        },
        maxLines: 3
    })
        .setFixedSize(fixedWidth, fixedHeight);
}

var getBBcodeText = function (scene, wrapWidth, fixedWidth, fixedHeight) {
    return scene.rexUI.add.BBCodeText(0, 0, '', {
        fixedWidth: fixedWidth,
        fixedHeight: fixedHeight,

        fontSize: '20px',
        wrap: {
            mode: 'word',
            width: wrapWidth
        },
        maxLines: 3
    })
}
