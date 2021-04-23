import MainScene from "./MainScene.js";
import Menu from "./Menu.js";
import PreloadScene from "./PreloadScene.js";
import homeScene from "./homeScene.js";
import villageScene from "./villageScene.js";

const config = {
    type: Phaser.AUTO, // Welcher Renderer soll verwendet werden?
    width: 1280,
    height: 720,

    pixelArt: true,
    parent: "game", // HTML ID 
    scene: [PreloadScene, Menu, villageScene, homeScene],
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 }, // no gravity
            debug: true
        },
        scale: {
            mode: Phaser.Scale.RESIZE,
            zoom: 3
        }
    }
};

const game = new Phaser.Game(config);