let cursors;

export default class homeScene extends Phaser.Scene {
    constructor() {
        super("homeScene")
    }

    init(data) {
        console.log(data);
        if (data.name == "doorHome") {
            this.spawnX = 87;
            this.spawnY = 114;
        }
        if (data.name == "doorShop") {
            this.spawnX = 561;
            this.spawnY = 648;
        }
        this.selectedCharacter = data.char;
    }

    preload() {

    }

    create() {
        // Fade in Effekt
        this.cameras.main.fadeIn(1000, 0, 0, 0)

        // Steuerung
        cursors = this.input.keyboard.createCursorKeys();

        // Tilesets zuweisen
        const homeroom = this.make.tilemap({ key: "homeroom" });
        const tileset = homeroom.addTilesetImage("room", "homeground");
        const interiorTileset = homeroom.addTilesetImage("tileset", "interior");
        const groundLayer = homeroom.createLayer("ground", [tileset, interiorTileset], 0, 0);
        const interior = homeroom.createLayer("interior", [tileset, interiorTileset], 0, 0);

        // Spieler an die zuvor an die Scene übergebenden Koordinaten erstellen
        this.createPlayer(this.spawnX, this.spawnY);

        //Kamera soll dem Spieler folgen und Zoom der Kamera auf drei
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(3);

        // Soundeffekt
        this.doorSound = this.sound.add("startGame");

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
            this.switchScene('villageScene', this.doorHomeBack[0].name)
        });

        // Shop door züruck
        this.doorShopBack = homeroom.createFromObjects('doors', { name: 'doorShopBack' });
        this.physics.world.enable(this.doorShopBack);

        this.physics.add.collider(this.player, this.doorShopBack, () => {
            this.switchScene('villageScene', this.doorShopBack[0].name)
        });

    }

    // Funktion um in eine andere Scene zu wechseln
    switchScene(scene, name) {
        this.cameras.main.fadeOut(1000);
        this.doorSound.play({ volume: 0.05 });
        this.scene.start(scene, { name, character: this.selectedCharacter });
    }

    // Funktion um den Spieler zu erstellen
    createPlayer(x, y) {

        // Erzeugt den Player
        this.player = this.physics.add.sprite(x, y, this.selectedCharacter, "misa-front").setOffset(0, 24);
        this.player.setScale(0.5); // Skalierung des Sprites
        this.player.setSize(30, 40); // Hitbox
        this.player.setOffset(0, 24)

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