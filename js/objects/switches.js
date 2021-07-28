var spike1;
var spike2;
var spike3;
var spike4;
var c = 0;
// Schalter
export default class switches extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, frame, name) {
        super(scene, x, y, frame)
        this.setTexture("switchOff");
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.active = true;
        this.body.setImmovable(true);
        this.create(scene);
        this.name = name;
        this.scene = scene;
    }

    create(scene) {


        //spike1 = scene.add.image(this.x, this.y, "spike1");
// '        scene.time.addEvent({
//             delay: 3000,
//             callback: function () { this.createSpike(scene) },
//             callbackScope: this,
//             loop: true
//         });'
        //scene.add.image(this.x, this.y, "spike1");
        this.collider = scene.physics.add.overlap(this, scene.player, (schalter, player) => {
            this.handleSchalteAct(schalter);
        });
    }

    handleSchalteAct(schalter) {
        if (Phaser.Input.Keyboard.JustDown(this.scene.space) && (schalter.name == "schalter1")) {
            this.setTexture("switchOn");
            this.scene.openDoorOne();
        }
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }
}