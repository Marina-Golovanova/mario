class Gifts extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene, {
      immovable: true,
      allowGravity: false,
      moves: true,
    });
    this.scene = scene;
    this.countMax = 10;
    this.countCreated = 0;
    this.countOpened = 0;
    this.timer = this.scene.time.addEvent({
      delay: 10000,
      callback: this.tick,
      callbackScope: this,
      loop: true,
    });
    this.gift = null;
    this.init();
    this.isActive = false;
  }

  init() {
    this.scene.events.on("update", this.update, this);
  }

  update() {
    if (this.scene.bgMoving) {
      this.gift.move(5);
    }

    if (this.gift.isDead()) {
      this.gift.destroy();
      this.isActive = false;
    }
  }

  createGift() {
    if (!this.isActive) {
      this.gift = new Gift(this.scene);
      this.gift.on("opened", this.onGiftOpened, this);
      this.add(this.gift);
      this.isActive = true;
      ++this.countCreated;
    }
  }

  onGiftOpened() {
    this.countOpened++;
    if (this.countOpened === this.countMax) {
      this.scene.events.emit("win");
    }
  }

  tick() {
    if (this.countCreated < this.countMax) {
      this.createGift();
    } else {
      this.timer.remove();
    }
  }
}
