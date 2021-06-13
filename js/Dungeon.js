import Player from "./objects/Player.js";

export default class Dungeon extends Phaser.Scene {
    constructor() {
        super("Dungeon");
    }

    init(data) {
        this.selectedCharacter = data.char;
    }

    preload() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
        //tilemap einfügen
        const map = this.make.tilemap({ key: "dungeonMap" });
        const tileset = map.addTilesetImage("Dungeon", "dungeonTiles");

        //Eben createn
        const belowLayer = map.createLayer("boden", tileset, 0, 0);
        this.worldLayer = map.createLayer("wand", tileset, 0, 0);
        const chestLayer = map.createLayer("chest", tileset, 0, 0);
        const buttonLayer = map.createLayer("button", tileset, 0, 0);
        const mobsLayer = map.createLayer("mobs", tileset, 0, 0);

        //fügt den button q hinzu
        this.q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

        //collision mit der wand in tiled einstellen
        this.worldLayer.setCollisionByProperty({ collides: true });
        chestLayer.setCollisionByProperty({ collides: true });

        //spawnpoint in tiled festlegen
        const spawnPoint = map.findObject(
            "Objects",
            (obj) => obj.name === "Spawn Point"
        );
        console.log(spawnPoint.x);
        //player erstellen
        this.player = new Player(this, spawnPoint.x, spawnPoint.y, this.selectedCharacter);

        //collider hinzufügen
        this.physics.add.collider(this.player, this.worldLayer);
        this.physics.add.collider(this.player, chestLayer);

        //funktion damit die kamera einen verfolgt
        const camera = this.cameras.main;
        camera.startFollow(this.player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        camera.setZoom(3);

        // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        this.projectiles = this.add.group();
    }

    update(time, delta) {
        const speed = 175;
        const prevVelocity = this.player.body.velocity.clone();
        this.player.update(this.cursors, "atlas");

        if (Phaser.Input.Keyboard.JustDown(this.q)) {
            this.shootBeam();
        }

        for (var i = 0; i < this.projectiles.getChildren().length; i++) {
            var beam = this.projectiles.getChildren()[i];
            beam.update(this.cursors);
        }
    }
    //Beam schießen amk
    shootBeam() {
        var beam = new Beam(this);
    }
}
