class Gifts extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene, {
      immovable: true,
      allowGravity: false,
      moves: true,
    });
    this.scene = scene;
    this.timer = this.scene.time.addEvent({
      delay: 10000,
      callback: this.tick,
      callbackScope: this,
      loop: true,
    });
    this.init();
    this.isActive = false;
    this.result = null;
  }

  init() {
    this.scene.events.on("update", this.update, this);
    this.scene.events.on("opened", this.onGiftOpened, this);
  }

  update() {
    if (this.scene.bgMoving) {
      this.gift.move(-5);
    }

    if (this.gift.isDead()) {
      this.gift.destroy();
      this.isActive = false;
    }
  }

  createGift() {
    if (!this.isActive) {
      this.gift = new Gift(this.scene);
      this.add(this.gift);
      this.isActive = true;
    }
  }

  onGiftOpened() {
    const coef = Phaser.Math.Between(1, 2);
    this.result = coef === 1 ? "flower" : "enemy";
    this.gift.blust(this.scene);
    this.isActive = false;
    if (this.result === "flower") {
      this.flower = Flower.generate(this.scene, this.gift.x, this.gift.y);
      this.scene.addOverlap();
    } else {
      this.enemy = Enemy.generate(this.scene, this.gift.x, this.gift.y);
    }
  }

  tick() {
    if (this.scene.flowers < this.scene.maxFlowers) {
      this.createGift();
    } else {
      this.timer.remove();
    }
  }
}
