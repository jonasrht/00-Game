import Player from "./objects/Player.js";
import Slime from "./objects/slime.js";
import Arrow from "./arrow.js";

var light;

export default class Dungeon extends Phaser.Scene {
    constructor() {
        super("Dungeon");
        this.arrow = null;
        this.counterArrow = 3;
    }

    init(data) {
        this.selectedCharacter = data.char;
    }

    preload() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.load.image('block', 'https://labs.phaser.io/assets/sprites/block.png');
    }

    create() {
        //this.physics.world.createDebugGraphic();
        this.uiScene = this.scene.get('uiScene');
        this.invScene = this.scene.get('inventoryScene');

        //tilemap einfügen
        const map = this.make.tilemap({ key: "dungeonMap" });
        const tileset = map.addTilesetImage("Dungeon", "dungeonTiles");

        //Eben createn
        this.belowLayer = map.createLayer("boden", tileset, 0, 0);
        this.worldLayer = map.createLayer("wand", tileset, 0, 0);
        this.chestLayer = map.createLayer("chest", tileset, 0, 0);
        this.saeulen = map.createLayer("saeulen", tileset, 0, 0);
        this.buttonLayer = map.createLayer("button", tileset, 0, 0);
        this.mobsLayer = map.createLayer("mobs", tileset, 0, 0);

        this.worldLayer.setPipeline('Light2D');
        this.belowLayer.setPipeline('Light2D');
        this.saeulen.setPipeline('Light2D');

        //fügt den button q hinzu
        this.q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.e = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.six = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SIX);

        this.lights.enable().setAmbientColor(0x333333);
        light = this.lights.addLight(180, 80, 200).setColor(0xffffff).setIntensity(2);

        this.input.on('pointermove', function (pointer) {

        });

        //collision mit der wand in tiled einstellen
        this.worldLayer.setCollisionByProperty({ collides: true });
        this.saeulen.setCollisionByProperty({ collides: true });
        this.chestLayer.setCollisionByProperty({ collides: true });

        //spawnpoint in tiled festlegen
        this.spawnPoint = map.findObject(
            "Objects",
            (obj) => obj.name === "Spawn Point"
        );

        // Spieler erstellen
        this.player = new Player(this, this.spawnPoint.x, this.spawnPoint.y, this.selectedCharacter);

        // Slime Gruppe
        this.slimeGroup = [];

        this.slime = map.createFromObjects('orc');
        this.slime.forEach((slime) => {
            this.slime = new Slime(this, slime.x, slime.y, 'slime', 1);
            this.slimeGroup.push(this.slime)
        })

        this.physics.add.collider(this.player, this.slimeGroup, () => {
            this.uiScene.removeHeart();
            this.player.pushBack();
        });

        //collider hinzufügen
        this.physics.add.collider(this.player, this.worldLayer);
        this.physics.add.collider(this.player, this.saeulen);
        this.physics.add.collider(this.player, this.chestLayer);
        this.physics.add.collider(this.slimeGroup, this.worldLayer);

        //funktion damit die kamera einen verfolgt
        const camera = this.cameras.main;
        camera.startFollow(this.player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        camera.setZoom(3);

        // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        this.projectiles = this.add.group();

        var block = this.physics.add.image(100, 500, 'block').setImmovable(true).setVelocity(100, -100);

        block.body.setAllowGravity(false);

        this.tweens.timeline({
            targets: block.body.velocity,
            loop: -1,
            tweens: [
                { x: 0, y: -200, duration: 2000, ease: 'Stepped' },
                //{ x: 0, y: 0, duration: 1000, ease: 'Stepped' },
                { x: 150, y: 100, duration: 4000, ease: 'Stepped' },
                { x: 0, y: -200, duration: 2000, ease: 'Stepped' },
                { x: 0, y: 0, duration: 1000, ease: 'Stepped' },
                { x: -150, y: 100, duration: 4000, ease: 'Stepped' }
            ]
        });



    }

    update(time, delta) {
        const speed = 175;
        const prevVelocity = this.player.body.velocity.clone();
        this.player.update(this.cursors, "atlas");
        this.slimeGroup.forEach((slime) => {
            slime.update(slime, this);
        });


        light.x = this.player.x;
        light.y = this.player.y;


        if (Phaser.Input.Keyboard.JustDown(this.six)) {
            console.log("x" + this.player.x, "y:" + this.player.y);
        }


        if (Phaser.Input.Keyboard.JustDown(this.q)) {
            if (this.counterArrow > 0) {
                this.counterArrow -= 1;
                if (this.player.direction === "left") this.arrowDirection = "left";
                if (this.player.direction === "right") this.arrowDirection = "right";
                if (this.player.direction === "up") this.arrowDirection = "up";
                if (this.player.direction === "down") this.arrowDirection = "down";
                if (this.arrowDirection) this.shootArrow(this.arrowDirection);
            }
        }

        if (this.projectiles.getLength() > 0) {
            this.projectiles.getChildren().forEach((arrow) => {
                arrow.update(this.arrowDirection);
            });
        }

        this.rotation = Phaser.Math.Angle.Between(this.player, this.slimeGroup[0])

        if (this.distance < 200) {
            //this.angriff();
        }
    }
    //Beam schießen amk
    shootArrow(direction) {
        var arrow = new Arrow(this, direction);
        this.projectiles.add(arrow);
    }
}
