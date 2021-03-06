export default class Button extends Phaser.GameObjects.Container {
  constructor(scene, x, y, text, targetScene, key1 = 'buttonBlue', key2 = 'buttonYellow') {
    super(scene, x, y);

    this.button = this.scene.add.sprite(0, 0, 'spaceshooter', key1).setInteractive();
    this.text = this.scene.add.text(0, 0, text, {
      align: 'center',
      fontFamily: 'future',
      fontSize: '32px',
      fill: '#000',
      padding: { x: 20, y: 10 },
      wordWrap: { width: this.scene.cameras.main.width, useAdvancedWrap: true },
    });
    this.setText(text);

    this.add([this.button, this.text]); // We add both of the objects to the container

    this.button // Handle events for the button
      .on('pointerover', () => this.button.setTexture('spaceshooter', key2))
      .on('pointerout', () => this.button.setTexture('spaceshooter', key1));

    if (targetScene) {
      this.button.on('pointerup', () => {
        try { this.scene.sound.play('select'); } catch (e) { console.error(e); }
        if (typeof targetScene === 'string') this.scene.scene.start(targetScene);
        else if (typeof targetScene === 'function') targetScene.apply(this.scene);
      });
    }

    this.scene.add.existing(this);
  }

  setText(val) {
    this.text.setText(val);
    this.button.setDisplaySize(this.text.displayWidth, this.text.displayHeight);
    Phaser.Display.Align.In.Center(this.text, this.button);
  }
}
