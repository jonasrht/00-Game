const COLOR_PRIMARY = 0x000000;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

var content = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.';
export default class uiScene extends Phaser.Scene {
    constructor() {
        super("uiScene");
        this.x = 50;
        this.money = 100;
        this.heartContainer = [];
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
        this.scene.bringToTop();
        this.heartSound = this.sound.add("heartSound");
        for (let i = 0; i < 3; i++) {
            this.addHeart();
        }
        this.coinIcon = this.add.image(10, 10, 'coinIcon');
        this.moneyText = this.add.text(10, 10, ": " + this.money, { fontFamily: 'mainfont', fontSize: '18px', color: '#fffbed', stroke: '#62232f', align: 'center' });

        // Iventar Icon
        this.invIcon = this.add.image(50, 670, 'invIcon');
        this.invIcon.setScale(2.5);
        this.invIcon.setInteractive({ useHandCursor: true });
        // Inventar öffnen
        this.invIcon.on('pointerdown', function (pointer) {
            this.scene.pause().launch('inventoryScene');
        }, this);


    }

    playerMovement() {
        this.game.config.test = true;
    }

    addHeart() {
        this.heartIcon = this.add.image(this.x, 50, 'heartIcon');
        this.x = this.x + 20;
        this.heartSound.play();
        this.heartContainer.push(this.heartIcon);
    }

    removeHeart() {
        if (this.heartContainer.length > 0) {
            this.x = this.x - 20;
            this.heartContainer[this.heartContainer.length - 1].destroy();
            this.heartContainer.pop();
        } else {
            this.handleGameover();
        }
    }

    handleGameover() {
        console.log("GameOver :(((");
    }

    createBox() {
        this.box = createTextBox(this, 100, 600, {
            wrapWidth: 500,
            fixedWidth: 500,
            fixedHeight: 65,
        })
        this.box.start(content, 50);
        this.game.config.test = false;
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

        background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_PRIMARY)
            .setStrokeStyle(2, COLOR_LIGHT),

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
        var icon = this.getElement('action').setVisible(false);
        this.resetChildVisibleState(icon);
        if (this.isTyping) {
            this.stop(true);
        } else if (!this.isLastPage) {
            this.typeNextPage();
        } else {
            this.stop(true);
            if (this.isLastPage) {
                scene.playerMovement();
            }
            this.visible = false;
        }
    }, textBox);
    textBox
        .setInteractive()
        .on('pageend', function () {
            if (this.isLastPage) {
                return;
            }

            var icon = this.getElement('action').setVisible(true);
            this.resetChildVisibleState(icon);
            icon.y -= 30;
            var tween = scene.tweens.add({
                targets: icon,
                y: '+=30', // '+=100'
                ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 500,
                repeat: 0, // -1: infinity
                yoyo: false
            });
        }, textBox)
    //.on('type', function () {
    //})
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
