export default class selectPlayerScene extends Phaser.Scene {
    constructor() {
        super("selectPlayerScene");

    }

    create() {
        this.xPos = this.game.config.width / 2;
        this.yPos = this.game.config.height / 2;
        var text = this.add.text(0, 0, "Wähle deinen Spieler", { fontFamily: 'mainfont', fontSize: '20px', fontStyle: 'bold', fill: 'rgb(255, 255, 255)' });
        text.x = this.game.config.width / 2 - text.width / 2;
        text.y = this.game.config.height / 2 - text.height / 2 - 140;

        //Pink player
        this.btnPlayerOne = this.add.image(this.xPos - 100, this.yPos - 200, "atlasPink");
        this.btnPlayerOne.setDepth(1);
        this.btnPlayerOne.setInteractive();
        this.btnPlayerOne.setSize()
        this.btnPlayerOne.on("pointerover", () => {
            this.btnPlayerOne.setPipeline('Light2D');
            this.light = this.lights.addLight(this.xPos - 100, this.yPos - 200, 200).setScrollFactor(0.0);
            this.lights.enable().setAmbientColor(0x555555);
            this.circle = new Phaser.Geom.Circle(400, 300, 200);

        });
        this.btnPlayerOne.on("pointerdown", () => {
            this.selectedPlayer = "atlasPink";
            this.scene.start("uiScene");
            this.scene.start("villageScene", { char: "atlasPink" });
        });

        //Yellow player
        this.btnPlayerTwo = this.add.image(this.xPos + 100, this.yPos - 200, "atlas");
        this.btnPlayerTwo.setDepth(1);
        this.btnPlayerTwo.setInteractive();
        this.btnPlayerTwo.on("pointerdown", () => {
            this.selectedPlayer = "atlas";
            this.scene.start("uiScene");
            this.scene.start("Dungeon", { char: "atlas" });
        });


    }
}