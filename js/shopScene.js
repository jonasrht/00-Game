export default class shopScene extends Phaser.Scene {
  constructor() {
    super({ key: "shopScene", active: false });
  }

  preload() {}

  create() {
    console.log("Willkommen im Shop");

    this.buttonSound = this.sound.add("buttonSound");
    this.shopSound = this.sound.add("shopsound");

    // Get von anderen Scenen
    var uiScene = this.scene.get("uiScene");
    var invScene = this.scene.get("inventoryScene");

    // Exit Button
    this.exitButton = this.add
      .image(718, 84, "exitButton")
      .setInteractive({ useHandCursor: true });
    this.exitButton.on(
      "pointerdown",
      function (pointer) {
        this.buttonSound.play();
        this.scene.stop().resume("homeScene");
      },
      this
    );

    // Shop Text
    this.menuTop = this.add.image(600, 260, "MenuTop");
    this.shopHeader = this.add
      .text(599, 90, "SHOP", {
        fontFamily: "mainfont",
        fontSize: "13px",
        color: "#62232f",
        stroke: "#62232f",
        align: "center",
      })
      .setOrigin(0.5, 0.5);
    this.itemsHeader = this.add.text(463, 125, "Item           Wt. Preis", {
      fontFamily: "mainfont",
      fontSize: "13px",
      color: "#fffbed",
      stroke: "#62232f",
      align: "center",
    });

    // herzen
    this.hearts = this.add.image(490, 167, "heartIcon").setScale(1.5);
    this.itemsHeader = this.add.text(463, 160, "               1    30$", {
      fontFamily: "mainfont",
      fontSize: "13px",
      color: "#fffbed",
      stroke: "#62232f",
      align: "center",
    });
    this.hearts.setInteractive({ useHandCursor: true });
    this.hearts.on(
      "pointerdown",
      function (pointer) {
        if (uiScene.money >= 10) {
          uiScene.addHeart();
          uiScene.updateMoney(-10);
          this.shopSound.play();
        } else {
          // TODO: Error für zu wenig Geld
        }
      },
      this
    );

    // Trank 1
    this.trankPower = this.add.image(490, 217, "trankPower").setScale(1.5);
    this.itemsHeader = this.add.text(463, 210, "               1    15$", {
      fontFamily: "mainfont",
      fontSize: "13px",
      color: "#fffbed",
      stroke: "#62232f",
      align: "center",
    });
    this.trankPower.setInteractive({ useHandCursor: true });
    this.trankPower.on(
      "pointerdown",
      function (pointer) {
        if (uiScene.money >= 1) {
          invScene.itemFromShop("trankPower");
          uiScene.updateMoney(-1);
          this.shopSound.play();
        } else {
          // TODO: Error für zu wenig Geld
        }
      },
      this
    );

    // Trank 2
    this.trankHerz = this.add.image(490, 267, "trankHerz").setScale(1.5);
    this.itemsHeader = this.add.text(463, 260, "               1    30$", {
      fontFamily: "mainfont",
      fontSize: "13px",
      color: "#fffbed",
      stroke: "#62232f",
      align: "center",
    });
    this.trankHerz.setInteractive({ useHandCursor: true });
    this.trankHerz.on(
      "pointerdown",
      function (pointer) {
        if (uiScene.money >= 30) {
          invScene.itemFromShop("trankHerz");
          uiScene.updateMoney(-30);
          this.shopSound.play();
        } else {
          // TODO: Error für zu wenig Geld
        }
      },
      this
    );

    // Trank 3
    this.trankPowerBig = this.add
      .image(490, 317, "trankPowerBig")
      .setScale(1.5);
    this.itemsHeader = this.add.text(463, 310, "               1    50$", {
      fontFamily: "mainfont",
      fontSize: "13px",
      color: "#fffbed",
      stroke: "#62232f",
      align: "center",
    });
    this.trankPowerBig.setInteractive({ useHandCursor: true });
    this.trankPowerBig.on(
      "pointerdown",
      function (pointer) {
        if (uiScene.money >= 50) {
          invScene.itemFromShop("trankPowerBig");
          uiScene.updateMoney(-50);
          this.shopSound.play();
        } else {
          // TODO: Error für zu wenig Geld
        }
      },
      this
    );

    // Trank 4
    this.hearts = this.add.image(490, 367, "trankHerzBig").setScale(1.5);
    this.itemsHeader = this.add.text(463, 360, "               1    70$", {
      fontFamily: "mainfont",
      fontSize: "13px",
      color: "#fffbed",
      stroke: "#62232f",
      align: "center",
    });
    this.hearts.setInteractive({ useHandCursor: true });
    this.hearts.on(
      "pointerdown",
      function (pointer) {
        if (uiScene.money >= 70) {
          invScene.itemFromShop("trankHerzBig");
          uiScene.updateMoney(-70);
          this.shopSound.play();
        } else {
          // TODO: Error für zu wenig Geld
        }
      },
      this
    );
  }
}
