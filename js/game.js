const config = {
    type: Phaser.AUTO, // Welcher Renderer soll verwendet werden?
    width: 960,
    height: 640,
    pixelArt: true,
    parent: "game", // ID of the DOM element to add the canvas to
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
let controls;

function preload() {
    this.load.image("tiles", "../assets/tilesets/Serene_Village_16x16.png");
    this.load.tilemapTiledJSON("map", "../assets/tilesets/tileset.json");
}

function create() {
    const map = this.make.tilemap({ key: "map" });

    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    const tileset = map.addTilesetImage("Serene_Village_16x16", "tiles");

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const belowLayer = map.createStaticLayer("bottom", tileset, 0, 0);
    const worldLayer = map.createStaticLayer("world", tileset, 0, 0);
    const aboveLayer = map.createStaticLayer("top", tileset, 0, 0);

    // Phaser supports multiple cameras, but you can access the default camera like this:
    const camera = this.cameras.main;

    // Set up the arrows to control the camera
    const cursors = this.input.keyboard.createCursorKeys();
    controls = new Phaser.Cameras.Controls.FixedKeyControl({
        camera: camera,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        speed: 0.5
    });

    // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // Help text that has a "fixed" position on the screen
    this.add
        .text(16, 16, "Pfeiltasten zum bewegen", {
            font: "18px monospace",
            fill: "#ffffff",
            padding: { x: 20, y: 10 },
            backgroundColor: "#000000"
        })
        .setScrollFactor(0);
}

function update(time, delta) {
    // Apply the controls to the camera each update tick of the game
    controls.update(delta);
}


// function update(time, delta) {
//     // Runs once per frame for the duration of the scene
// }

// import MainScene from "./mainScene.js";

// const config = {
//     width: 512,
//     height: 512,
//     backgroundColor: '#333',
//     type: Phaser.AUTO,
//     parent: 'game',
//     scene: [MainScene],
//     scale: {
//         zoom: 2,
//     },
//     physics: {
//         default: 'matter',
//         matter: {
//             debug: true,
//             gravity: { y: 0 },
//         }
//     },
//     plugins: {
//         scene: [
//             {
//                 plugin: PhaserMatterCollisionPlugin,
//                 key: 'matterCollision',
//                 mapping: 'matterCollision'
//             }
//         ]
//     }
// }

// new Phaser.Game(config);