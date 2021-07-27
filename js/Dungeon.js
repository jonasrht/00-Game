import Player from "./objects/Player.js";
import Slime from "./objects/slime.js";
import Arrow from "./arrow.js";
import spikes from "./objects/spikes.js";

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

        //fügt den buttons hinzu
        this.q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.e = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.six = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SIX);

        // Lichter
        this.lights.enable().setAmbientColor(0x333333);
        light = this.lights.addLight(180, 80, 200).setColor(0xffffff).setIntensity(2);

        //collision mit der wand in tiled einstellen
        this.worldLayer.setCollisionByProperty({ collides: true });
        this.saeulen.setCollisionByProperty({ collides: true });
        this.chestLayer.setCollisionByProperty({ collides: true });

        //spawnpoint in tiled festlegen
        this.spawnPoint = map.findObject(
            "Objects",
            (obj) => obj.name === "Spawn Point"
        );

        //Stachelboden
        this.stachelBoden = map.createFromObjects('Stachelboden');
        console.log(this.stachelBoden);
        this.stachelBoden.forEach((stachel) => {
            this.stachel = new spikes(this, stachel.x, stachel.y, 1)
            this.stachel.setPipeline('Light2D');
        })


        // Spieler erstellen
        this.player = new Player(this, this.spawnPoint.x, this.spawnPoint.y, this.selectedCharacter);
        //this.player = new Player(this, 398, 321, this.selectedCharacter);


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
        this.physics.add.collider(this.slimeGroup, this.worldLayer, (slime, world) => {
            slime.handleCollide();
        });

        //funktion damit die kamera einen verfolgt
        const camera = this.cameras.main;
        camera.startFollow(this.player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        camera.setZoom(3);

        // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        this.projectiles = this.add.group();

        //var block = this.physics.add.image(100, 500, 'block').setImmovable(true).setVelocity(100, -100);

        //block.body.setAllowGravity(false);

        // this.tweens.timeline({
        //     targets: block.body.velocity,
        //     loop: -1,
        //     tweens: [
        //         { x: 0, y: -200, duration: 2000, ease: 'Stepped' },
        //         //{ x: 0, y: 0, duration: 1000, ease: 'Stepped' },
        //         { x: 150, y: 100, duration: 4000, ease: 'Stepped' },
        //         { x: 0, y: -200, duration: 2000, ease: 'Stepped' },
        //         { x: 0, y: 0, duration: 1000, ease: 'Stepped' },
        //         { x: -150, y: 100, duration: 4000, ease: 'Stepped' }
        //     ]
        // });


        // Tür zum Dorf
        this.d1Ausgang = map.createFromObjects('Objects', { name: 'd1Ausgang' });
        console.log(this.d1Ausgang);
        this.physics.world.enable(this.d1Ausgang);
        this.d1Ausgang[0].body.immovable = true;
        this.physics.add.collider(this.player, this.d1Ausgang, () => {
            this.scene.start('villageScene', {name: 'd1Ausgang', char: this.selectedCharacter })
        });

        // Tür zu Level 2
        this.doorDungeon2 = map.createFromObjects('doors', { name: 'doorDungeonTwo' });
        this.physics.world.enable(this.doorDungeon2);
        this.doorDungeon2[0].body.immovable = true;
        this.colliderActivated = true;
        this.physics.add.collider(this.player, this.doorDungeon2, () => {
            if (this.slimeGroup.length > 0) {
                this.uiScene.createBox("Du hast noch nicht alle Gegner besiegt!");
            } else {
                this.uiScene.createBox("Du hast es ins Level 2 geschafft :)");
            }
            // this.dooropenSound.play();
            // this.switchScene('Dungeon', this.doorShop[0].name)
        }, () => {return this.colliderActivated}, this);

         // Einmal in der Scene
         this.audioManager = this.scene.get("audioManager");
        // Für jeden Sound
        this.heartbeat = this.sound.add("herzschlag");
    }

    switchScene(scene, name) {
        this.cameras.main.fadeOut(1000, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start(scene, { name, char: this.selectedCharacter })
        });
    }


    update(time, delta) {
        const speed = 175;
        const prevVelocity = this.player.body.velocity.clone();
        this.player.update(this.cursors, "atlas");
        this.slimeGroup.forEach((slime) => {
            slime.update(slime, this);
        });

        // Licht verfolgt spieler
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
        if (this.uiScene.heartContainer.length < 2) {
          this.heartbeat.play();
          this.heartbeat.setLoop(true);
    
          console.log(this.uiScene.heartContainer.length);
        } else {
          this.heartbeat.stop();
        }
      }

    shootArrow(direction) {
        var arrow = new Arrow(this, direction);
        this.projectiles.add(arrow);
    }
}
