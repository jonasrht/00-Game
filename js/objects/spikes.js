var spike1;
var spike2;
var spike3;
var spike4;
var c = 0;

export default class spikes extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, frame) {
        super(scene, x, y, frame)
        this.setTexture("spike1")
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.create(scene);
    }

    create(scene) {
        //spike1 = scene.add.image(this.x, this.y, "spike1");
        scene.time.addEvent({
            delay: 3000,
            callback: function () { this.createSpike(scene) },
            callbackScope: this,
            loop: true
        })
        //scene.add.image(this.x, this.y, "spike1");

    }

    createSpike(scene) {
        spike1 = scene.time.delayedCall(500, this.spikeAnim, [scene, "spike1"], this);
        //spike1 = scene.add.image(this.x, this.y, "spike1");
        spike2 = scene.time.delayedCall(1000, this.spikeAnim, [scene, "spike2"], this);
        spike3 = scene.time.delayedCall(2000, this.spikeAnim, [scene, "spike3"], this);
        spike4 = scene.time.delayedCall(3000, this.spikeAnim, [scene, "spike4"], this);
    }

    spikeAnim(scene, pic) {
        this.spike = this.setTexture(pic)//scene.add.image(this.x, this.y, pic);
        if (pic === "spike4") {
            this.spike.active = true;
            this.spike.body.setImmovable(true);
            this.collider = scene.physics.add.collider(this.spike, scene.player, () => { console.log("ouch"); })
        } else {
            if (this.collider != null) {
                scene.physics.world.removeCollider(this.collider);
            }
        }
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }
}