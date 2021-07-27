import playerStateMachine from "./playerStateMachine.js";
import State from "./State.js";


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
        this.counter = 0;
    }

    create(texture) {
        this.playerStateMachine = new playerStateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState(),
            swing: new SwingState(),
            ult: new UltState()
        }, [this.scene, this]);

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

        this.anims.create({
            key: "sword-ult",
            frames: this.anims.generateFrameNames("swordult", { prefix: "schwertanimation", start: 1, end: 7, zeroPad: 0, suffix: ".png" }),
            frameRate: 12,
            repeat: 0
        })

        this.anims.create({
            key: "sword-ult",
            frames: this.anims.generateFrameNames("swordult", { prefix: "schwertanimation", start: 1, end: 7, zeroPad: 0, suffix: ".png" }),
            frameRate: 12,
            repeat: 0
        })

        this.scene.anims.create({
            key: "sword-left",
            frames: this.anims.generateFrameNames("sword", { frames: ["schwert1.png", "schwert2.png"] }),
            frameRate: 6,
            repeat: 0
        })
        this.scene.anims.create({
            key: "sword-up",
            frames: this.anims.generateFrameNames("sword", { frames: ["schwert3.png", "schwert7.png"] }),
            frameRate: 6,
            repeat: 0
        })
        this.scene.anims.create({
            key: "sword-down",
            frames: this.anims.generateFrameNames("sword", { frames: ["schwert5.png", "schwert5.png"] }),
            frameRate: 6,
            repeat: 0
        })
        this.scene.anims.create({
            key: "sword-right",
            frames: this.anims.generateFrameNames("sword", { frames: ["schwert4.png", "schwert6.png"] }),
            frameRate: 6,
            repeat: 0
        })

        this.w = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        this.schwertschlag = this.scene.sound.add("schwertschlag");
        this.schwerthieb = this.scene.sound.add("schwerthieb");
        this.steps = this.scene.sound.add("schwertschlag");
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
        console.log(this.counter);
        if (this.direction === 'right') {
            this.swordHitbox = this.scene.add.rectangle(this.x + 12, this.y, 10, 20);
        }
        if (this.direction === 'left') {
            this.swordHitbox = this.scene.add.rectangle(this.x - 12, this.y, 10, 20);
        }
        if (this.direction === 'up') {
            this.swordHitbox = this.scene.add.rectangle(this.x, this.y - 12, 20, 10);
        }
        if (this.direction === 'down') {
            this.swordHitbox = this.scene.add.rectangle(this.x, this.y + 12, 20, 10);
        }
        this.scene.physics.add.existing(this.swordHitbox);

        this.scene.physics.add.collider(this.swordHitbox, this.scene.slimeGroup, (arrow, slime) => {
            slime.health = slime.health - 1;
            if (slime.health == 0) {
                slime.destroy();
            }
        });
    }

    setMovement(boolean) {
        this.movement = boolean
    }

    update(cursors, selectedCharacter) {
        this.body.setVelocity(0);
        if (this.movement == true) {
            this.playerStateMachine.step();   
        }
    }
}

class IdleState extends State {
    enter(scene, hero) {
        hero.setVelocity(0);
        //hero.anims.play(`walk-${hero.direction}`);
        hero.anims.stop();
    }

    execute(scene, hero) {
        const { left, right, up, down } = scene.cursors;
        this.w = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.e = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        // Transition to swing if pressing space
        if (this.e.isDown) {
            this.stateMachine.transition('ult');
            return;
        }

        if (this.w.isDown) {
            this.stateMachine.transition('swing');
        }

        // Transition to move if pressing a movement key
        if ((left.isDown || right.isDown || up.isDown || down.isDown) && hero.movement) {
            this.stateMachine.transition('move');
            return;
        }
    }
}

class MoveState extends State {
    execute(scene, hero) {
        const { left, right, up, down } = scene.cursors;
        this.w = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.e = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

        // Transition to swing if pressing space
        if (this.e.isDown) {
            this.stateMachine.transition('ult');
            return;
        }

        if (this.w.isDown) {
            this.stateMachine.transition('swing');
            return;
        }

        // Transition to idle if not pressing movement keys
        if (!(left.isDown || right.isDown || up.isDown || down.isDown)) {
            this.stateMachine.transition('idle');
            return;
        }

        hero.setVelocity(0);
        if (up.isDown) {
            hero.setVelocityY(-100);
            hero.direction = 'up';
        } else if (down.isDown) {
            hero.setVelocityY(100);
            hero.direction = 'down';
        }
        if (left.isDown) {
            hero.setVelocityX(-100);
            hero.direction = 'left';
        } else if (right.isDown) {
            hero.setVelocityX(100);
            hero.direction = 'right';
        }
        //hero.body.velocity.normalize().scale(100);

        if (left.isDown) {
            hero.anims.play("misa-left-walk", true);
        } else if (right.isDown) {
            hero.anims.play("misa-right-walk", true);
        } else if (up.isDown) {
            hero.anims.play("misa-back-walk", true);
        } else if (down.isDown) {
            hero.anims.play("misa-front-walk", true);
        }
        //hero.anims.play(`walk-${hero.direction}`, true);
    }
}

class UltState extends State {
    enter(scene, hero) {
        hero.setVelocity(0);
        hero.anims.play("sword-ult");
        hero.schwerthieb.play();
        this.swordHitbox = scene.add.rectangle(hero.x, hero.y, 50, 50);
        scene.physics.add.existing(this.swordHitbox);
        scene.physics.add.overlap(this.swordHitbox, scene.slimeGroup, (arrow, slime) => {
            slime.health = slime.health - 1;
            if (slime.health == 0) {
                slime.destroy();
            }
        });

        hero.once('animationcomplete', () => {
            this.swordHitbox.destroy();
            this.stateMachine.transition('idle');
        });
    }
}

class SwingState extends State {
    enter(scene, hero) {
        this.swordanim;
        hero.setVelocity(0);
        hero.setAlpha(0);
        switch (hero.direction) {
            case 'up':
                //hero.anims.play("sword-up");
                this.swordanim = scene.add.sprite(hero.x, hero.y + 3).play("sword-up");
                this.swordHitbox = scene.add.rectangle(hero.x, hero.y - 12, 20, 10);
                break;
            case 'down':
                this.swordanim = scene.add.sprite(hero.x, hero.y + 9).play("sword-down");
                this.swordHitbox = scene.add.rectangle(hero.x, hero.y + 18, 20, 10);
                break;
            case 'left':
                this.swordanim = scene.add.sprite(hero.x - 2, hero.y + 6).play("sword-left");
                this.swordHitbox = scene.add.rectangle(hero.x - 12, hero.y + 8, 10, 20);
                break;
            case 'right':
                this.swordanim = scene.add.sprite(hero.x + 2, hero.y + 6).play("sword-right");
                this.swordHitbox = scene.add.rectangle(hero.x + 12, hero.y + 8, 10, 20);
                break;
            default:
                break;
        }
        this.swordanim.setScale(0.5);
        hero.schwertschlag.play();
        scene.physics.add.existing(this.swordHitbox);
        scene.physics.add.overlap(this.swordHitbox, scene.slimeGroup, (arrow, slime) => {
            slime.health = slime.health - 1;
            slime.pushBack();
            if (slime.health == 0) {
                slime.destroy();
            }
        });

        this.swordanim.once('animationcomplete', () => {
            this.swordHitbox.destroy();
            this.swordanim.destroy();
            hero.setAlpha(100);
            this.stateMachine.transition('move');
        });
    }
}
