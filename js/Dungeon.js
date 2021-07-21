import Player from "./objects/Player.js";
import Slime from "./objects/slime.js";
import Arrow from "./arrow.js";

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
        this.physics.world.createDebugGraphic();
        this.uiScene = this.scene.get('uiScene');
        this.invScene = this.scene.get('inventoryScene');

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
        this.e = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.six = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SIX);

        //collision mit der wand in tiled einstellen
        this.worldLayer.setCollisionByProperty({ collides: true });
        chestLayer.setCollisionByProperty({ collides: true });

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
            this.slime = new Slime(this, slime.x, slime.y, 'npc', 1);
            this.slimeGroup.push(this.slime)
        })

        this.physics.add.collider(this.player, this.slimeGroup, () => {
            this.uiScene.removeHeart();
            this.player.pushBack();
        });

        //collider hinzufügen
        this.physics.add.collider(this.player, this.worldLayer);
        this.physics.add.collider(this.player, chestLayer);
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

    angriff() {
        console.log("atack");
    }

    update(time, delta) {
        const speed = 175;
        const prevVelocity = this.player.body.velocity.clone();
        this.player.update(this.cursors, "atlas");
        this.slimeGroup.forEach((slime) => {
            slime.update(slime, this);
        });

        if (Phaser.Input.Keyboard.JustDown(this.six)) {
            console.log("x" + this.player.x, "y:" + this.player.y);
        }

        if (Phaser.Input.Keyboard.JustDown(this.e)) {
            this.player.dash();
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
