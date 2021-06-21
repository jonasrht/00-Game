export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(0.5);
        this.setBounce(1, 1);
        this.body.setSize(30, 40, true);
        this.setScale(0.5); // Skalierung des Sprites
        this.setOffset(0, 24)
        this.setCollideWorldBounds(true);
        this.create(texture);
        this.movement = true;
        this.direction = 'down';
        this.scene = scene;
    }

    create(texture) {
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

        this.w = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    }

    pushBack() {
        if (this.direction === 'right') {
            this.body.x = this.body.x - 20;
        }
        if (this.direction === 'left') {
            this.body.x = this.body.x + 20;
        }
        if (this.direction === 'up') {
            this.body.y = this.body.y + 20;
        }
        if (this.direction === 'down') {
            this.body.y = this.body.y - 20;
        }
    }

    dash() {
        if (this.direction === 'right') {
            this.body.x = this.body.x + 20;
        }
        if (this.direction === 'left') {
            this.body.x = this.body.x - 20;
        }
        if (this.direction === 'up') {
            this.body.y = this.body.y - 20;
        }
        if (this.direction === 'down') {
            this.body.y = this.body.y + 20;
        }
    }

    sword() {
        if (this.direction === 'right') {
            this.swordHitbox = this.scene.add.rectangle(this.x + 20, this.y, 10, 10, 0x6666ff);
        }
        if (this.direction === 'left') {
            this.swordHitbox = this.scene.add.rectangle(this.x - 20, this.y, 10, 10, 0x6666ff);
        }
        if (this.direction === 'up') {
            this.swordHitbox = this.scene.add.rectangle(this.x, this.y - 20, 10, 10, 0x6666ff);
        }
        if (this.direction === 'down') {
            this.swordHitbox = this.scene.add.rectangle(this.x, this.y + 20, 10, 10, 0x6666ff);
        }

    }

    update(cursors, selectedCharacter) {

        this.body.setVelocity(0);
        const prevVelocity = this.body.velocity.clone();
        if (Phaser.Input.Keyboard.JustDown(this.w)) {
            this.sword();
        }
        if (this.movement) {
            // Horizontal movement
            if (cursors.left.isDown) {
                this.body.setVelocityX(-100);
                this.direction = 'left';
            } else if (cursors.right.isDown) {
                this.body.setVelocityX(100);
                this.direction = 'right';
            }

            // Vertical movement
            if (cursors.up.isDown) {
                this.body.setVelocityY(-100);
                this.direction = 'up';
            } else if (cursors.down.isDown) {
                this.body.setVelocityY(100);
                this.direction = 'down';
            }
        }
        // Normalize and scale the velocity so that can't move faster along a diagonal
        this.body.velocity.normalize().scale(175);

        if (cursors.left.isDown) {
            this.anims.play("misa-left-walk", true);
        } else if (cursors.right.isDown) {
            this.anims.play("misa-right-walk", true);
        } else if (cursors.up.isDown) {
            this.anims.play("misa-back-walk", true);
        } else if (cursors.down.isDown) {
            this.anims.play("misa-front-walk", true);
        } else {
            this.anims.stop();

            // If we were moving, pick and idle frame to use
            if (prevVelocity.x < 0) this.setTexture(selectedCharacter, "misa-left");
            else if (prevVelocity.x > 0) this.setTexture(selectedCharacter, "misa-right");
            else if (prevVelocity.y < 0) this.setTexture(selectedCharacter, "misa-back");
            else if (prevVelocity.y > 0) this.setTexture(selectedCharacter, "misa-front");
        }
    }
}
