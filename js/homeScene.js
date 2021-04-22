import MainScene from "./MainScene.js";

export default class homeScene extends MainScene {
    constructor() {
        super("homeScene")
    }

    preload() {

    }

    create() {
        const homeroom = this.make.tilemap({ key: "homeroom" });
        const tileset = homeroom.addTilesetImage("room", "homeground");
        const interiorTileset = homeroom.addTilesetImage("tileset", "interior");
        const groundLayer = homeroom.createLayer("ground", [tileset, interiorTileset], 500, 500);
        const interior = homeroom.createLayer("interior", [tileset, interiorTileset], 500, 500);
        //this.scene.get("villageScene").createPlayer();
        this.createPlayer();

        this.cameras.main.fadeIn(1000);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(3);
    }

    createPlayer() {
        // Erzeugt den Player
        this.player = this.physics.add.sprite(200, 150, "atlas", "misa-front").setOffset(0, 24);
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

    }
}