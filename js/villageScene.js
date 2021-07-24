import Npc from "./objects/npc.js";
import Player from "./objects/Player.js";
import instructionsScene from "./instructionsScene.js";
import uiScene from "./uiScene.js";

export default class villageScene extends Phaser.Scene {

    constructor() {
        super("villageScene");
    }
    init(data) {
        this.selectedCharacter = data.char;
        // Spawn Pukte
        if (data.name == "doorHomeBack") {
            this.spawnX = 115;
            this.spawnY = 227;
        } else if (data.name == "doorShopBack") {
            this.spawnX = 307;
            this.spawnY = 134;
        }
        else {
            this.spawnX = 10;
            this.spawnY = 10;
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
        var uiScene = this.scene.get('uiScene');

        this.dooropenSound = this.sound.add("dooropenSound");
        this.scene.run('instructionsScene');
        //this.scene.run('shopScene');
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.coinEmitter = new Phaser.Events.EventEmitter();
        var spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        spaceBar.on('up', () => {
            //this.coinEmitter.emit('coinCount');
        });

        // User interace Scene, die parallel zur Scene ausgeführt wird
        //this.scene.run('uiScene', { eventEmitter: this.coinEmitter });
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
        this.aboveLayer = map.createLayer("top", [tileset, schmiedTilset, dorfTiles, shopTiles], 0, 0);

        // Spieler erstellen
        this.player = new Player(this, this.spawnX, this.spawnY, this.selectedCharacter);

        //Ebenen tiefe einstellen, so dass das "aboveLayer" über dem Spieler ist
        this.player.setDepth(10);
        this.aboveLayer.setDepth(11);

        // Collider
        this.worldLayer.setCollisionByProperty({ collide: true });
        this.physics.add.collider(this.player, this.worldLayer,);

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
        this.npc1.play('idle')
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

        // Tür nur mit Schlüssel
        this.doorSchmied = map.createFromObjects('doors', { name: 'doorSchmied' });
        this.physics.world.enable(this.doorSchmied);
        this.doorSchmied[0].body.immovable = true;
        this.physics.add.collider(this.player, this.doorSchmied, () => {
            this.dooropenSound.play();
            this.switchScene('Dungeon', this.doorShop[0].name)
        });

        this.wasd = this.input.keyboard.addKeys({
            esc: Phaser.Input.Keyboard.KeyCodes.ESC,
            six: Phaser.Input.Keyboard.KeyCodes.SIX
        })


    }
    switchScene(scene, name) {
        this.cameras.main.fadeOut(1000, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
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