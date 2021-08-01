import Player from "./objects/Player.js";
import Slime from "./objects/slime.js";
import Arrow from "./arrow.js";
import spikes from "./objects/spikes.js";
import switches from "./objects/switches.js";

var light;
var map;

export default class Dungeon extends Phaser.Scene {
  constructor() {
    super("DungeonV2");
    this.arrow = null;
    this.counterArrow = 3;
  }

  init(data) {
    this.selectedCharacter = "atlas";
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  create() {
    //this.physics.world.createDebugGraphic();
    this.uiScene = this.scene.get("uiScene");
    this.invScene = this.scene.get("inventoryScene");

    //tilemap einfügen
    map = this.make.tilemap({ key: "dungeonMapv2" });
    const tileset = map.addTilesetImage("Dungeon", "dungeonTiles");

    //Eben createn
    this.belowLayer = map.createLayer("boden", tileset, 0, 0);
    this.worldLayer = map.createLayer("wand", tileset, 0, 0);
    this.chestLayer = map.createLayer("chest", tileset, 0, 0);
    this.saeulen = map.createLayer("saeulen", tileset, 0, 0);
    this.doorAufLayer = map.createLayer("doorAuf", tileset, 0, 0);
    this.doorZuLayer = map.createLayer("doorZu", tileset, 0, 0);
    this.abovePlayer = map.createLayer("abovePlayer", tileset, 0, 0);

    this.doorZuLayer.setAlpha(1);
    this.doorAufLayer.setPipeline("Light2D").setDepth(11);
    this.doorZuLayer.setPipeline("Light2D");
    this.worldLayer.setPipeline("Light2D");
    this.belowLayer.setPipeline("Light2D");
    this.saeulen.setPipeline("Light2D");
    this.abovePlayer.setDepth(11);

    //Fügt den buttons hinzu
    this.q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.e = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.six = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SIX);
    this.space = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    // Lichter
    this.lights.enable().setAmbientColor(0x333333);
    light = this.lights
      .addLight(180, 80, 200)
      .setColor(0xffffff)
      .setIntensity(2);

    //collision mit der wand in tiled einstellen
    this.worldLayer.setCollisionByProperty({ collides: true });
    this.saeulen.setCollisionByProperty({ collides: true });
    this.chestLayer.setCollisionByProperty({ collides: true });
    this.doorZuLayer.setCollisionByProperty({ collides: true }).setDepth(11);

    //spawnpoint in tiled festlegen
    this.spawnPoint = map.findObject(
      "Objects",
      (obj) => obj.name === "Spawn Point"
    );

    //Stachelboden
    this.stachelBoden = map.createFromObjects("Stachelboden");
    this.stachelBoden.forEach((stachel) => {
      this.stachel = new spikes(this, stachel.x, stachel.y, 1);
      this.stachel.setPipeline("Light2D");
    });

    //Spieler erstellen
    this.player = new Player(
      this,
      this.spawnPoint.x,
      this.spawnPoint.y,
      "atlas"
    );

    //Schalter
    this.schalterGrp = map.createFromObjects("Schalter");
    this.schalterGrp.forEach((schalter) => {
      this.schalter = new switches(
        this,
        schalter.x,
        schalter.y,
        1,
        schalter.name
      );
      this.schalter.setPipeline("Light2D");
    });

    // Heilmittel
    this.heilmittelSpawn = map.findObject(
      "doors",
      (obj) => obj.name === "heilmittel"
    );

    this.heilmittel = this.add.sprite(
      this.heilmittelSpawn.x,
      this.heilmittelSpawn.y,
      "briefHeilung"
    );
    this.uiScene = this.scene.get("uiScene");
    this.physics.add.existing(this.heilmittel);
    this.doorCollide = this.physics.add.collider(
      this.player,
      this.heilmittel,
      () => {
        this.uiScene.heilmittelBriefFunc();
      }
    );

    // Slime Gruppe
    this.slimeGroup = [];

    this.slime = map.createFromObjects("orc");
    this.slime.forEach((slime) => {
      var randoSlime = Phaser.Math.Between(0, 3);
      switch (randoSlime) {
        case 0:
          this.slime = new Slime(this, slime.x, slime.y, "slimeBlau", 1);
          break;
        case 1:
          this.slime = new Slime(this, slime.x, slime.y, "slime", 1);
          break;
        case 2:
          this.slime = new Slime(this, slime.x, slime.y, "slimeRot", 1);
          break;
        case 3:
          this.slime = new Slime(this, slime.x, slime.y, "slimeGruen", 1);
          break;
        default:
          break;
      }
      this.slimeGroup.push(this.slime);
    });

    this.slimeCollide = this.physics.add.collider(
      this.player,
      this.slimeGroup,
      (player, slime) => {
        if (slime.texture.key == "slimeRot") {
          this.uiScene.removeHearts(4);
          this.player.pushBack();
        } else if (slime.texture.key == "slime") {
          this.uiScene.removeHeart();
          this.player.pushBack();
        } else if (slime.texture.key == "slimeBlau") {
          this.uiScene.removeHearts(3);
          this.player.pushBack();
        } else if (slime.texture.key == "slimeGruen") {
          this.uiScene.removeHeart();
          this.player.pushBack();
        }
      }
    );

    //collider hinzufügen
    this.physics.add.collider(this.player, this.worldLayer);
    this.physics.add.collider(this.player, this.saeulen);
    this.physics.add.collider(this.player, this.chestLayer);
    this.doorCollide = this.physics.add.collider(this.player, this.doorZuLayer);
    this.door2Collide = this.physics.add.collider(
      this.player,
      this.doorZuLayer2
    );

    //Collider für die Slimes
    this.physics.add.collider(
      this.slimeGroup,
      this.worldLayer,
      (slime, world) => {
        slime.handleCollide();
      }
    );
    this.physics.add.collider(this.slimeGroup, this.saeulen, (slime, world) => {
      slime.handleCollide();
    });
    this.physics.add.collider(
      this.slimeGroup,
      this.doorZuLayer,
      (slime, world) => {
        slime.handleCollide();
      }
    );
    this.physics.add.collider(
      this.slimeGroup,
      this.doorZuLayer2,
      (slime, world) => {
        slime.handleCollide();
      }
    );

    //funktion damit die kamera einen verfolgt
    const camera = this.cameras.main;
    camera.startFollow(this.player);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    camera.setZoom(3);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.projectiles = this.add.group();

    this.audioManager = this.scene.get("audioManager");
    this.heartbeat = this.sound.add("herzschlag");
  }

  switchScene(scene, name) {
    this.cameras.main.fadeOut(1000, 0, 0, 0);
    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      (cam, effect) => {
        this.scene.start(scene, { name, char: this.selectedCharacter });
      }
    );
  }

  handleGameover() {
    this.slimeCollide.destroy();
    var dungeon = this.scene.get('Dungeon')
    dungeon.bgMusic.stop();
    this.switchScene("homeScene", "Gameover");
    this.uiScene.addHeart();
    this.uiScene.addHeart();
    this.uiScene.addHeart();
  }

  openDoorOne() {
    this.doorZuLayer.setAlpha(0);
    if (this.doorCollide.world != null) {
      this.doorCollide.destroy();
    }

    if (Phaser.Input.Keyboard.JustDown(this.q)) {
      if (this.counterArrow > 0) {
        this.counterArrow -= 1;
        if (this.player.direction === "left") this.arrowDirection = "left";
        if (this.player.direction === "right") this.arrowDirection = "right";
        if (this.player.direction === "up") this.arrowDirection = "up";
        if (this.player.direction === "down") this.arrowDirection = "down";
        if (this.arrowDirection) this.shootArrow(this.arrowDirection);
      }
    }

    if (this.projectiles.getLength() > 0) {
      this.projectiles.getChildren().forEach((arrow) => {
        arrow.update(this.arrowDirection);
      });
    }

    this.rotation = Phaser.Math.Angle.Between(this.player, this.slimeGroup[0]);

    if (this.distance < 200) {
      //this.angriff();
    }
    if (this.uiScene.heartContainer.length < 2) {
      this.heartbeat.play();
      this.heartbeat.setLoop(true);
    } else {
      this.heartbeat.stop();
    }
  }

  // The End
  gameFertig() {
    this.scene.remove("uiScene");
    this.scene.start("mainMenu");
  }

  update(time, delta) {
    const speed = 175;
    const prevVelocity = this.player.body.velocity.clone();
    this.player.update(this.cursors, this.selectedCharacter);
    this.slimeGroup.forEach((slime) => {
      slime.update(slime, this);
    });

    // Licht verfolgt spieler
    light.x = this.player.x;
    light.y = this.player.y;

    if (Phaser.Input.Keyboard.JustDown(this.six)) {
    }

    if (Phaser.Input.Keyboard.JustDown(this.q)) {
      if (this.counterArrow > 0) {
        this.counterArrow -= 1;
        if (this.player.direction === "left") this.arrowDirection = "left";
        if (this.player.direction === "right") this.arrowDirection = "right";
        if (this.player.direction === "up") this.arrowDirection = "up";
        if (this.player.direction === "down") this.arrowDirection = "down";
        if (this.arrowDirection) this.shootArrow(this.arrowDirection);
      }
    }

    if (this.projectiles.getLength() > 0) {
      this.projectiles.getChildren().forEach((arrow) => {
        arrow.update(this.arrowDirection);
      });
    }

    this.rotation = Phaser.Math.Angle.Between(this.player, this.slimeGroup[0]);

    if (this.distance < 200) {
      //this.angriff();
    }
    if (this.uiScene.heartContainer.length < 2) {
      this.heartbeat.play();
      this.heartbeat.setLoop(true);
    } else {
      this.heartbeat.stop();
    }
  }

  shootArrow(direction) {
    var arrow = new Arrow(this, direction);
    this.projectiles.add(arrow);
  }
}
