//import Phaser from 'phaser';

export default class uiScene extends Phaser.Scene {
    constructor() {
        super("uiScene");
    }

    init(data) {
        if (data && data.eventEmitter) {
            data.eventEmitter.on('coinCount', this.updateMoney, this)
        }
        this._money = 0;
    }

    create() {
        this.moneyText = this.add.text(10, 10, ": 0", { fontSize: 32 });

        // listen to 'update-count' event and call `updateCount()`
        // when it fires
        // eventsCenter.on('update-count', this.updateCount, this)

        // // clean up when Scene is shutdown
        // this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
        //     eventsCenter.off('update-count', this.updateCount, this)
        // })
    }

    updateMoney() {
        this._money++;
        this.moneyText.setText(': ' + this._money);
    }
}