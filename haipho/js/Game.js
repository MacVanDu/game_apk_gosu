import Thief from './Thief.js';
import Dog from './Dog.js';
import devicesConfig from './devicesConfig.js';
import Device from './Device.js';
import Utils from './Utils.js';

export default class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.running = false;
    this.thieves = [];
    this.devices = [];
    this.dog = null;
    this.score = 0;
    this.lives = 3;
    this.gameOver = false;
    this.win = false;
    this.lastDeviceType = "normal";
  }

  init() {
    this.dog = new Dog(this.canvas.width - 200, this.canvas.height / 2);
    this.thieves = [
      new Thief(-100, 200),
      new Thief(-400, 400),
      new Thief(-700, 100)
    ];
    Utils.loadSounds();
  }

  update() {
    if (this.gameOver || this.win) return;
    this.dog.move(this.canvas.width, this.canvas.height);

    // Cập nhật trộm
    this.thieves.forEach(thief => {
      thief.move(this.canvas.width, this.canvas.height);

      // Nếu trộm chạm chó -> thua
      if (Utils.checkCollision(thief, this.dog)) {
        this.gameOver = true;
        Utils.playSound('lose');
        return;
      }

      // Nếu trộm bị bẫy
      for (let i = this.devices.length - 1; i >= 0; i--) {
        const d = this.devices[i];
        if (Utils.checkCollision(thief, d)) {
          this.score += 10;
          thief.reset();
          this.devices.splice(i, 1);
          this.lastDeviceType = d.type;
          this.lastDeviceEndImage = d.endImage || null;
          Utils.playSound('trap');

          // 🪤 Hiển thị thông báo tùy loại bẫy
          if (d.toastMessage) {
            Utils.showToast(d.toastMessage);
          }
        }
      }

      // Nếu trộm vượt qua màn
      if (thief.x > this.canvas.width) {
        this.lives--;
        thief.reset();
        if (this.lives <= 0) this.gameOver = true;
      }
    });

    // Cập nhật bẫy
    for (let i = this.devices.length - 1; i >= 0; i--) {
      this.devices[i].update();
      if (this.devices[i].expired) this.devices.splice(i, 1);
    }

    if (this.score >= 140) {
      this.win = true;
      Utils.playSound('win');

      // 🏆 chọn ảnh thắng tùy loại bẫy cuối
      if (this.lastDeviceEndImage) {
        this.winImage = new Image();
        this.winImage.onload = () => {
          console.log("✅ Win image loaded:", this.lastDeviceEndImage);
        };
        this.winImage.onerror = () => {
          console.warn("⚠️ Không load được ảnh:", this.lastDeviceEndImage);
          this.winImage = Utils.images.winNormal; // fallback
        };
        this.winImage.src = this.lastDeviceEndImage;
      }
    }
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.drawImage(Utils.images.bg, 0, 0, this.canvas.width, this.canvas.height);
    ctx.drawImage(Utils.images.house, 100, this.canvas.height / 2 - 150, 200, 200);

    this.dog.draw(ctx);
    this.thieves.forEach(t => t.draw(ctx));
    this.devices.forEach(d => d.draw(ctx));

    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    // ctx.fillText(`Điểm: ${this.score}`, 50, 50);
    // ctx.fillText(`Mạng: ${this.lives}`, 50, 90);

    if (this.gameOver) {
      ctx.drawImage(Utils.images.loseDog, 0, 0, this.canvas.width, this.canvas.height);
      ctx.fillStyle = 'white';
      ctx.font = '60px Arial';
      ctx.fillText('', this.canvas.width / 2 - 180, this.canvas.height / 2);
    }

    if (this.win) {
      if (this.winImage && this.winImage.complete && this.winImage.naturalWidth > 0) {
        ctx.drawImage(this.winImage, 0, 0, this.canvas.width, this.canvas.height);
      } else {
        ctx.drawImage(Utils.images.winNormal, 0, 0, this.canvas.width, this.canvas.height);
      }

      ctx.fillStyle = 'white';
      ctx.font = '60px Arial';
      ctx.fillText('🎉 CHIẾN THẮNG 🎉', this.canvas.width / 2 - 250, this.canvas.height / 2);
    }
  }

  start() {
    this.init();
    this.running = true;

    this.canvas.addEventListener('click', e => {
      if (this.gameOver || this.win) {
        location.reload();
        return;
      }

      // ⚠️ Giới hạn tối đa 5 bẫy
      if (this.devices.length >= 5) {
        console.log("⚠️ Đã đạt giới hạn bẫy (5)!");
        return;
      }

      const x = e.clientX;
      const y = e.clientY;
      const cfg = devicesConfig[Math.floor(Math.random() * devicesConfig.length)];
      const d = new Device(x, y, cfg.id, cfg.image, cfg.toast, cfg.endImage);
      this.devices.push(d);
    });


    const loop = () => {
      this.update();
      this.draw();
      if (this.running) requestAnimationFrame(loop);
    };
    loop();
  }
}
