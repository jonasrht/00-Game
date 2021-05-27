export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super("PreloadScene");
    }

    preload() {


        //Tilemaps
        this.load.tilemapTiledJSON("map", "assets/tilesets/tileset.json");
        this.load.image("tiles", "assets/tilesets/Serene_Village_16x16.png");
        this.load.image("sTiles", "assets/tilesets/sophie16x16.png");

        this.load.tilemapTiledJSON("homeroom", "assets/tilesets/room.json")
        this.load.image("homeground", "assets/tilesets/Room_Builder_free_16x16.png");
        this.load.image("interior", "assets/tilesets/Interiors_free_16x16.png");

        // Player
        this.load.atlas("atlas", "assets/tilesets/atlas.png", "assets/tilesets/atlas.json");
        this.load.atlas("atlasPink", "assets/tilesets/atlas-pink.png", "assets/tilesets/atlas.json");

        // NPC
        this.load.atlas("npc", "assets/tilesets/npc.png", "assets/tilesets/npc.json")

        //Menu Background
        this.load.image("bg", "assets/img/parallax-mountain-bg.png");
        this.load.image("bg1", "assets/img/parallax-mountain-montain-far.png");
        this.load.image("bg2", "assets/img/parallax-mountain-mountains.png");
        this.load.image("bg3", "assets/img/parallax-mountain-trees.png");

        // Buttons
        this.load.image('exitButton', 'assets/img/exitButton4.png');
        this.load.image('MenuTop', 'assets/img/MenuTop.png');
        this.load.image('MenuMapTop', 'assets/img/MenuMapTop.png');

        // Inventar
        this.load.image("invIcon", "assets/img/invenIcon.png");

        //Audio
        this.load.audio("menuMusic", "assets/sounds/menumusic.mp3")
        this.load.audio("startGame", "assets/sounds/gamestart.mp3")

        //Plugins
    }

    create() {
        this.scene.start('mainMenu');
    }
}