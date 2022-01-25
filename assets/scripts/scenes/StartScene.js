class StartScene extends Phaser.Scene {
  constructor() {
    super("Start");
  }

  create(data) {
    this.createBackground();
    this.createStart(data);
    this.setEvents();
  }

  createBackground() {
    this.bg = this.add.sprite(0, 0, "bg").setOrigin(0);
  }

  createStart(data) {
    this.add
      .graphics()
      .fillStyle("#000", 0.5)
      .fillRoundedRect(
        config.width / 2 - 200,
        config.height / 2 - 50,
        400,
        175
      );

    if (!Object.keys(data).length) {
      this.add
        .text(config.width / 2, config.height / 2 + 40, "Tap to start", {
          font: "60px Marker Felt",
          fill: "#fff",
        })
        .setOrigin(0.5);
    } else {
      const text = data.isWin ? "You won!" : "Game over!";
      this.add
        .text(config.width / 2, config.height / 2 + 10, text, {
          font: "50px Marker Felt",
          fill: "#fff",
        })
        .setOrigin(0.5);
      this.add
        .text(config.width / 2, config.height / 2 + 80, "Tap to start again", {
          font: "50px Marker Felt",
          fill: "#fff",
        })
        .setOrigin(0.5);
    }
  }

  setEvents() {
    this.input.on("pointerdown", () => {
      this.scene.start("Game");
    });
  }
}
