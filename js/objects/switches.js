
var schalterGrp = [];
// Schalter
export default class switches extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, frame, name) {
        super(scene, x, y, frame)
        this.setTexture("switchOff");
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.active = true;
        this.body.setImmovable(true);
        this.name = name;
        this.scene = scene;
        this.istAn = false;
        this.create(scene);
    }

    create(scene) {

        schalterGrp.push(this);
        console.log(this.name);
        console.log(schalterGrp);
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

        if (Phaser.Input.Keyboard.JustDown(this.scene.space)) {
            switch (schalter.name) {
                case "schalter1":
                    schalter.setTexture("switchOn");
                    this.scene.openDoorOne();
                    break;
                case "schalter2":
                    schalter.setTexture("switchOn");
                    this.scene.openDoorTwo();
                    break;
                case "schalter11":
                    schalter.setTexture("switchOn");
                    schalter.istAn = true;
                    this.proofDun2();
                    break;
                case "schalter22":
                    schalter.setTexture("switchOn");
                    schalter.istAn = true;
                    this.proofDun2();
                    break;
                case "schalter33":
                    schalter.setTexture("switchOn");
                    schalter.istAn = true;
                    this.proofDun2();
                    break;
                default:
                    break;
            }
        }
    }

    proofDun2() {
        this.schalter1 = this.getSchalter("schalter11");
        this.schalter2 = this.getSchalter("schalter22");
        this.schalter3 = this.getSchalter("schalter33");

        if (this.schalter1.istAn == true && this.schalter2.istAn == true && this.schalter3.istAn == true) {
            this.scene.openDoorOne();
        }
    }

    getSchalter(name) {
        console.log(schalterGrp);
        for (let i = 0; i < schalterGrp.length; i++) {
            if (name == schalterGrp[i].name) {
                return schalterGrp[i];
            }

        }

        // this.schalterGrp.forEach(schalter => {
        //     if (name == schalter.name) {
        //         this.schalter = schalter;
        //         return;
        //     }
        // });
        // return this.schalter;
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }
}