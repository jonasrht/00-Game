// import eventsCenter from './EventsCenter.js';

let controls;
let cursors;

export default class villageScene extends Phaser.Scene {
    constructor() {
        super("villageScene");
    }
    init(data) {
        this.selectedCharacter = data.character;

        console.log("Data: ->" + data);
        if (data == "doorHomeBack") {
            this.spawnX = 105;
            this.spawnY = 280;
        } else if (data == "doorShopBack") {
            this.spawnX = 290;
            this.spawnY = 160;
        }
        else {
            this.spawnX = 10;
            this.spawnY = 10;
        }
    }

    preload() {
        // this.load.scenePlugin({
        //     key: 'AnimatedTiles',
        //     url: './lib/plugins/AnimatedTiles.js',
        //     sceneKey: 'animatedTiles'
        // });
    }

    create() {
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
        camera.setZoom(3);


        cursors = this.input.keyboard.createCursorKeys();
        // this.add.text(16, 16, "Pfeiltasten zum bewegen", {
        //     font: "18px monospace",
        //     fill: "#ffffff",
        //     padding: { x: 20, y: 10 },
        //     backgroundColor: "#000000"
        // }).setScrollFactor(0);

        this.door = map.createFromObjects('doors', 1);
        this.doors = this.add.group()
        this.door.forEach((door) => {
            this.physics.world.enable(door);
            door.body.allowGravity = false;
            door.body.immovable = true;
            this.doors.add(door);
        });

        // this.physics.add.collider(this.player, this.doors, () => {
        //     console.log(this.doors);
        //     this.switchScene('homeScene')
        // });

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

    }
    switchScene(scene, name) {
        this.cameras.main.fadeOut(1000);
        this.scene.start(scene, { name })
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
