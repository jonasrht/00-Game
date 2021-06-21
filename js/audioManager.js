export default class audioManager extends Phaser.Scene {
    constructor() {
        super({ key: 'audioManager', active: false })
    }

    create() {
        this.musicConfig = {
            mute: false,
            volume: 0.1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }

        this.bgMusic = this.sound.add("menuMusic");

    }
}