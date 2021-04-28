export default class Npc extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }
}