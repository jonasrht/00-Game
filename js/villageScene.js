let controls;
let cursors;

export default class villageScene extends Phaser.Scene {
    constructor() {
        super("villageScene");
    }
    init(data) {
        this.selectedCharacter = data.character;
        console.log(data.character);
    }

    preload() {
        this.load.scenePlugin({
            key: 'AnimatedTiles',
            url: './lib/plugins/AnimatedTiles.js',
            sceneKey: 'animatedTiles'
        });
    }

    create() {
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
        this.createPlayer();
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

        this.physics.add.collider(this.player, this.doors, () => { this.scene.start('homeScene') });

        this.wasd = this.input.keyboard.addKeys({
            esc: Phaser.Input.Keyboard.KeyCodes.ESC,
        })

    }
    switchScene(scene) {
        this.cameras.main.fadeOut(1000);
        this.scene.start(scene)
    }
    createPlayer() {
        // Erzeugt den Player
        this.player = this.physics.add.sprite(200, 150, this.selectedCharacter, "misa-front");
        this.player.body.setSize(30, 50, true);
        console.log(this.player.width, this.player.height);
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

export function createPlayer() {
    // // Erzeugt den Player
    // this.player = this.physics.add.sprite(200, 150, "atlas", "misa-front");
    // this.player.body.setSize(30, 50, true);
    // console.log(this.player.width, this.player.height);
    // this.player.body.velocity.x = -100;
    // this.player.setScale(0.5); // Skalierung des Sprites
    // //this.player.setSize(20, 40); // Hitbox

    // // Animation
    // const anims = this.anims;
    // anims.create({
    //     key: "misa-left-walk",
    //     frames: anims.generateFrameNames("atlas", { prefix: "misa-left-walk.", start: 0, end: 3, zeroPad: 3 }),
    //     frameRate: 10,
    //     repeat: -1
    // });
    // anims.create({
    //     key: "misa-right-walk",
    //     frames: anims.generateFrameNames("atlas", { prefix: "misa-right-walk.", start: 0, end: 3, zeroPad: 3 }),
    //     frameRate: 10,
    //     repeat: -1
    // });
    // anims.create({
    //     key: "misa-front-walk",
    //     frames: anims.generateFrameNames("atlas", { prefix: "misa-front-walk.", start: 0, end: 3, zeroPad: 3 }),
    //     frameRate: 10,
    //     repeat: -1
    // });
    // anims.create({
    //     key: "misa-back-walk",
    //     frames: anims.generateFrameNames("atlas", { prefix: "misa-back-walk.", start: 0, end: 3, zeroPad: 3 }),
    //     frameRate: 10,
    //     repeat: -1
    // });
    console.log("wow");
}