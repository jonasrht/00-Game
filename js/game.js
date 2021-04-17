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
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 } // Top down game, so no gravity
        }
    }
};

const game = new Phaser.Game(config);
let controls;
let player;
let cursors;
let showDebug = false;

function preload() {
    this.load.image("tiles", "assets/tilesets/Serene_Village_16x16.png");
    this.load.tilemapTiledJSON("map", "assets/tilesets/tileset.json");
    this.load.atlas("atlas", "https://www.mikewesthad.com/phaser-3-tilemap-blog-posts/post-1/assets/atlas/atlas.png", "https://www.mikewesthad.com/phaser-3-tilemap-blog-posts/post-1/assets/atlas/atlas.json");
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

    worldLayer.setCollisionByProperty({ colides: true });

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

    const debugGraphics = this.add.graphics().setAlpha(0.75);
    worldLayer.renderDebug(debugGraphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
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

    this.input.keyboard.once("keydown_D", event => {
        // Turn on physics debugging to show player's hitbox
        this.physics.world.createDebugGraphic();

        // Create worldLayer collision graphic above the player, but below the help text
        const graphics = this.add
            .graphics()
            .setAlpha(0.75)
            .setDepth(20);
        worldLayer.renderDebug(graphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });
    });

    // Watch the player and worldLayer for collisions, for the duration of the scene:
    player = this.physics.add.sprite(400, 350, "atlas", "misa-front");
    this.physics.add.collider(player, worldLayer);
}

function update(time, delta) {

    player.body.setVelocity(0);

    // // Horizontal movement
    // if (cursors.left.isDown) {
    //     player.body.setVelocityX(-100);
    // } else if (cursors.right.isDown) {
    //     player.body.setVelocityX(100);
    // }

    // // Vertical movement
    // if (cursors.up.isDown) {
    //     player.body.setVelocityY(-100);
    // } else if (cursors.down.isDown) {
    //     player.body.setVelocityY(100);
    // }

    // Normalize and scale the velocity so that player can't move faster along a diagonal
    // player.body.velocity.normalize().scale(speed);

    // Apply the controls to the camera each update tick of the game
    controls.update(delta);
}

