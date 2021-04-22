let controls;
let player;
let cursors;

export default class MainScene extends Phaser.Scene {
    constructor(sceneName) {
        super({
            key: sceneName
        });
    }

    preload() {

    }

    create() {
        // const camera = this.cameras.main;

        // player = this.physics.add.sprite(200, 150, "atlas", "misa-front").setScale(0.5).setSize(30, 30).setOffset(0, 24);

        // const anims = this.anims;
        // anims.create({
        //     key: "misa-left-walk",
        //     frames: anims.generateFrameNames("atlas", { prefix: "misa-left-walk.", start: 0, end: 3, zeroPad: 3 }),
        //     frameRate: 10,
        //     repeat: -1
        // });
        // anims.create({
        //     key: "misa-right-walk",
        //     frames: anims.generateFrameNames("atlas", { prefix: "misa-right-walk.", start: 0, end: 3, zeroPad: 3 }),
        //     frameRate: 10,
        //     repeat: -1
        // });
        // anims.create({
        //     key: "misa-front-walk",
        //     frames: anims.generateFrameNames("atlas", { prefix: "misa-front-walk.", start: 0, end: 3, zeroPad: 3 }),
        //     frameRate: 10,
        //     repeat: -1
        // });
        // anims.create({
        //     key: "misa-back-walk",
        //     frames: anims.generateFrameNames("atlas", { prefix: "misa-back-walk.", start: 0, end: 3, zeroPad: 3 }),
        //     frameRate: 10,
        //     repeat: -1
        // });


        // camera.startFollow(player);
        // camera.setZoom(3);
        // cursors = this.input.keyboard.createCursorKeys();

        // this.wasd = this.input.keyboard.addKeys({
        //     esc: Phaser.Input.Keyboard.KeyCodes.ESC,
        // })


    }

    update() {
        //this.physics.add.collider(this.player, this.);
        //this.physics.add.overlap(this.player, this.door, this.doorEnter);
        // function doorEnter() {
        //     console.log("moin");
        // }

        // if (Phaser.Input.Keyboard.JustDown(this.wasd.esc)) {
        //     console.log("esc");
        //     this.scene.start('mainMenu');
        // }
        // const speed = 175;
        // player.body.setVelocity(0);
        // const prevVelocity = player.body.velocity.clone();

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

        // // Normalize and scale the velocity so that player can't move faster along a diagonal
        // player.body.velocity.normalize().scale(speed);

        // if (cursors.left.isDown) {
        //     player.anims.play("misa-left-walk", true);
        // } else if (cursors.right.isDown) {
        //     player.anims.play("misa-right-walk", true);
        // } else if (cursors.up.isDown) {
        //     player.anims.play("misa-back-walk", true);
        // } else if (cursors.down.isDown) {
        //     player.anims.play("misa-front-walk", true);
        // } else {
        //     player.anims.stop();

        //     // If we were moving, pick and idle frame to use
        //     if (prevVelocity.x < 0) player.setTexture("atlas", "misa-left");
        //     else if (prevVelocity.x > 0) player.setTexture("atlas", "misa-right");
        //     else if (prevVelocity.y < 0) player.setTexture("atlas", "misa-back");
        //     else if (prevVelocity.y > 0) player.setTexture("atlas", "misa-front");
        // }
    }
}