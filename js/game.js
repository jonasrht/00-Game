import MainScene from "./MainScene.js";
import Menu from "./Menu.js";

const config = {
    type: Phaser.AUTO, // Welcher Renderer soll verwendet werden?
    width: 960,
    height: 640,
    pixelArt: true,
    parent: "game", // HTML ID 
    scene: [Menu, MainScene],
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 }, // no gravity
            debug: true
        }
    }
};

const game = new Phaser.Game(config);
// let controls;
// let player;
// let cursors;
// let showDebug = false;

// function preload() {
//     this.load.image("tiles", "assets/tilesets/Serene_Village_16x16.png");
//     this.load.tilemapTiledJSON("map", "assets/tilesets/tileset.json");
//     this.load.atlas("atlas", "assets/tilesets/atlas.png", "assets/tilesets/atlas.json");
// }

// function create() {
//     const map = this.make.tilemap({ key: "map" });
//     // Tileset
//     const tileset = map.addTilesetImage("Serene_Village_16x16", "tiles");

//     // Tileset Ebenen
//     const belowLayer = map.createStaticLayer("bottom", tileset, 0, 0);
//     const worldLayer = map.createStaticLayer("world", tileset, 0, 0);
//     const aboveLayer = map.createStaticLayer("top", tileset, 0, 0);

//     worldLayer.setCollisionByProperty({ colides: true });

//     // Cam
//     const camera = this.cameras.main;

//     // Cam bleibt innerhalb der Map
//     camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

//     // Text
//     this.add
//         .text(16, 16, "Pfeiltasten zum bewegen", {
//             font: "18px monospace",
//             fill: "#ffffff",
//             padding: { x: 20, y: 10 },
//             backgroundColor: "#000000"
//         })
//         .setScrollFactor(0);

//     this.input.keyboard.once("keydown_D", event => {
//         this.physics.world.createDebugGraphic();

//         const graphics = this.add
//             .graphics()
//             .setAlpha(0.75)
//             .setDepth(20);
//         worldLayer.renderDebug(graphics, {
//             tileColor: null,
//             collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
//             faceColor: new Phaser.Display.Color(40, 39, 37, 255)
//         });
//     });

//     // Player
//     player = this.physics.add.sprite(200, 150, "atlas", "misa-front");
//     this.physics.add.collider(player, worldLayer);
//     camera.startFollow(player);
//     cursors = this.input.keyboard.createCursorKeys();
// }

// function update(time, delta) {
//     const speed = 175;
//     player.body.setVelocity(0);

//     // Horizontal movement
//     if (cursors.left.isDown) {
//         player.body.setVelocityX(-100);
//     } else if (cursors.right.isDown) {
//         player.body.setVelocityX(100);
//     }

//     // Vertical movement
//     if (cursors.up.isDown) {
//         player.body.setVelocityY(-100);
//     } else if (cursors.down.isDown) {
//         player.body.setVelocityY(100);
//     }

//     // Normalize and scale the velocity so that player can't move faster along a diagonal
//     player.body.velocity.normalize().scale(speed);

// }

