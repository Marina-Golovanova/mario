class Gifts extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene, {
      immovable: true,
      allowGravity: false,
      moves: true,
    });
    this.scene = scene;
    // this.countMax = 3;
    // this.countCreated = 0;
    // this.countOpened = 0;
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
      //   ++this.countCreated;
    }
  }

  onGiftOpened() {
    const coef = Phaser.Math.Between(1, 2);
    this.result = coef === 1 ? "flower" : "enemy";
    this.gift.blust();
    this.isActive = false;
    // this.countCreated++;
    if (this.result === "flower") {
      this.flower = Flower.generate(this.scene, this.gift.x, this.gift.y);
      //   console.log(this.scene.flowers, this.scene.maxFlowers);
      //   if (this.scene.flowers === this.scene.maxFlowers) {
      //     this.scene.events.emit("win");
      //   }
      this.scene.addOverlap();
    } else {
      //   this.countCreated--;
      //   this.countOpened--;
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
