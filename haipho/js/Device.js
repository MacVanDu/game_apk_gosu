export default class Device {
constructor(x, y, type, imagePath, toastMessage = null, endImage = null) {
    this.toastMessage = toastMessage;
    this.endImage = endImage;
    this.x = x;
    this.y = y;
    this.w = 50;
    this.h = 50;
    this.type = type;
    this.image = new Image();
    this.image.src = imagePath;
    this.timer = 5000; // tồn tại 5 giây
    this.expired = false;
  }

  update() {
    this.timer -= 16;
    if (this.timer <= 0) this.expired = true;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
  }
}
