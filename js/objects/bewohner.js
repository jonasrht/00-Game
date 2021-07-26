export default class bewohner extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable(true);
        this.setScale(0.5);
        this.setBounce(1, 1);
        this.body.setSize(30, 40, true);
        this.setScale(0.5); // Skalierung des Sprites
        this.setOffset(0, 24)
        this.setCollideWorldBounds(true);
        this.create(texture);
    }

    create(texture) {
        if (texture != "buergermeister") {
        const anims = this.anims;
        anims.create({
            key: "misa-left-walk",
            frames: anims.generateFrameNames(texture, { prefix: "misa-left-walk.", start: 0, end: 3, zeroPad: 3 }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: "misa-right-walk",
            frames: anims.generateFrameNames(texture, { prefix: "misa-right-walk.", start: 0, end: 3, zeroPad: 3 }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: "misa-front-walk",
            frames: anims.generateFrameNames(texture, { prefix: "misa-front-walk.", start: 0, end: 3, zeroPad: 3 }),
            frameRate: 10,
            repeat: -1
        });
        anims.create({
            key: "misa-back-walk",
            frames: anims.generateFrameNames(texture, { prefix: "misa-back-walk.", start: 0, end: 3, zeroPad: 3 }),
            frameRate: 10,
            repeat: -1
        });
        
            this.anims.play("misa-front-walk");
            this.anims.stop();
        }
    }
}