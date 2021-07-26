import Player from "./objects/Player.js";

export default class homeScene extends Phaser.Scene {
    constructor() {
        super("homeScene")
    }


    init(data) {
        console.log(data);
        if (data.name == "doorHome") {
            this.spawnX = 363;
            this.spawnY = 623;
        }
        if (data.name == "doorShop") {
            this.spawnX = 87;
            this.spawnY = 113;
        }
        this.selectedCharacter = data.char;
    }

    preload() {
        // Steuerung
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
        // Fade in Effekt
        this.cameras.main.fadeIn(1000, 0, 0, 0)

        // Tilesets zuweisen
        const homeroom = this.make.tilemap({ key: "homeroom" });
        const tileset = homeroom.addTilesetImage("room", "homeground");
        const raumset = homeroom.addTilesetImage("raum", "raumset");
        const interiorTileset = homeroom.addTilesetImage("tileset", "interior");
        const groundLayer = homeroom.createLayer("ground", [tileset, interiorTileset, raumset], 0, 0);
        const interior = homeroom.createLayer("interior", [tileset, interiorTileset, raumset], 0, 0);
        const interior1 = homeroom.createLayer("interior-1", [tileset, interiorTileset, raumset], 0, 0);

        // Spieler an die zuvor an die Scene übergebenden Koordinaten erstellen
        this.player = new Player(this, this.spawnX, this.spawnY, this.selectedCharacter);

        //Kamera soll dem Spieler folgen und Zoom der Kamera auf drei
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(3);

        // Soundeffekt
        this.doorSound = this.sound.add("startGame");
        this.doorcloseSound = this.sound.add("doorcloseSound");

        this.door = homeroom.createFromObjects('doors', 1);
        this.doors = this.add.group()
        this.door.forEach((door) => {
            this.physics.world.enable(door);
            door.body.allowGravity = false;
            door.body.immovable = true;
            this.doors.add(door);
        });

        // Türen

        // Home door zurück
        this.doorHomeBack = homeroom.createFromObjects('doors', { name: 'doorHomeBack' });
        this.physics.world.enable(this.doorHomeBack);

        this.physics.add.collider(this.player, this.doorHomeBack, () => {
            this.doorcloseSound.play();
            this.switchScene('villageScene', this.doorHomeBack[0].name)
        });

        // Shop door züruck
        this.doorShopBack = homeroom.createFromObjects('doors', { name: 'doorShopBack' });
        this.physics.world.enable(this.doorShopBack);

        this.physics.add.collider(this.player, this.doorShopBack, () => {
            this.doorcloseSound.play();
            this.switchScene('villageScene', this.doorShopBack[0].name)
        });

        // Shop
        this.shop = homeroom.createFromObjects('shop', { name: 'shopVil' });
        this.physics.world.enable(this.shop);
        this.shop[0].body.immovable = true;
        console.log(this.shop);
        this.physics.add.collider(this.player, this.shop, () => {
            this.scene.pause().launch('shopScene');
        });
    }

    // Funktion um in eine andere Scene zu wechseln
    switchScene(scene, name) {
        this.cameras.main.fadeOut(1000);
        this.doorSound.play({ volume: 0.05 });
        this.scene.start(scene, { name, char: this.selectedCharacter });
    }


    update() {
        this.player.update(this.cursors, this.selectedCharacter);

        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SIX))) {
            console.log("x" + this.player.x, "y:" + this.player.y);
        }

    }
}