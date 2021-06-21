import Menu from "./Menu.js";
import PreloadScene from "./PreloadScene.js";
import homeScene from "./homeScene.js";
import villageScene from "./villageScene.js";
import selectPlayerScene from "./selectPlayerScene.js";
import uiScene from "./uiScene.js";
import GzDialog from "./plugins/GzDialog.js"
import instructionsScene from "./instructionsScene.js";
import shopScene from "./shopScene.js";
import inventoryScene from "./inventoryScene.js";
import Dungeon from "./Dungeon.js";
import audioManager from "./audioManager.js";

export const config = {
    type: Phaser.AUTO, // Welcher Renderer soll verwendet werden?
    width: 1280,
    height: 720,
    test: true,
    pixelArt: true,
    parent: "game", // HTML ID 
    plugins: {
        scene: [
            { key: 'gzDialog', plugin: GzDialog, mapping: 'gzDialog' }
        ]
    },
    scene: [PreloadScene, Menu, selectPlayerScene, villageScene, homeScene, uiScene, instructionsScene, shopScene, inventoryScene, Dungeon, audioManager],
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 }, // no gravity
            //debug: true
        },

    }
};

const game = new Phaser.Game(config);
game.config.test = true;