import Npc from "./objects/npc.js";
import Player from "./objects/Player.js";
import instructionsScene from "./instructionsScene.js";

export default class villageScene extends Phaser.Scene {

    constructor() {
        super("villageScene");
    }
    init(data) {
        this.selectedCharacter = data.character;
        if (data.name == "doorHomeBack") {
            this.spawnX = 105;
            this.spawnY = 280;
        } else if (data.name == "doorShopBack") {
            this.spawnX = 290;
            this.spawnY = 160;
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
        this.scene.run('instructionsScene');
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.coinEmitter = new Phaser.Events.EventEmitter();
        var spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        spaceBar.on('up', () => {
            //this.coinEmitter.emit('coinCount');
        });

        // User interace Scene, die parallel zur Scene ausgeführt wird
        this.scene.run('uiScene', { eventEmitter: this.coinEmitter });
        const map = this.make.tilemap({ key: "map" });
        // Tileset
        const tileset = map.addTilesetImage("Serene_Village_16x16", "tiles");
        const sTileset = map.addTilesetImage("tileset", "sTiles");

        // Tileset Ebenen
        this.belowLayer = map.createLayer("bottom", [tileset, sTileset], 0, 0);
        this.worldLayer = map.createLayer("world", [tileset, sTileset], 0, 0);
        this.aboveLayer = map.createLayer("top", [tileset, sTileset], 0, 0);

        // Spieler erstellen
        this.player = new Player(this, this.spawnX, this.spawnY, this.selectedCharacter);

        //Ebenen tiefe einstellen, so dass das "aboveLayer" über dem Spieler ist
        this.player.setDepth(10);
        this.aboveLayer.setDepth(11);

        // Collider
        this.worldLayer.setCollisionByProperty({ colides: true });
        this.physics.add.collider(this.player, this.worldLayer,);

        //Kamera
        const camera = this.cameras.main;
        camera.startFollow(this.player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        camera.setZoom(3.1);

        // NPC
        const npcs = this.physics.add.group({
            classType: Npc
        });
        npcs.get(20, 250, "npc");
        npcs.children.entries[0].body.immovable = true;
        this.physics.add.collider(this.player, npcs, () => this.createBox());


        // Tür nach Hause
        this.doorHome = map.createFromObjects('doors', { name: 'doorHome' });
        this.physics.world.enable(this.doorHome);
        this.doorHome[0].body.immovable = true;
        this.physics.add.collider(this.player, this.doorHome, () => {
            this.switchScene('homeScene', this.doorHome[0].name)
        });

        // Tür zum Shop
        this.doorShop = map.createFromObjects('doors', { name: 'doorShop' });
        this.physics.world.enable(this.doorShop);
        this.doorShop[0].body.immovable = true;
        this.physics.add.collider(this.player, this.doorShop, () => {
            this.switchScene('homeScene', this.doorShop[0].name)
        });

        this.wasd = this.input.keyboard.addKeys({
            esc: Phaser.Input.Keyboard.KeyCodes.ESC,
        })


    }
    switchScene(scene, name) {
        this.cameras.main.fadeOut(1000, 0, 0, 0);
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
            this.scene.start(scene, { name, char: this.selectedCharacter })
        });
    }

    createBox() {
        this.coinEmitter.emit('coinCount');
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.wasd.esc)) {
            this.scene.start('mainMenu');
        }

        this.player.update(this.cursors, this.selectedCharacter);
    }


}