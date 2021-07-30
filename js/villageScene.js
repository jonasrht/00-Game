import Npc from "./objects/npc.js";
import Player from "./objects/Player.js";
import Bewohner from "./objects/bewohner.js"
import instructionsScene from "./instructionsScene.js";
import uiScene from "./uiScene.js";

export default class villageScene extends Phaser.Scene {

    constructor() {
        super("villageScene");

        this.startedOnce = false;
    }
    init(data) {
        this.selectedCharacter = data.char;
        // Spawn Pukte
        if (data.name == "doorHomeBack") {
            this.spawnX = 496;
            this.spawnY = 564;
        } else if (data.name == "doorShopBack") {
            this.spawnX = 545;
            this.spawnY = 469;
        } else if (data.name == "d1Ausgang") {
            this.spawnX = 1240;
            this.spawnY = 55;
        } else if (data.name == "doorSchmiedBack") {
            this.spawnX = 900;
            this.spawnY = 447;
        }
        else {
            this.spawnX = 631;
            this.spawnY = 371;
        }
    }

    preload() {
        this.cursors = this.input.keyboard.createCursorKeys()
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
        this.load.image('nextPage', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/arrow-down-left.png');
    }

    create() {
        // Hintergrundmusik
        this.bgDorfMusic = this.sound.add("dorfMusic");
        if (this.startedOnce == false) {
            this.bgDorfMusic.play({loop: true, volume: 0.1});
        }

        this.uiScene = this.scene.get('uiScene');
        this.invScene = this.scene.get('inventoryScene');
        this.dooropenSound = this.sound.add("dooropenSound");
        if (this.startedOnce == false) {
            this.scene.run('instructionsScene');
        }
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.coinEmitter = new Phaser.Events.EventEmitter();
        var spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        const map = this.make.tilemap({ key: "map" });
        // Tileset
        const tileset = map.addTilesetImage("Serene_Village_16x16", "tiles");
        const schmiedTilset = map.addTilesetImage("schmied16x16", "schmiedTiles");
        const dorfTiles = map.addTilesetImage("dorf", "dorfTiles");
        const shopTiles = map.addTilesetImage("shophouse", "shopHaus");

        // Tileset Ebenen
        this.belowLayer = map.createLayer("bottom", [tileset, schmiedTilset, dorfTiles, shopTiles], 0, 0);
        this.belowLayer2 = map.createLayer("bottom2", [tileset, schmiedTilset, dorfTiles, shopTiles], 0, 0);
        this.worldLayer = map.createLayer("world", [tileset, schmiedTilset, dorfTiles, shopTiles], 0, 0);
        this.worldLayer1 = map.createLayer("world-1", [tileset, schmiedTilset, dorfTiles, shopTiles], 0, 0);
        this.worldLayer2 = map.createLayer("world2", [tileset, schmiedTilset, dorfTiles, shopTiles], 0, 0);
        this.worldLayer3 = map.createLayer("world3", [tileset, schmiedTilset, dorfTiles, shopTiles], 0, 0);
        this.aboveLayer = map.createLayer("top", [tileset, schmiedTilset, dorfTiles, shopTiles], 0, 0);
        this.baumLayer = map.createLayer("baum", [tileset, schmiedTilset, dorfTiles, shopTiles], 0, 0);

        // Spieler erstellen
        this.player = new Player(this, this.spawnX, this.spawnY, this.selectedCharacter);

        //Ebenen tiefe einstellen, so dass das "aboveLayer" über dem Spieler ist
        this.player.setDepth(10);
        this.aboveLayer.setDepth(11);

        // Collider
        this.belowLayer.setCollisionByProperty({ collide: true });
        this.worldLayer.setCollisionByProperty({ collide: true });
        this.worldLayer1.setCollisionByProperty({ collide: true });
        this.worldLayer2.setCollisionByProperty({ collide: true });
        this.worldLayer3.setCollisionByProperty({ collide: true });
        this.belowLayer2.setCollisionByProperty({ collide: true });
        this.physics.add.collider(this.player, this.belowLayer);
        this.physics.add.collider(this.player, this.worldLayer);
        this.physics.add.collider(this.player, this.worldLayer1);
        this.physics.add.collider(this.player, this.worldLayer2);
        this.physics.add.collider(this.player, this.worldLayer3);
        this.physics.add.collider(this.player, this.belowLayer2);

        //Kamera
        const camera = this.cameras.main;
        camera.startFollow(this.player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        camera.setZoom(3.0);

        // NPC
        const npcs = this.physics.add.group({
            classType: Npc
        });
        this.npc1 = npcs.get(20, 250, "npc");
        this.anims.create({
            key: 'idle',
            repeat: -1,
            frameRate: 5,
            frames: this.anims.generateFrameNames('npc', {
                prefix: 'tile',
                suffix: '.png',
                start: 4,
                end: 5,
                zeroPad: 3
            })
        });
        this.npc1.play('idle');
        npcs.children.entries[0].body.immovable = true;
        this.physics.add.collider(this.player, npcs, () => this.createBox("Moin Servus Moin, wie gets? Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero e"));


        // Tür nach Hause
        this.doorHome = map.createFromObjects('doors', { name: 'doorHome' });
        this.physics.world.enable(this.doorHome);
        this.doorHome[0].body.immovable = true;
        this.physics.add.collider(this.player, this.doorHome, () => {
            this.dooropenSound.play();
            this.switchScene('homeScene', this.doorHome[0].name)
        });

        // Tür zum Shop
        this.doorShop = map.createFromObjects('doors', { name: 'doorShop' });
        this.physics.world.enable(this.doorShop);
        this.doorShop[0].body.immovable = true;
        this.physics.add.collider(this.player, this.doorShop, () => {
            this.dooropenSound.play();
            this.switchScene('homeScene', this.doorShop[0].name)
        });

        // Tür zum Dungeon
        this.caveEnte = map.createFromObjects('doors', { name: 'caveEnte' });
        this.physics.world.enable(this.caveEnte);
        this.caveEnte[0].body.immovable = true;
        this.physics.add.collider(this.player, this.caveEnte, () => {
            this.bgDorfMusic.stop();
            if (this.uiScene.firstQuest != true) {
                this.uiScene.createBox("Die Zeit ist noch nicht reif.")
            } else if ((this.uiScene.firstQuest == true) && (this.uiScene.secondQuest == false)){
                this.dooropenSound.play();
                this.uiScene.removeQuest("- Finde einen Weg zur Höhle!");
                this.uiScene.addQuest("Untersuche die Höhle");
                this.uiScene.newQuestAllert();
                this.uiScene.questDoneAllert();
                this.uiScene.secondQuest = true;
                this.scene.start('Dungeon', { char: this.selectedCharacter });
            } else {
                this.scene.start('Dungeon', { char: this.selectedCharacter });
            }
        });


        // Tür zum Schmied
        this.doorSchmied = map.createFromObjects('doors', { name: 'doorSchmied' });
        this.physics.world.enable(this.doorSchmied);
        this.doorSchmied[0].body.immovable = true;
        this.physics.add.collider(this.player, this.doorSchmied, () => {
            this.dooropenSound.play();
            this.switchScene('homeScene', "doorSchmied")
        });

        // Schilder im Dorf
        this.schilde = map.createFromObjects('signs');
        this.schilde.forEach((schild) => {
            this.physics.world.enable(schild);
            schild.body.immovable = true;
        });
        this.physics.add.collider(this.player, this.schilde, (player, schild) => {
            this.schildDialog(player, schild);
        });

        // Bewohner hinzufügen
        this.bewohnerGroup = [];
        this.bewohner = map.createFromObjects('bewohner');
        this.textureNum = 1;
        this.bewohner.forEach((bewohner) => {
            if (bewohner.name == "buergermeister") {
                this.bewohner = new Bewohner(this, bewohner.x, bewohner.y, 'buergermeister', 1);
                this.bewohnerGroup.push(this.bewohner)
            } else {
                this.bewohner = new Bewohner(this, bewohner.x, bewohner.y, 'bewohner' + this.textureNum, 1);
                this.bewohnerGroup.push(this.bewohner)
                if (this.textureNum > 3) {
                    this.textureNum--;
                } else {
                    this.textureNum++;
                }
            }
        });

        this.physics.add.collider(this.player, this.bewohnerGroup, (player, bewohner) => {
            this.bewohnerDialog(player, bewohner);
        });

        this.wasd = this.input.keyboard.addKeys({
            esc: Phaser.Input.Keyboard.KeyCodes.ESC,
            six: Phaser.Input.Keyboard.KeyCodes.SIX
        })
        this.player.setMovement(false);
        if (this.startedOnce == false) {
            // this.startScene();
        }
        this.startedOnce = true;
        // Einmal in der Scene
        this.audioManager = this.scene.get("audioManager");
        // Für jeden Sound
        this.outdoorMusic = this.sound.add("outdoor");
        this.outdoorMusic.setLoop(true);
        this.outdoorMusic.play(this.audioManager.musicConfig);
    }

    // Text, welcher ausgegeben wird wenn man mir einem Bewohner kollidiert
    bewohnerDialog(player, bewohner) {
        player.setMovement(false);
        player.anims.stop();
        console.log(bewohner.texture.key);
        switch (bewohner.texture.key) {
            case "bewohner3":
                this.uiScene.createBox("... ich habe tierische Angst vor den Monstern!")
                break;
            case "bewohner2":
                this.uiScene.createBox("Schönes Wetter heute!")
                break;
            case "bewohner1":
                this.uiScene.createBox("Ich habe ein Gerücht gehört, dass es ein Heilmittel gibt.")
                break;
            case "buergermeister":
                if (this.uiScene.firstQuest != true) {
                    this.uiScene.createBox("...WAS es gibt Aussicht auf ein Heilmittel. Das ist das Beste, was ich seit Jahren gehört habe, du musst das Heilmittel finden.")
                    this.uiScene.removeQuest("- Teile dem Bürgermeister\n   deinen Fund mit");
                    this.uiScene.questDoneAllert();
                    this.uiScene.addQuest("- Finde einen Weg zur Höhle!");
                    this.uiScene.newQuestAllert();
                    this.uiScene.firstQuest = true;
                } else {
                    this.uiScene.createBox("Ich hoffe du findest das Heilmittel, alle im Dorf hoffen auf dich.")
                }

                break;
            default:
                break;
        }

    }

    // Text, welcher ausgegeben wird wenn man mir einem Schild kollidiert
    schildDialog(player, schild) {
        player.setMovement(false);
        player.anims.stop();
        console.log(schild.name);
        switch (schild.name) {
            case "schildCave":
                this.uiScene.createBox("... Betreten verboten, lebensgefahr!")
                break;
            case "schildCaveWeg":
                this.uiScene.createBox("Dieser Weg wird kein leichter sein")
                break;
            case "schildDorf":
                this.uiScene.createBox("↑ Weg zur Höhle");
                break;
            default:
                break;
        }
    }

    // Sequenz welche bei erstmalingen Start des Spiels ausgeführt wird
    startScene() {
        this.flaschenpost = this.add.image(626, 665, "flaschenpost");
        this.zumStrand = this.tweens.add({
            targets: this.player,
            onStart: function (tween, targets) {
                targets[0].movement = false;
                targets[0].anims.play('misa-front-walk')
            },
            onComplete: function (tween, targets) {
                targets[0].anims.stop();
                targets[0].movement = true;

            },
            delay: 2000,
            duration: 4000,
            y: 647
        });
        this.zumStrand.on('complete', () => {
            this.time.addEvent({
                delay: 500,
                callback: () => {
                    this.player.anims.play('misa-left-walk');
                    this.player.anims.stop();
                },
                callbackScope: this
            });
            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.player.anims.play('misa-right-walk');
                    this.player.anims.stop();
                },
                callbackScope: this
            });
            this.time.addEvent({
                delay: 1500,
                callback: () => {
                    this.player.anims.play('misa-front-walk');
                    this.player.anims.stop();
                },
                callbackScope: this
            });
            this.time.addEvent({
                delay: 1600,
                callback: () => {
                    this.player.anims.stop();
                    this.uiScene.createBox("Ohh was ist das denn?.... Eine alte Flasche, aber ... da ist ja was drin?!");
                },
                callbackScope: this
            });

            var keyObj = this.input.keyboard.addKey('ENTER')
            this.openFlaschenpost = keyObj.on('down', function (event) {
                this.uiScene.zeigeBrief();
                // this.input.keyboard.removeCapture('ENTER');
                // this.input.keyboard.removeKey('ENTER');
                this.input.keyboard.removeKey('ENTER');
            }, this);
        });
    }

    frontWalk() {
        this.player.anims.play('misa-front-walk', true);
    }

    // Methode zum wechseln der Scene
    switchScene(scene, name) {
        this.cameras.main.fadeOut(1000, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.outdoorMusic.stop();
            this.scene.start(scene, { name, char: this.selectedCharacter })
        });
    }

    createBox(text) {
        var uiScene = this.scene.get('uiScene');
        uiScene.createBox(text);
        this.player.movement = false;
        // this.coinEmitter.emit('coinCount');
    }

    update() {
        if (this.game.config.test) {
            this.player.movement = true
        }

        if (Phaser.Input.Keyboard.JustDown(this.wasd.esc)) {
            this.scene.start('mainMenu');
        }
        if (Phaser.Input.Keyboard.JustDown(this.wasd.six)) {
            console.log("x" + this.player.x, "y:" + this.player.y);
        }

        this.player.update(this.cursors, this.selectedCharacter);

    }


}
