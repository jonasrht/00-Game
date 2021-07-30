var itemsInInv = [];

export default class inventoryScene extends Phaser.Scene {
    constructor() {
        super({ key: 'inventoryScene', active: false });
        this.itemSlotX = 460;
        this.itemSlotY = 150;
        this.createCount = 0;
    }

    preload() {
        this.load.image("mapIcon", "assets/img/mapIcon.png");
    }

    itemToInvNew(array) {
        array.forEach(element => {
            if (element.alpha == 1) {
                this.item = this.add.image(element.x, element.y, element.frame.texture.key).setDepth(12).setScale(1.5);
                this.item.setVisible(true);
            }

        });
    }

    itemFromShop(texture) {
        this.item = this.add.image(this.itemSlotX, this.itemSlotY, texture).setDepth(12).setScale(1.5);
        if (this.itemSlotX > 750) {
            this.itemSlotX = 460;
            this.itemSlotY += 50;
        } else {
            this.itemSlotX += 50;
        }
        itemsInInv.push(this.item);
    }

    itemToInventory(item) {
        this.item = this.add.image(this.itemSlotX, this.itemSlotY, item.texture.key).setDepth(12).setScale(1.5);
        this.itemSlotX += 50;
        itemsInInv.push(this.item);
    }

    create() {
        this.createCount++
        if (itemsInInv.length != 0) {
            this.itemToInvNew(itemsInInv);
            this.itemListener(itemsInInv);
        }

        if (this.createCount == 0) {

        }

        var dungeonScene = this.scene.get('Dungeon');
        var villageScene = this.scene.get('villageScene');
        var homeScene = this.scene.get('homeScene');
        var uiScene = this.scene.get('uiScene');


        this.scene.bringToTop();
        this.buttonSound = this.sound.add("buttonSound");
        // Exit Button
        this.exitButton = this.add.image(718, 84, 'exitButton').setInteractive({ useHandCursor: true });
        this.exitButton.on('pointerdown', function (pointer) {
            this.buttonSound.play();
            this.scene.stop().resume('uiScene');
        }, this);

        // Map Button
        this.mapButton = this.add.image(830, 120, 'mapIcon').setInteractive({ useHandCursor: true }).setScale(2.5);
        this.mapButton.on('pointerdown', function (pointer) {
            this.mapMenu = this.add.image(600, 260, 'MenuMapTop');
            this.mapHeader = this.add.text(599, 90, 'KARTE', { fontFamily: 'mainfont', fontSize: '13px', color: '#62232f', stroke: '#62232f', align: 'center' }).setOrigin(0.5, 0.5);
            this.mapButton.alpha = 0;
        }, this);

        // Menu Bg
        this.menuTop = this.add.image(600, 260, 'MenuTop').setDepth(10);
        this.invHeader = this.add.text(599, 90, 'INVENTAR', { fontFamily: 'mainfont', fontSize: '13px', color: '#62232f', stroke: '#62232f', align: 'center' }).setOrigin(0.5, 0.5);
    }

    itemListener(itemsInInv) {
        var uiScene = this.scene.get('uiScene');
        itemsInInv.forEach(element => {
            if (element != undefined && element.name != 'Aktiv') {
                element.setName('Aktiv')
                element.setInteractive();
                element.on('pointerdown', function () {
                    itemsInInv = itemsInInv.filter(item => item !== element);
                    switch (element.texture.key) {
                        case 'trankHerz':
                            uiScene.addHeart();
                            element.setAlpha(0);
                            element.setVisible(false);
                            element.destroy();
                            break;
                        case 'trankHerzBig':
                            uiScene.addHeart();
                            uiScene.addHeart();
                            uiScene.addHeart();
                            break;
                        default:
                            break;
                    }
                }, this);
            }
        });
    }

    update() {

    }
}