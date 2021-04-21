import MainScene from "./MainScene.js";
import Menu from "./Menu.js";
import PreloadScene from "./PreloadScene.js";
import homeScene from "./homeScene.js";

const config = {
    type: Phaser.AUTO, // Welcher Renderer soll verwendet werden?
    width: 960,
    height: 640,

    pixelArt: true,
    parent: "game", // HTML ID 
    scene: [PreloadScene, Menu, MainScene, homeScene],
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 }, // no gravity
            debug: true
        }
    }
};

const game = new Phaser.Game(config);