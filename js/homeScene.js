import MainScene from "./MainScene.js";
import villageScene from "./villageScene.js";
//import createPlayer from './villageScene.js';
let cursors;

export default class homeScene extends MainScene {
    constructor() {
        super("homeScene")
    }

    preload() {

    }

    create() {
        cursors = this.input.keyboard.createCursorKeys();
        const homeroom = this.make.tilemap({ key: "homeroom" });
        const tileset = homeroom.addTilesetImage("room", "homeground");
        const interiorTileset = homeroom.addTilesetImage("tileset", "interior");
        const groundLayer = homeroom.createLayer("ground", [tileset, interiorTileset], 0, 0);
        const interior = homeroom.createLayer("interior", [tileset, interiorTileset], 0, 0);
        //this.scene.get("villageScene").createPlayer();
        const spawnPoint = homeroom.findObject(
            "spawn",
            (obj) => obj.name === "playerspawn2"
        );

        this.spawn = homeroom.createFromObjects('spawn', 1);
        this.spawns = this.add.group()
        this.spawn.forEach((spawn) => {
            this.physics.world.enable(spawn);
            spawn.body.allowGravity = false;
            spawn.body.immovable = true;
            this.spawns.add(spawn);
        });
        console.log(this.spawns);
        this.createPlayer(spawns[1].x, spawns[1].y);

        this.cameras.main.fadeIn(1000);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(3);

        this.doorSound = this.sound.add("startGame");

        this.door = homeroom.createFromObjects('doors', 1);
        this.doors = this.add.group()
        this.door.forEach((door) => {
            this.physics.world.enable(door);
            door.body.allowGravity = false;
            door.body.immovable = true;
            this.doors.add(door);
        });

        this.physics.add.collider(this.player, this.doors, () => { this.startScene('villageScene') });

    }

    startScene(scene) {
        this.cameras.main.fadeIn(1000);
        this.doorSound.play({ volume: 0.05 });
        this.scene.start(scene);
    }

    createPlayer(x, y) {

        // Erzeugt den Player
        this.player = this.physics.add.sprite(x, y, "atlas", "misa-front").setOffset(0, 24);
        this.player.setScale(0.5); // Skalierung des Sprites
        this.player.setSize(30, 30); // Hitbox

        // Animation
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
    }

    update() {
        //this.scene.get("villageScene").update();
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
            if (prevVelocity.x < 0) this.player.setTexture("atlas", "misa-left");
            else if (prevVelocity.x > 0) this.player.setTexture("atlas", "misa-right");
            else if (prevVelocity.y < 0) this.player.setTexture("atlas", "misa-back");
            else if (prevVelocity.y > 0) this.player.setTexture("atlas", "misa-front");
        }
    }
}