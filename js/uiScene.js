import villageScene from "./villageScene.js";
import {game} from "./game.js"

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
/**
 * Das UI Des Spiels mit In
 */
var content = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.';
export default class uiScene extends Phaser.Scene {
    constructor() {
        super("uiScene");
        this.x = 50;
        this.questY = 80;
        this.money = 100;
        this.heartContainer = [];
        this.questText = [""];
        this.questTextDis = '';
        this.firstQuest = false;
        this.secondQuest = false;
    }

    init(data) {
        if (data && data.eventEmitter) {
            data.eventEmitter.on('coinCount', this.createBox, this)
        }
        this._money = 100;
    }

    preload() {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
    }

    create() {
        var soundManager =  new Phaser.Sound.WebAudioSoundManager(game);
        // Die Scene wird immer nach vorne gebracht 
        this.scene.bringToTop();
        this.heartSound = this.sound.add("heartSound");
        for (let i = 0; i < 3; i++) {
            this.addHeart();
        }

        // Anzeige oben rechts
        this.coinIcon = this.add.image(10, 10, 'coinIcon');
        this.moneyText = this.add.text(10, 10, ": " + this.money, { fontFamily: 'mainfont', fontSize: '18px', color: '#fffbed', stroke: '#62232f', align: 'center' });

        // Inventar Icon
        this.invIcon = this.add.image(50, 670, 'invIcon');
        this.invIcon.setScale(2.5);
        this.invIcon.setInteractive({ useHandCursor: true });

        // Attack Buttons
        this.uiAttackBtn = this.add.image(640, 640, 'uiAttack');
        this.uiAttackBtnDis = this.add.image(640, 640, 'guiIngameInactive').setAlpha(0);

        // Inventar öffnen
        this.invIcon.on('pointerdown', function () {
            this.scene.pause().launch('inventoryScene');
        }, this);

        // Quest UI
        this.questUi = this.add.image(1150, 50, 'questui');
        this.questUi.setInteractive({ useHandCursor: true });
        this.questUi.on('pointerdown', function () {
            this.questUiOpen = this.add.image(1150, 120, 'questuiOpen');
            this.questUiOpen.setInteractive({ useHandCursor: true });
            this.displayQuest();
            this.questUiOpen.on('pointerdown', function () {
                this.undisplayQuest();
                this.questUiOpen.setVisible(false);
            }, this);
        }, this);

        //this.newQuestAllert();

        //this.bgImg = this.add.image(425, 650, 'dialogbox').setVisible(false);
        //this.createTypeTextBox("This is a test!")


        // Damage sounds
        this.damageMaennlich = this.sound.add("damageMaennlich");
        this.damageWeiblich = this.sound.add("damageWeiblich");
    }


    createTypeTextBox(text) {
        this.label = this.add.text(100, 100, '', { fontFamily: 'mainfont', fontSize: '18px', color: '#fffbed', stroke: '#62232f', align: 'center' })
        {
            const length = text.length
            let i = 0
            this.time.addEvent({
                callback: () => {
                    this.label.text += text[i]
                    ++i
                },
                repeat: length - 1,
                delay: 100
            })
        }
    }

    // Brief für das Heilmittel
    heilmittelBriefFunc() {
        var dungeon = this.scene.get('DungeonV2');
        this.label = this.add.text(540, 360, 'THE END', { fontFamily: 'mainfont', fontSize: '60px', color: '#fffbed', stroke: '#62232f', align: 'center' });
        this.label.setAlpha(0)
        this.heilmittelBrief = this.add.image(650, 360, 'rezeptBrief').setScale(1.5);
        this.exitHeilmittel = this.add.image(850, 160, 'exitButton');
        this.exitHeilmittel.setInteractive({ useHandCursor: true });
        this.exitHeilmittel.on('pointerdown', function () {
            this.heilmittelBrief.destroy();
            this.heilmittelBrief.setAlpha(0);
            this.tweens.add({
                targets: this.label,
                alpha: { value: 1, duration: 5000, ease: 'Power1' },
                onComplete: () => {
                    dungeon.gameFertig();
                }
            });
            

        }, this);
    }

    ultCooldown(onoff) {
        if (onoff == 1) {
            this.uiAttackBtn.setAlpha(0)
            this.uiAttackBtnDis.setAlpha(1)
        } else {
            this.uiAttackBtn.setAlpha(1)
            this.uiAttackBtnDis.setAlpha(0)
        }
    }

    addQuest(text) {
        console.log(this.questUiOpen);
        if (this.questUiOpen != undefined) {
            this.questUiOpen.setVisible(false);
        }
        this.questText.push(text)
    }

    removeQuest(text) {
        this.questText.forEach(element => {
            if (element.toString() === text) {
                this.questText.pop();
                if (this.questUiOpen != undefined) {
                    this.undisplayQuest();
                }
            }
        })
        this.displayQuest();
    }

    displayQuest() {
        this.text = "";
        this.questText.forEach(element => {
            this.text = this.text + element.toString();
        });
        this.questTextDis = this.add.text(1080, 80, this.text, { fontSize: '64x', color: '#fffbed', stroke: '#62232f', align: 'left' });
        //this.questTextDis.setVisible(true);
        console.log(this.questText);
    }

    undisplayQuest() {
        this.questTextDis.setVisible(false);
    }

    playerMovement() {
        this.game.config.test = true;
    }

    // Anzeige das eien neue Quest angenommmen wurde
    newQuestAllert() {
        this.neueQuestImg = this.add.image(1150, 300, 'newQuest').setAlpha(0);
        this.tweens.add({
            targets: this.neueQuestImg,
            alpha: { value: 1, duration: 2000, ease: 'Power1' },
            y: 150,
        });
        this.tweens.add({
            targets: this.neueQuestImg,
            delay: 2500,
            alpha: { value: 0, duration: 2000, ease: 'Power1' },
            y: 300,
        });
    }

    questDoneAllert() {
        this.questDoneImg = this.add.image(640, 360, 'questDone').setAlpha(0);
        this.tweens.add({
            targets: this.questDoneImg,
            delay: 1000,
            alpha: { value: 1, duration: 2000, ease: 'Power1' },
            y: 300,
        });
        this.tweens.add({
            targets: this.questDoneImg,
            delay: 3500,
            alpha: { value: 0, duration: 2000, ease: 'Power1' },
            y: 450,
        });
    }

    addHeart() {
        this.heartIcon = this.add.image(this.x, 50, 'heartIcon');
        this.x = this.x + 20;
        this.heartSound.play();
        this.heartContainer.push(this.heartIcon);
    }

    removeHeart() {
        var dungeon = this.scene.get('Dungeon');
        var dungeon2 = this.scene.get('DungeonV2');
        var isActiveD = this.scene.isActive('Dungeon');
        var isActiveD2 = this.scene.isActive('DungeonV2');
        if (isActiveD) {
            if ((this.heartContainer.length > 0) && (dungeon.player.godmode == false)) {
                this.x = this.x - 20;
                this.heartContainer[this.heartContainer.length - 1].destroy();
                this.heartContainer.pop();
                dungeon.player.hitAnim(dungeon.player);
                if (dungeon.player.texture.key == "atlas") {
                    this.damageMaennlich.play();
                } else {
                    this.damageWeiblich.play();
                }
            } else if (this.heartContainer.length <= 0) {
                this.handleGameover();
            }
        } else {
            if ((this.heartContainer.length > 0) && (dungeon2.player.godmode == false)) {
                this.x = this.x - 20;
                this.heartContainer[this.heartContainer.length - 1].destroy();
                this.heartContainer.pop();
                dungeon2.player.hitAnim(dungeon2.player);
                if (dungeon2.player.texture.key == "atlas") {
                    this.damageMaennlich.play();
                } else {
                    this.damageWeiblich.play();
                }
            } else if (this.heartContainer.length <= 0){
                this.handleGameover();
            }
        }
        
        
    }

    removeHearts(anzahl) {
        var dungeon = this.scene.get('Dungeon');
        var dungeon2 = this.scene.get('DungeonV2');
        var isActiveD = this.scene.isActive('Dungeon');
        var isActiveD2 = this.scene.isActive('DungeonV2');
        if (this.heartContainer.length - anzahl > 0 && (dungeon.player.godmode == false)) {
            for (let i = anzahl; i > 0; i--) {
                this.x = this.x - 20;
                this.heartContainer[this.heartContainer.length - 1].destroy();
                this.heartContainer.pop();
            }
        } else {
            this.handleGameover();
        }
        if (isActiveD) {
            dungeon.player.hitAnim(dungeon.player);
            if (dungeon.player.texture.key == "atlas") {
                this.damageMaennlich.play();
            } else {
                this.damageWeiblich.play();
            }
        } else if (isActiveD2) {
            dungeon2.player.hitAnim(dungeon2.player);
            if (dungeon2.player.texture.key == "atlas") {
                this.damageMaennlich.play();
            } else {
                this.damageWeiblich.play();
            }
        }
    }

    handleGameover() {
        var dungeon = this.scene.get('Dungeon');
        var dungeon2 = this.scene.get('DungeonV2');
        var isActiveD = this.scene.isActive('Dungeon');
        var isActiveD2 = this.scene.isActive('DungeonV2');
        if(isActiveD){
            dungeon.handleGameover();
        } else {
            dungeon2.handleGameover();
        }
    }

    zeigeBrief() {
        this.villageScene = this.scene.get('villageScene');

        this.brief = this.add.image(650, 360, 'brief').setDepth(50).setScale(1.5);
        this.exitbtn = this.add.image(718, 84, 'exitButton');
        this.exitbtn.setInteractive({ useHandCursor: true }).setDepth(55);
        this.uiAttackBtn.setVisible(false);
        this.exitbtn.on('pointerdown', () => {
            this.addQuest("- Teile dem Bürgermeister\n   deinen Fund mit")
            this.newQuestAllert();
            this.brief.destroy();
            this.uiAttackBtn.setVisible(true);
            this.villageScene.flaschenpost.destroy();
            this.exitbtn.destroy();
        }, this)
    }

    createBox(text) {
        var villageScene = this.scene.get('villageScene');
        var dungeonScene = this.scene.get('Dungeon');
        var isActiveVil = this.scene.isActive('villageScene');
        var isActiveDun = this.scene.isActive('Dungeon');
        if (isActiveVil == true) {
            this.player = villageScene.player;
            villageScene.player.movement = false;
        } else if (isActiveDun == true) {
            this.player = dungeonScene.player;
            dungeonScene.player.movement = false;
        }

        this.uiAttackBtn.setVisible(false);
        //this.bgImg.setVisible(true);
        this.box = createTextBox(this, 100, 600, {
            wrapWidth: 500,
            fixedWidth: 500,
            fixedHeight: 65,
        })
        this.box.start(text, 50);

    }

    createSpells() {
        this.invIcon = this.add.image(500, 670, 'arrowBtn');
        this.invIcon.setScale(2.5);
    }

    updateMoney(money) {
        this.money = this.money + money;
        if (this.money > 0) {
            this.moneyText.setText(': ' + this.money);
        }
    }

    update() {

    }
}

const GetValue = Phaser.Utils.Objects.GetValue;
var createTextBox = function (scene, x, y, config) {
    var keyObj = scene.input.keyboard.addKey('ENTER');
    var wrapWidth = GetValue(config, 'wrapWidth', 0);
    var fixedWidth = GetValue(config, 'fixedWidth', 0);
    var fixedHeight = GetValue(config, 'fixedHeight', 0);
    var textBox = scene.rexUI.add.textBox({
        x: x,
        y: y,

        background: scene.add.image(425, 650, 'dialogbox'),

        icon: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_DARK),

        // text: getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight),
        text: getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight),

        action: scene.add.image(0, 0, 'nextPage').setTint(COLOR_LIGHT).setVisible(false),

        space: {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20,
            icon: 10,
            text: 10,
        }
    })
        .setOrigin(0)
        .layout();

    keyObj.on('down', function () {
        if (this.isTyping) {
            this.stop(true);
        } else if (!this.isLastPage) {
            this.typeNextPage();
        } else {
            this.stop(true);
            this.visible = false;
        }
    }, textBox);
    textBox
        .setInteractive()
        .on('pageend', function () {
            if (this.isLastPage) {
                if (!this.isTyping) {
                    scene.player.movement = true;
                    scene.uiAttackBtn.setVisible(true);
                }
                return;
            }
        }, textBox)
    return textBox;
}

var getBuiltInText = function (scene, wrapWidth, fixedWidth, fixedHeight) {
    return scene.add.text(0, 0, '', {
        fontSize: '20px',
        wordWrap: {
            width: wrapWidth
        },
        maxLines: 3
    })
        .setFixedSize(fixedWidth, fixedHeight);
}

var getBBcodeText = function (scene, wrapWidth, fixedWidth, fixedHeight) {
    return scene.rexUI.add.BBCodeText(0, 0, '', {
        fixedWidth: fixedWidth,
        fixedHeight: fixedHeight,

        fontSize: '20px',
        wrap: {
            mode: 'word',
            width: wrapWidth
        },
        maxLines: 3
    })
}
