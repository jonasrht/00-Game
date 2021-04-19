let controls;
let player;
let cursors;
export default class MainScene extends Phaser.Scene {
    constructor() {
        super("MainScene");
    }

    preload() {
        this.load.image("tiles", "assets/tilesets/Serene_Village_16x16.png");
        this.load.tilemapTiledJSON("map", "assets/tilesets/tileset.json");
        this.load.atlas("atlas", "assets/tilesets/atlas.png", "assets/tilesets/atlas.json");
    }

    create() {
        const map = this.make.tilemap({ key: "map" });
        // Tileset
        const tileset = map.addTilesetImage("Serene_Village_16x16", "tiles");

        // Tileset Ebenen
        const belowLayer = map.createDynamicLayer("bottom", tileset, 0, 0);
        const worldLayer = map.createDynamicLayer("world", tileset, 0, 0);
        const aboveLayer = map.createDynamicLayer("top", tileset, 0, 0);

        worldLayer.setCollisionByProperty({ colides: true });

        const camera = this.cameras.main;

        // Cam bleibt innerhalb der Map
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.add.text(16, 16, "Pfeiltasten zum bewegen", {
            font: "18px monospace",
            fill: "#ffffff",
            padding: { x: 20, y: 10 },
            backgroundColor: "#000000"
        })
            .setScrollFactor(0);

        player = this.physics.add.sprite(200, 150, "atlas", "misa-front").setScale(0.8).setSize(30, 30).setOffset(0, 24);

        const anims = this.anims;
        anims.create({
            key: "misa-left-walk",
            frames: anims.generateFrameNames("atlas", { prefix: "misa-left-walk.", start: 0, end: 3, zeroPad: 3 }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: "misa-right-walk",
            frames: anims.generateFrameNames("atlas", { prefix: "misa-right-walk.", start: 0, end: 3, zeroPad: 3 }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: "misa-front-walk",
            frames: anims.generateFrameNames("atlas", { prefix: "misa-front-walk.", start: 0, end: 3, zeroPad: 3 }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: "misa-back-walk",
            frames: anims.generateFrameNames("atlas", { prefix: "misa-back-walk.", start: 0, end: 3, zeroPad: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.physics.add.collider(player, worldLayer);
        camera.startFollow(player);
        cursors = this.input.keyboard.createCursorKeys();

        this.wasd = this.input.keyboard.addKeys({
            esc: Phaser.Input.Keyboard.KeyCodes.ESC,
        })

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.wasd.esc)) {
            console.log("esc");
            this.scene.start('mainMenu');
        }
        const speed = 175;
        player.body.setVelocity(0);
        const prevVelocity = player.body.velocity.clone();

        // Horizontal movement
        if (cursors.left.isDown) {
            player.body.setVelocityX(-100);
        } else if (cursors.right.isDown) {
            player.body.setVelocityX(100);
        }

        // Vertical movement
        if (cursors.up.isDown) {
            player.body.setVelocityY(-100);
        } else if (cursors.down.isDown) {
            player.body.setVelocityY(100);
        }

        // Normalize and scale the velocity so that player can't move faster along a diagonal
        player.body.velocity.normalize().scale(speed);

        if (cursors.left.isDown) {
            player.anims.play("misa-left-walk", true);
        } else if (cursors.right.isDown) {
            player.anims.play("misa-right-walk", true);
        } else if (cursors.up.isDown) {
            player.anims.play("misa-back-walk", true);
        } else if (cursors.down.isDown) {
            player.anims.play("misa-front-walk", true);
        } else {
            player.anims.stop();

            // If we were moving, pick and idle frame to use
            if (prevVelocity.x < 0) player.setTexture("atlas", "misa-left");
            else if (prevVelocity.x > 0) player.setTexture("atlas", "misa-right");
            else if (prevVelocity.y < 0) player.setTexture("atlas", "misa-back");
            else if (prevVelocity.y > 0) player.setTexture("atlas", "misa-front");
        }
    }
}