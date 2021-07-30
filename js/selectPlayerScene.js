export default class selectPlayerScene extends Phaser.Scene {
    constructor() {
        super("selectPlayerScene");

    }

    create() {
        this.xPos = this.game.config.width / 2;
        this.yPos = this.game.config.height / 2;
        var text = this.add.text(0, 0, "Wähle deinen Spieler", { fontFamily: 'mainfont', fontSize: '20px', fontStyle: 'bold', color: '#664879' });
        text.x = this.game.config.width / 2 - text.width / 2;
        text.y = this.game.config.height / 2 - text.height / 2 - 140;

        //Pink player
        this.btnPlayerOne = this.add.image(this.xPos - 100, this.yPos, "atlasPink");
        this.btnPlayerOne.setFrame(3)
        this.btnPlayerOne.setDepth(1);
        this.btnPlayerOne.setInteractive();
        this.btnPlayerOne.setSize()
        this.btnPlayerOne.on("pointerover", () => {
            this.btnPlayerOne.setPipeline('Light2D');
            this.light = this.lights.addLight(this.xPos - 100, this.yPos, 200).setScrollFactor(0.0);
            this.lights.enable().setAmbientColor(0x555555);
            this.circle = new Phaser.Geom.Circle(400, 300, 200);

        });
        var textFranzi = this.add.text(this.xPos -150, this.yPos +70, "Franzi", { fontFamily: 'mainfont', fontSize: '18px', fontStyle: 'bold', color: '#664879' });
        this.btnPlayerOne.on("pointerdown", () => {
            this.selectedPlayer = "atlasPink";
            this.scene.start("uiScene");
            this.scene.start("villageScene", { char: "atlasPink" });
        });

        //Yellow player
        var textFranzi = this.add.text(this.xPos +75, this.yPos +70, "Max", { fontFamily: 'mainfont', fontSize: '18px', fontStyle: 'bold', color: '#664879' });
        this.btnPlayerTwo = this.add.image(this.xPos + 100, this.yPos, "atlas");
        this.btnPlayerTwo.setDepth(1);
        this.btnPlayerTwo.setInteractive();
        this.btnPlayerTwo.on("pointerdown", () => {
            this.selectedPlayer = "atlas";
            this.scene.start("uiScene");
            this.scene.start("villageScene", { char: "atlas" });
            //this.scene.start("villageScene", { char: "atlas" });
        });


    }
}